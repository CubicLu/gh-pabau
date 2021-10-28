import { TagsOutlined } from '@ant-design/icons'
import { MergeTagModal } from '@pabau/ui'
import { Tooltip } from 'antd'
import { AtomicBlockUtils, convertFromRaw, Editor, EditorState } from 'draft-js'
import Immutable from 'immutable'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { tagList } from '../merge-tag-modal/data'
import styles from './InputWithTags.module.less'

const styleMap = {
  HIGHLIGHT: {
    backgroundColor: '#54b2d3',
    border: '1px solid #54b2d3',
    padding: '3px 0px',
    borderRadius: '3px',
    marginRight: '3px',
    cursor: 'pointer',
  },
}

interface P {
  blockProps: {
    title: string
    entityKey: string
    onHandleClick: (entityKey: string) => void
  }
}

const oldTagButton: FC<P> = ({ ...props }) => {
  const onClick = () => {
    props.blockProps.onHandleClick(props.blockProps.entityKey)
  }
  return (
    <button
      type="button"
      className="ant-btn ant-btn-primary ant-btn-sm"
      onClick={onClick}
    >
      {props.blockProps.title}
    </button>
  )
}

const newTagButton: FC<P> = ({ ...props }) => {
  const onClick = () => {
    props.blockProps.onHandleClick(props.blockProps.entityKey)
  }
  return (
    <Tooltip title="This tag does not exist or will not work with this type of form">
      <button
        type="button"
        className="ant-btn ant-btn-danger ant-btn-sm"
        onClick={onClick}
      >
        {props.blockProps.title}
      </button>
    </Tooltip>
  )
}

const blockRenderMap = Immutable.Map({
  unstyled: {
    element: 'div',
  },
  atomic: {
    element: 'div',
  },
})

const HANDLE_REGEX = /\[.+?]/g

interface TP {
  placeholder: string
  value: string
  valueWithTag: string
  onChange?: (value) => void
  onFullChange?: (value) => void
  disabledTags: string[]
  enabledTags?: string[]
  showTagButton?: boolean
  triggerTagDlg?: boolean
  triggerEmpty?: boolean
  triggerChangeValue?: boolean
  clearTriggerTagDlg?: () => void
  clearTriggerEmpty?: () => void
  maxLength?: number
  handleSend?: () => void
  maxWidth?: number
  maxHeight?: number
  width?: number
  forWhat?: string
}

interface EntityRange {
  offset: number
  length: number
  key: number
}

interface ArrayBlock {
  key: string
  text: string
  type: string
  depth: number
  inlineStyleRanges: []
  entityRanges: EntityRange[]
  data: Record<string, never>
}

