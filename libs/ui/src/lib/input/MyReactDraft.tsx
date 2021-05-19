import { TagsOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { EditorState, SelectionState } from 'draft-js'
import React, { FC, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { useTranslation } from 'react-i18next'
import styles from './InputHtmlWithTags.module.less'

interface CP {
  showTagsDlg: () => void
}

export const CustomOption: FC<CP> = ({ showTagsDlg }) => {
  const { t } = useTranslation('common')
  const toggleButton = () => {
    showTagsDlg()
  }
  return (
    <div
      className={`${styles.toolbarCustomButton} rdw-option-wrapper`}
      onClick={toggleButton}
    >
      <Tooltip placement={'topLeft'} title={t('ui.inputwithtag.addtag')}>
        <TagsOutlined />
      </Tooltip>
    </div>
  )
}

interface P {
  editorState: SelectionState
  onEditorStateChange: (e: EditorState) => void
  focusEditor: boolean
  onShowTagsDlg: () => void
}

const MyReactDraft: FC<P> = ({
  editorState,
  onEditorStateChange,
  focusEditor,
  onShowTagsDlg,
}) => {
  const editor = React.useRef<Editor | null>(null)

  useEffect(() => {
    editor.current.focusEditor()
  }, [focusEditor])

  const showTagsDlg = () => {
    onShowTagsDlg()
  }

  return (
    <Editor
      toolbarClassName="demo-toolbar-custom"
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      ref={editor}
      onEditorStateChange={onEditorStateChange}
      editorState={editorState}
      toolbarCustomButtons={[
        <CustomOption showTagsDlg={showTagsDlg} key={0} />,
      ]}
      toolbar={{
        options: [
          'history',
          'inline',
          'fontSize',
          'textAlign',
          'list',
          'fontFamily',
        ],
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        textAlign: {
          inDropdown: true,
        },
        list: {
          inDropdown: true,
        },
        fontSize: { className: 'demo-option-custom-medium' },
      }}
      mention={{
        separator: ' ',
        trigger: '@',
        suggestions: [],
      }}
    />
  )
}

export default MyReactDraft
