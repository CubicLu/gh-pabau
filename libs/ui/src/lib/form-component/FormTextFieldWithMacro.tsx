import { BookOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { FC, useState } from 'react'
import { MacroModal, MacroItem, RenderHtml } from '@pabau/ui'
import _ from 'lodash'
import { tagList } from '../merge-tag-modal/data'
import cn from 'classnames'
// import Autocomplete from 'draft-js-autocomplete'

import AutocompleteCustom from './AutoCompleteCustom'
import { Editor, EditorState, Modifier } from 'draft-js'
import { useTranslation } from 'react-i18next'
import styles from './FormComponent.module.less'

interface P {
  title?: string
  desc?: string
  placeHolder?: string
  defaultValue?: string
  required?: boolean
  onChangeTextValue?: (value: string) => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  macroItems?: MacroItem[]
  isTextArea?: boolean
  hideMacro?: boolean
}

const HANDLE_REGEX = /\[.+?]/g

export const FormTextFieldWithMacro: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  required = false,
  onChangeTextValue,
  onHandleMacro,
  macroItems = [],
  isTextArea = false,
  hideMacro = false,
}) => {
  const [showMacroDlg, setShowMacroDlg] = useState(false)
  const editor = React.useRef<Editor | null>(null)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const { t } = useTranslation('common')

  const findTagInfo = (tag) => {
    const findTag = Object.entries(tagList)
      .map(([key, value], index) => {
        const _index = value.items.findIndex((item) => item.tag === tag)
        if (_index !== -1) {
          return value.items[_index]
        }
        return false
      })
      .filter((item) => item)
    return findTag.length > 0 ? findTag[0] : false
  }

  const findAndReplaceTag = (orgString) => {
    let matchArr
    let replaceTagInfos = {}

    while ((matchArr = HANDLE_REGEX.exec(orgString)) !== null) {
      const tagInfo = findTagInfo(matchArr[0])
      let repalceTag = {}
      repalceTag = tagInfo
        ? {
            [tagInfo.tag]:
              '<button type="button" class="ant-btn ant-btn-primary ant-btn-sm">&lt;-&gt; ' +
              tagInfo.name +
              ' (' +
              tagInfo.module +
              ') ' +
              '</button>',
          }
        : {
            [matchArr[0]]:
              '<button type="button" class="ant-btn ant-btn-danger ant-btn-sm" title="This tag does not exist or will not work with this type of form">' +
              matchArr[0].substring(1, matchArr[0].length - 1) +
              '</button>',
          }
      replaceTagInfos = { ...replaceTagInfos, ...repalceTag }
    }

    if (!_.isEmpty(replaceTagInfos)) {
      const re = new RegExp(
        '\\' + Object.keys(replaceTagInfos).join('|\\'),
        'gi'
      )
      orgString = orgString.replace(re, function (matched) {
        return replaceTagInfos[matched]
      })
    }
    return orgString
  }

  const onMatch = (text) => {
    return macroItems.filter((hashtag) => hashtag.title.indexOf(text) !== -1)
  }

  const Hasthtag = ({ children }) => <span className="Hashtag">{children}</span>

  const List = ({ display, children }) => {
    return <ul className="HashtagList">{children}</ul>
  }

  const Item = ({ item, current, onClick }) => {
    let classNames = 'HashtagListItem'
    classNames += current ? ' current' : ''
    return (
      <li className={classNames} onMouseDown={onClick}>
        <div className="HashtagListItemTitle">{item.title}</div>
        <div className="HashtagListItemMessage">{item.message}</div>
      </li>
    )
  }

  const hashtag = {
    prefix: '#',
    type: 'HASHTAG',
    mutability: 'IMMUTABLE',
    onMatch: onMatch,
    component: Hasthtag,
    listComponent: List,
    itemComponent: Item,
    format: (item) => `${item.message}`,
  }

  const autocompletes = [hashtag]

  const onShowMacroDlg = () => {
    if (!hideMacro) setShowMacroDlg(true)
  }

  const onHideMacroDlg = () => {
    setShowMacroDlg(false)
  }

  const addEntityToEditorState = (item) => {
    // Create selection from range
    const currentSelectionState = editorState.getSelection()
    const end = currentSelectionState.getEndOffset()
    const start = end
    const selection = currentSelectionState.merge({
      anchorOffset: start,
      focusOffset: end,
    })

    // Create entity
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'HASHTAG',
      'IMMUTABLE',
      item
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    // Replace selection with the new create entity
    const newContentState = Modifier.replaceText(
      contentStateWithEntity,
      selection,
      item.message,
      null,
      entityKey
    )

    // Push new contentState with type
    let newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-autocomplete'
    )

    newEditorState = EditorState.forceSelection(
      newEditorState,
      newContentState.getSelectionAfter()
    )

    // Update cursor position after inserted content
    setEditorState(newEditorState)
  }

  const onAddMacro = (macro) => {
    onHideMacroDlg()
    addEntityToEditorState(macro)
  }

  const onEditorStateChange = (e) => {
    const contentState = e.getCurrentContent()
    const inputText = contentState.getPlainText()
    onChangeTextValue?.(inputText)
    setEditorState(e)
  }

  return (
    <div className={`${styles.formTextField} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          <RenderHtml __html={findAndReplaceTag(title)} />
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}

      <div
        className={cn(
          styles.textFieldWithMacroValue,
          isTextArea === true ? styles.textFieldArea : '',
          hideMacro === true ? styles.hideMicro : ''
        )}
      >
        {!hideMacro && (
          <>
            <AutocompleteCustom
              placeholder={t('ui.macro.modal.placeholder')}
              editorState={editorState}
              ref={editor}
              onChange={onEditorStateChange}
              autocompletes={!hideMacro ? autocompletes : null}
            >
              <Editor />
            </AutocompleteCustom>
            <Tooltip arrowPointAtCenter title={t('ui.macro.modal.add.title')}>
              <div className={styles.macroBtn} onClick={onShowMacroDlg}>
                <BookOutlined />
              </div>
            </Tooltip>
          </>
        )}
        {hideMacro && (
          <Editor
            placeholder={''}
            editorState={editorState}
            ref={editor}
            onChange={onEditorStateChange}
          />
        )}
      </div>
      <MacroModal
        title={t('ui.macro.modal.title')}
        onAdd={onAddMacro}
        onClose={onHideMacroDlg}
        visible={showMacroDlg}
        onHandleMacro={onHandleMacro}
        preMacroItems={macroItems}
      />
    </div>
  )
}

export default FormTextFieldWithMacro
