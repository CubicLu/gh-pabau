import { MergeTagModal } from '@pabau/ui'
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tagList } from '../merge-tag-modal/data'
import styles from './InputHtmlWithTags.module.less'

const ReactDraft = dynamic(() => import('./MyReactDraft'), {
  ssr: false,
})

const HANDLE_REGEX = /\[.+?]/g
const NEWTAG_START_PATTERN = '<a href="undefined" target="_self">'
const NEWTAG_END_PATTERN = '</a>'
const OLDTAG_START_PATTERN =
  '<a href="undefined" class="wysiwyg-mention" data-mention data-value="undefined">'
const OLDTAG_END_PATTERN = '</a>'

interface TP {
  placeholder: string
  value: string
  valueWithTag: string
  onChange?: (value) => void
  disabledTags: string[]
  maxWidth?: number
  maxHeight?: number
}

interface EntityRange {
  offset: number
  length: number
  key: number
}

export const InputHtmlWithTags: FC<TP> = ({ ...props }) => {
  const { t } = useTranslation('common')
  const { valueWithTag, disabledTags, maxWidth = 0, maxHeight = 0 } = props
  const [showTagsDlg, setShowTagsDlg] = useState(false)
  const [focusEditor, setFocusEditor] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')
  const [activeDefaultKey, setActiveDefaultKey] = useState('0')
  const [disabledTagIndexs, setDisabledTagIndexs] = useState<number[]>([])
  const [selectedEntityKey, setSeletecEntityKey] = useState('')
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
      const blocksFromHTML = convertFromHTML(valueWithTag)

      const blockContentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      const rawContentState = convertToRaw(blockContentState)

      let entityMap = {}
      let entityIndex = 0
      const blocks = rawContentState.blocks
      let entityMaps = rawContentState.entityMap
      for (const block of blocks) {
        let blockText = block.text
        let matchArr,
          tagStart = 0,
          tagEnd = 0,
          replaceStart = 0,
          replaceEnd = 0,
          txt = ''
        const entityArr: Array<{
          module: string
          name: string
          tag: string
          newTag: boolean
          startPos: number
          endPos: number
        }> = []
        while ((matchArr = HANDLE_REGEX.exec(blockText)) !== null) {
          tagStart = matchArr.index
          tagEnd = tagStart + matchArr[0].length
          txt = matchArr[0]
          const tagInfo = findTagInfo(txt)
          let tagName = ''
          tagName = tagInfo
            ? '<-> ' + tagInfo.name + ' (' + tagInfo.module + ')'
            : txt.substring(1, txt.length - 1)
          replaceStart = tagStart
          replaceEnd = replaceStart + tagName.length

          entityArr.push({
            module: tagInfo ? tagInfo.module : '',
            name: tagName,
            tag: tagInfo ? tagInfo.tag : '[' + tagName + ']',
            newTag: tagInfo ? false : true,
            startPos: replaceStart,
            endPos: replaceEnd,
          })
          blockText =
            blockText.substring(0, tagStart) +
            tagName +
            blockText.substring(tagEnd)
        }
        block.text = blockText
        const entityRanges: Array<EntityRange> = []
        for (const entity of entityArr) {
          let tagType = 'MENTION'
          if (entity.newTag) {
            tagType = 'LINK'
          }
          entityMap = {
            [entityIndex]: {
              type: tagType,
              mutability: 'IMMUTABLE',
              data: {
                tag: {
                  module: entity.module,
                  name: entity.name,
                  selected: false,
                  tag: entity.tag,
                },
                newTag: entity.newTag,
                start: entity.startPos,
                end: entity.endPos,
              },
            },
          }
          entityMaps = { ...entityMaps, ...entityMap }
          const entityRange = {
            offset: entity.startPos,
            length: entity.endPos - entity.startPos,
            key: entityIndex,
          }
          entityRanges.push(entityRange)
          entityIndex++
        }
        block.entityRanges = entityRanges
      }

      const storedState = {
        blocks: blocks,
        entityMap: entityMaps,
      }

      const contentState = convertFromRaw(storedState)
      let editorState = EditorState.createWithContent(contentState)
      editorState = EditorState.moveFocusToEnd(editorState)
      setEditorState(editorState)
    }
  }, [valueWithTag])

  const onShowTagsDlg = () => {
    setShowTagsDlg(true)
  }

  const onHideTagsDlg = () => {
    setSelectedTag('')
    setSeletecEntityKey('')
    setShowTagsDlg(false)
  }

  const addTagButton = (tag, findInfo, newTag) => {
    const contentState = editorState.getCurrentContent()
    const currentSelectionState = editorState.getSelection()
    let tagType = 'MENTION'
    let tagName = tag.name.substring(1, tag.name.length - 1)
    if (newTag) tagType = 'LINK'
    if (!newTag) {
      tagName = '<-> ' + tag.name + ' (' + tag.module + ')'
    }
    let startPos = 0
    let endPos = 0
    if (findInfo) {
      startPos =
        currentSelectionState.getFocusOffset() -
        (findInfo.end - findInfo.start - 1)
      endPos = startPos + tagName.length + 1
    } else {
      startPos = currentSelectionState.getFocusOffset()
      endPos = currentSelectionState.getFocusOffset() + tagName.length
    }
    tag.displayName = tagName
    const contentStateWithEntity = contentState.createEntity(
      tagType,
      'IMMUTABLE',
      {
        tag: tag,
        newTag: newTag,
        start: startPos,
        end: endPos,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    let stateWithText = null
    if (findInfo) {
      const mentionTextSelection = currentSelectionState.merge({
        anchorOffset: startPos,
        focusOffset: endPos,
      })
      stateWithText = Modifier.replaceText(
        contentStateWithEntity,
        mentionTextSelection,
        tagName,
        null,
        entityKey
      )
    } else {
      stateWithText = Modifier.insertText(
        contentStateWithEntity,
        editorState.getSelection(),
        tagName,
        null,
        entityKey
      )
    }

    const newEditorState = EditorState.push(editorState, stateWithText)
    setEditorState(newEditorState)
  }

  const adjustTagPosition = (startPos, diff) => {
    const currentSelectionState = editorState.getSelection()
    const currentFocusKey = currentSelectionState.getFocusKey()
    const contentState = editorState.getCurrentContent()
    const selectedBlock = contentState.getBlockForKey(currentFocusKey)
    if (selectedBlock) {
      selectedBlock.findEntityRanges((entity) => {
        if (entity.getEntity() !== null) {
          const entityData = contentState
            .getEntity(entity.getEntity())
            .getData()
          if (entityData.start > startPos) {
            entityData.start = entityData.start + diff
            entityData.end = entityData.end + diff
            contentState.replaceEntityData(entity.getEntity(), entityData)
          }
        }
      })
    }
  }

  const updateTagButton = (tag) => {
    const contentState = editorState.getCurrentContent()
    const currentSelectionState = editorState.getSelection()
    const entityData = contentState.getEntity(selectedEntityKey).getData()
    const tagName = '<-> ' + tag.name + ' (' + tag.module + ')'
    const oldStartPos = entityData.start
    const oldEndPos = entityData.end
    const oldLen = oldEndPos - oldStartPos
    const startPos = entityData.start
    const endPos = entityData.start + tagName.length
    const newLen = endPos - startPos
    const contentStateWithEntity = contentState.createEntity(
      'MENTION',
      'IMMUTABLE',
      {
        tag: tag,
        newTag: false,
        start: startPos,
        end: endPos,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const mentionTextSelection = currentSelectionState.merge({
      anchorOffset: oldStartPos,
      focusOffset: oldEndPos,
    })
    const stateWithText = Modifier.replaceText(
      contentStateWithEntity,
      mentionTextSelection,
      tagName,
      null,
      entityKey
    )
    const newEditorState = EditorState.push(editorState, stateWithText)
    setEditorState(newEditorState)
    if (oldLen !== newLen) adjustTagPosition(startPos, newLen - oldLen)
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
    setFocusEditor(!focusEditor)
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

  const convertHtmlToTag = (entityData, htmlData) => {
    let startPattern = OLDTAG_START_PATTERN
    let endPattern = OLDTAG_END_PATTERN
    if (entityData.newTag) {
      startPattern = NEWTAG_START_PATTERN
      endPattern = NEWTAG_END_PATTERN
    }
    const startPatternPos = htmlData.indexOf(startPattern)
    const endPatterPos = htmlData.indexOf(endPattern, startPatternPos)
    const convertHtml =
      htmlData.substring(0, startPatternPos) +
      entityData.tag.tag +
      htmlData.substring(endPatterPos + 4)
    return convertHtml
  }
  const triggerSaveHtmlData = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    let htmlData = draftToHtml(rawContentState)
    const contentState = editorState.getCurrentContent()
    for (const block of contentState.getBlocksAsArray()) {
      let blockHtmlData = htmlData
      block.findEntityRanges((entity) => {
        if (entity.getEntity() !== null) {
          const entityData = contentState
            .getEntity(entity.getEntity())
            .getData()
          blockHtmlData = convertHtmlToTag(entityData, blockHtmlData)
        }
      })
      htmlData = blockHtmlData
    }
    props.onChange?.(htmlData)
  }

  const onEditorStateChange = (e) => {
    const contentState = e.getCurrentContent()
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
    }
    triggerSaveHtmlData()
  }

  const onClick = () => {
    const currentSelectionState = editorState.getSelection()
    const currentFocusKey = currentSelectionState.getFocusKey()
    const currentFocusOffset = currentSelectionState.getFocusOffset()
    const contentState = editorState.getCurrentContent()
    const selectedBlock = contentState.getBlockForKey(currentFocusKey)
    const entityKey = selectedBlock.getEntityAt(currentFocusOffset)
    if (entityKey) {
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
  }

  let inputHtmlTagStyle = {}
  if (maxWidth !== 0 && maxHeight !== 0) {
    inputHtmlTagStyle = {
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`,
    }
  } else if (maxWidth !== 0) {
    inputHtmlTagStyle = {
      maxWidth: `${maxWidth}px`,
    }
  } else if (maxHeight !== 0) {
    inputHtmlTagStyle = {
      maxHeight: `${maxHeight}px`,
    }
  }

  return (
    <div className={styles.inputHtmlTagMain}>
      {' '}
      <div
        className={styles.inputHtmlTagDiv}
        onClick={onClick}
        style={inputHtmlTagStyle}
      >
        <ReactDraft
          onEditorStateChange={onEditorStateChange}
          editorState={editorState}
          focusEditor={focusEditor}
          onShowTagsDlg={onShowTagsDlg}
        />
      </div>
      <MergeTagModal
        title={t('ui.inputwithtag.modal.title')}
        tagModuleItems={tagList}
        onAdd={onAddTag}
        onClose={onHideTagsDlg}
        visible={showTagsDlg}
        selectedTag={selectedTag}
        activeDefaultKey={activeDefaultKey}
        disabledTags={disabledTagIndexs}
      />
    </div>
  )
}
