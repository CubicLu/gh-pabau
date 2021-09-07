import { BookOutlined } from '@ant-design/icons'
import React, { FC, useState } from 'react'
import { MacroModal, MacroItem } from '@pabau/ui'
import cn from 'classnames'
import Autocomplete from 'draft-js-autocomplete'
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
  onSaveMacroItems?: (macros: MacroItem[]) => void
  macroItems?: MacroItem[]
  isTextArea?: boolean
}

export const FormTextFieldWithMacro: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  required = false,
  onChangeTextValue,
  onSaveMacroItems,
  macroItems = [],
  isTextArea = false,
}) => {
  const [showMacroDlg, setShowMacroDlg] = useState(false)
  const editor = React.useRef<Editor | null>(null)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const { t } = useTranslation('common')

  const onMatch = (text) =>
    macroItems.filter((hashtag) => hashtag.title.indexOf(text) !== -1)

  const Hasthtag = ({ children }) => <span className="Hashtag">{children}</span>

  const List = ({ display, children }) => {
    return <ul className="HashtagList">{children}</ul>
  }

  const Item = ({ item, current, onClick }) => {
    let classNames = 'HashtagListItem'
    classNames += current ? ' current' : ''
    return (
      <li className={classNames} onClick={onClick}>
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
    format: (item) => `${item.title}`,
  }

  const autocompletes = [hashtag]

  const onShowMacroDlg = () => {
    setShowMacroDlg(true)
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
      item.title,
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
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}

      <div
        className={cn(
          styles.textFieldWithMacroValue,
          isTextArea === true ? styles.textFieldArea : ''
        )}
      >
        <Autocomplete
          placeholder={placeHolder}
          editorState={editorState}
          ref={editor}
          onChange={onEditorStateChange}
          autocompletes={autocompletes}
        >
          <Editor />
        </Autocomplete>
        <div className={styles.macroBtn} onClick={onShowMacroDlg}>
          <BookOutlined />
        </div>
      </div>
      <MacroModal
        title={t('ui.macro.modal.title')}
        onAdd={onAddMacro}
        onClose={onHideMacroDlg}
        visible={showMacroDlg}
        onSaveMacroItems={onSaveMacroItems}
        preMacroItems={macroItems}
      />
    </div>
  )
}

export default FormTextFieldWithMacro