export const InputWithTags: FC<TP> = ({ ...props }) => {
  const { t } = useTranslation('common')
  const {
    placeholder,
    valueWithTag,
    disabledTags,
    enabledTags = [],
    showTagButton = true,
    triggerTagDlg = false,
    triggerEmpty = false,
    triggerChangeValue = false,
    maxLength = 0,
    clearTriggerEmpty,
    maxWidth = 0,
    maxHeight = 0,
    width = 0,
    forWhat = '',
  } = props
  const editor = React.useRef<Editor | null>(null)
  const [showTagsDlg, setShowTagsDlg] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')
  const [disabledTagIndexs, setDisabledTagIndexs] = useState<number[]>([])
  // const [onlyEnabledTags, setOnlyEnabledTags] = useState<string[]>([])
  const [activeDefaultKey, setActiveDefaultKey] = useState('0')
  const [selectedEntityKey, setSeletecEntityKey] = useState('')
  const [selectedBlockKey, setSelectedBlockKey] = useState('')
  const [lastChars, setLastChars] = useState('')

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  useEffect(() => {
    const disableTagIndexArr = Object.entries(tagList)
      .map(([key, value], index) => {
        return disabledTags.includes(key) ? index : -1
      })
      .filter((item) => item !== -1)
    setDisabledTagIndexs(disableTagIndexArr)
  }, [disabledTags])

  useEffect(() => {
    if (valueWithTag === '') {
      let editorState = EditorState.createEmpty()
      editorState = EditorState.moveFocusToEnd(editorState)
      setEditorState(editorState)
    } else {
      const replacedValueWithTag = valueWithTag.replace(/<[^>]+>/g, '')
      let matchArr,
        preStart = 0,
        preTxt = '',
        start = 0,
        end = 0,
        txt = ''
      const entityArr: Array<{
        isTag: boolean
        module: string
        name: string
        tag: string
        newTag: boolean
      }> = []
      while ((matchArr = HANDLE_REGEX.exec(replacedValueWithTag)) !== null) {
        start = matchArr.index
        end = start + matchArr[0].length
        txt = matchArr[0]
        preTxt = replacedValueWithTag.substring(preStart, start)
        preStart = end
        if (preTxt !== '') {
          entityArr.push({
            isTag: false,
            module: '',
            name: preTxt,
            tag: preTxt,
            newTag: true,
          })
        }
        const tagInfo = findTagInfo(txt)
        entityArr.push({
          isTag: true,
          module: tagInfo ? tagInfo.module : '',
          name: tagInfo ? tagInfo.name : txt,
          tag: tagInfo ? tagInfo.tag : txt,
          newTag: tagInfo ? false : true,
        })
      }

      if (end < replacedValueWithTag.length) {
        preTxt = replacedValueWithTag.substring(
          end,
          replacedValueWithTag.length
        )
        entityArr.push({
          isTag: false,
          module: '',
          name: preTxt,
          tag: preTxt,
          newTag: true,
        })
      } else {
        entityArr.push({
          isTag: false,
          module: '',
          name: ' ',
          tag: ' ',
          newTag: true,
        })
      }
      const blocks: ArrayBlock[] = []
      let entityMaps = {}
      let entityIndex = 0
      entityArr.map((entity, index) => {
        if (entity.isTag) {
          let entityMap = {}
          blocks.push({
            key: uuidv4(),
            text: ' ',
            type: 'atomic',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
              {
                offset: 0,
                length: 1,
                key: entityIndex,
              },
            ],
            data: {},
          })
          entityMap = {
            [entityIndex]: {
              type: 'MENTION',
              mutability: 'IMMUTABLE',
              data: {
                tag: {
                  module: entity.module,
                  name: entity.name,
                  selected: false,
                  tag: entity.tag,
                },
                newTag: entity.newTag,
              },
            },
          }
          entityMaps = { ...entityMaps, ...entityMap }
          entityIndex++
        } else {
          blocks.push({
            key: uuidv4(),
            text: entity.name,
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          })
        }
        return index
      })
      const storedState = {
        blocks: blocks,
        entityMap: entityMaps,
      }

      const contentState = convertFromRaw(storedState)
      let editorState = EditorState.createWithContent(contentState)
      editorState = EditorState.moveFocusToEnd(editorState)
      setEditorState(editorState)
    }
  }, [triggerChangeValue, valueWithTag])

  useEffect(() => {
    if (triggerEmpty) {
      let editorState = EditorState.createEmpty()
      editorState = EditorState.moveFocusToEnd(editorState)
      setEditorState(editorState)
      clearTriggerEmpty?.()
    }
  }, [triggerEmpty, clearTriggerEmpty])

  const onShowTagsDlg = () => {
    setShowTagsDlg(true)
  }

  useEffect(() => {
    if (triggerTagDlg) onShowTagsDlg()
  }, [triggerTagDlg])

  const onHideTagsDlg = () => {
    setSelectedTag('')
    setSeletecEntityKey('')
    setShowTagsDlg(false)
  }

  const addTagButton = (tag, findInfo, newTag) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'MENTION',
      'IMMUTABLE',
      {
        tag: tag,
        newTag: newTag,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    let newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      'insert-characters'
    )

    if (findInfo) {
      const currentSelectionState = editorState.getSelection()
      const mentionTextSelection = currentSelectionState.merge({
        anchorOffset:
          currentSelectionState.getFocusOffset() -
          (findInfo.end - findInfo.start - 1),
        focusOffset: currentSelectionState.getFocusOffset(),
      })
      newEditorState = EditorState.forceSelection(
        newEditorState,
        mentionTextSelection
      )
    }

    newEditorState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    )

    newEditorState = EditorState.moveFocusToEnd(newEditorState)
    setEditorState(newEditorState)
  }

  const updateTagButton = (tag) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.replaceEntityData(
      selectedEntityKey,
      {
        tag: tag,
      }
    )
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      'insert-characters'
    )
    setEditorState(newEditorState)
  }

  const onAddTag = (tag, key, index) => {
    setSelectedTag('')
    setSeletecEntityKey('')
    onHideTagsDlg()
    if (selectedEntityKey === '') {
      addTagButton(tag, false, false)
    } else {
      updateTagButton(tag)
    }
    props.clearTriggerTagDlg?.()
  }

  function focusEditor() {
    editor.current.focus()
  }

  const findWithRegex = (regex, inputText) => {
    let matchArr, start
    while ((matchArr = regex.exec(inputText)) !== null) {
      start = matchArr.index
      return {
        start: start,
        end: start + matchArr[0].length,
        tag: matchArr[0],
      }
    }
    return false
  }

  const triggerSaveInputChars = (fullChange) => {
    const contentState = editorState.getCurrentContent()
    let inputChars = ''

    const saveInputChars = function (chars) {
      inputChars += chars
    }
    for (const block of contentState.getBlocksAsArray()) {
      const blockText = block.getText()
      if (blockText !== ' ') saveInputChars(blockText)
      block.findEntityRanges((character) => {
        if (character.getEntity() !== null) {
          const entityData = contentState
            .getEntity(character.getEntity())
            .getData()
          saveInputChars(entityData.tag.tag)
        }
      })
    }
    if (!showTagButton) inputChars += lastChars
    props.onChange?.(inputChars)
    if (fullChange) props.onFullChange?.(inputChars)
  }

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

  const onEditorStateChange = (e) => {
    const contentState = e.getCurrentContent()
    // const oldContentState = editorState.getCurrentContent()
    const inputText = contentState.getPlainText()
    const findInfo = findWithRegex(HANDLE_REGEX, inputText)
    if (findInfo) {
      const findTag = Object.entries(tagList)
        .map(([key, value], index) => {
          const _index = value.items.findIndex(
            (item) => item.tag === findInfo.tag
          )
          if (_index !== -1) {
            return value.items[_index]
          }
          return false
        })
        .filter((item) => item)

      const unknownTag = {
        module: '',
        name: findInfo.tag,
        selected: false,
        tag: findInfo.tag,
      }
      addTagButton(
        findTag.length > 0 ? findTag[0] : unknownTag,
        findInfo,
        findTag.length > 0 ? false : true
      )
    } else {
      setEditorState(e)
      props.onChange?.(contentState.getPlainText())
    }
    // } else if (
    //   contentState === oldContentState ||
    //   (maxLength !== 0 && contentState.getPlainText().length <= maxLength)
    // ) {
    //   setEditorState(e)
    //   props.onChange?.(contentState.getPlainText())
    // }

    triggerSaveInputChars(false)
  }

  const onHandleKeyCommand = (command, editorState) => {
    if (command === 'backspace') {
      const currentSelectionState = editorState.getSelection()
      const currentBlockKey = currentSelectionState.getAnchorKey()
      setSelectedBlockKey(currentBlockKey)
    } else if (command === 'split-block') {
      setSelectedBlockKey('')
      props.handleSend?.()
      // props.clearTriggerEmpty?.()
    } else {
      setSelectedBlockKey('')
    }
  }

  const onHandleEntityClick = (entityKey) => {
    const contentState = editorState.getCurrentContent()
    const entityData = contentState.getEntity(entityKey).getData()
    setSelectedTag(entityData.tag.tag)
    setSeletecEntityKey(entityKey)
    const t = Object.entries(tagList).map(([key, value], index) => {
      const _index = value.items.findIndex(
        (item) => item.tag === entityData.tag.tag
      )
      if (_index !== -1) {
        setActiveDefaultKey(index.toString())
      }
      return value
    })
    console.log('t =', t)
    onShowTagsDlg()
  }

  const onBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType()
    const blockKey = contentBlock.getKey()
    if (type === 'atomic' && blockKey !== selectedBlockKey) {
      const entityKey = contentBlock.getEntityAt(0)
      if (entityKey) {
        const contentState = editorState.getCurrentContent()
        const entityData = contentState.getEntity(entityKey).getData()
        return {
          component: entityData.newTag ? newTagButton : oldTagButton,
          editable: false,
          props: {
            title:
              entityData.tag.module === ''
                ? entityData.tag.name.substring(
                    1,
                    entityData.tag.name.length - 1
                  )
                : '<-> ' +
                  entityData.tag.name +
                  ' (' +
                  entityData.tag.module +
                  ')',
            entityKey: entityKey,
            onHandleClick: onHandleEntityClick,
          },
        }
      }
    }
  }

  const onHandleBeforeInput = (chars, editorState, eventTimeStamp) => {
    const contentState = editorState.getCurrentContent()
    const currentContentLength = contentState.getPlainText('').length
    setLastChars(chars)
    if (maxLength !== 0 && currentContentLength + chars.length > maxLength) {
      return 'handled'
    }
  }

  const onHandlePastedText = (text, html, editorState) => {
    const contentState = editorState.getCurrentContent()
    const currentContentLength = contentState.getPlainText('').length
    const textLength = text.length
    if (maxLength !== 0 && currentContentLength + textLength > maxLength) {
      return true
    } else {
      return false
    }
  }

  const onHandleBlur = () => {
    triggerSaveInputChars(true)
  }

  let inputTagStyle = {}
  if (maxWidth !== 0 && maxHeight !== 0) {
    inputTagStyle = {
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`,
    }
  } else if (maxWidth !== 0) {
    inputTagStyle = {
      maxWidth: `${maxWidth}px`,
    }
  } else if (maxHeight !== 0) {
    inputTagStyle = {
      maxHeight: `${maxHeight}px`,
    }
  }

  let inputTagMainStyle = {}
  if (width !== 0) {
    inputTagMainStyle = { ...inputTagMainStyle, width: `${width}px` }
  }

  return (
    <div
      style={inputTagMainStyle}
      className={`${styles.inputTagMain} ${
        forWhat === 'rule' ? styles.rule : ''
      } ${forWhat === 'ruleEmpty' ? styles.ruleEmpty : ''}`}
    >
      <div
        className={styles.inputTagDiv}
        onClick={focusEditor}
        style={inputTagStyle}
      >
        <Editor
          customStyleMap={styleMap}
          ref={editor}
          editorState={editorState}
          onChange={onEditorStateChange}
          blockRendererFn={onBlockRenderer}
          blockRenderMap={blockRenderMap}
          handleKeyCommand={onHandleKeyCommand}
          handleBeforeInput={onHandleBeforeInput}
          handlePastedText={onHandlePastedText}
          placeholder={placeholder}
          onBlur={onHandleBlur}
        />
      </div>
      {showTagButton && (
        <div className={styles.mergeTagBtn} onClick={onShowTagsDlg}>
          <Tooltip placement={'topLeft'} title={t('ui.inputwithtag.addtag')}>
            <TagsOutlined />
          </Tooltip>
        </div>
      )}
      <MergeTagModal
        title={t('ui.inputwithtag.modal.title')}
        tagModuleItems={tagList}
        onAdd={onAddTag}
        onClose={onHideTagsDlg}
        visible={showTagsDlg}
        selectedTag={selectedTag}
        activeDefaultKey={activeDefaultKey}
        disabledTags={disabledTagIndexs}
        onlyEnabledTags={enabledTags}
      />
    </div>
  )
}
