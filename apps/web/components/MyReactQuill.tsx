import React, { FC, useState } from 'react'
import ReactQuill from 'react-quill'
import {
  LeftOutlined as CustomUndo,
  RightOutlined as CustomRedo,
} from '@ant-design/icons'
import 'react-quill/dist/quill.snow.css'
import styles from './MyReactQuill.module.less'

const QuillToolbar = ({ onClickCode }) => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <select className="ql-color" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
    </span>
    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
    <span className="ql-formats">
      <button onClick={onClickCode}>Code</button>
    </span>
  </div>
)

function undoChange() {
  this.quill.history.undo()
}
function redoChange() {
  this.quill.history.redo()
}

const MyReactQuill: FC = () => {
  const [state, setState] = useState({ value: '' })
  const [showHtml, setShowHtml] = useState<boolean>(false)

  const handleChange = (value) => {
    setState({ value })
  }

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
  }

  const formats = [
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'link',
    'image',
    'color',
  ]

  const hanldeClickShowHtml = () => {
    setShowHtml((showHtml) => !showHtml)
  }

  return (
    <div
      className={showHtml ? styles.hideReactQuillEditor : styles.hideRawHtml}
    >
      <QuillToolbar onClickCode={hanldeClickShowHtml} />
      <ReactQuill
        theme="snow"
        style={{ height: '150px' }}
        value={state.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <textarea
        className={styles.rawHtmlInput}
        value={state.value}
        readOnly={true}
      />
    </div>
  )
}

export default MyReactQuill
