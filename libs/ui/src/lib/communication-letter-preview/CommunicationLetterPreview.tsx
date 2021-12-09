import React, { FC, useEffect, useState } from 'react'
import mammoth from 'mammoth'
import { ReactComponent as DragDropIcon } from '../../assets/images/drag-drop.svg'
import styles from './CommunicationLetterPreview.module.less'
import { Button } from '@pabau/ui'
import { Card } from 'antd'

export interface CommunicationLetterPreviewProps {
  loaded?: boolean
  title?: string
  onChange?: (file, tags) => void
}

export const CommunicationLetterPreview: FC<CommunicationLetterPreviewProps> = ({
  loaded = false,
  title = '',
  onChange = () => alert(),
}) => {
  const btn = (
    <div className={styles.previewPagination}>
      <label className={styles.pageLabel}>Page</label>
      <input className={styles.pageInput} type="number" />
      <span className={styles.pageLabel}>
        {'/'} {'5'}
      </span>
      <Button className={styles.pageButton}>{'<'} Prev Page</Button>
      <Button className={styles.pageButton}>Next Page {'>'}</Button>
    </div>
  )

  const [loadedState, setLoadedState] = useState(loaded)

  useEffect(() => {
    setLoadedState(loaded)
  }, [loaded])
  const parseWordDocxFile = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer
      // debugger

      // mammoth
      //   .convertToHtml({ arrayBuffer: arrayBuffer })
      //   .then(function (resultObject) {})

      arrayBuffer &&
        mammoth.extractRawText({ arrayBuffer }).then(function (resultObject) {
          onChange(file, getTags(resultObject.value))
        })

      // mammoth
      //   .convertToMarkdown({ arrayBuffer: arrayBuffer })
      //   .then(function (resultObject) {})
    }

    reader.readAsArrayBuffer(file)
  }

  const getTags = (data, filter = false) => {
    const _data = data.replace(/[\n\r]/g, '')
    // eslint-disable-next-line unicorn/better-regex
    const subStr = _data.match(/\[(.*?)\]/g)
    return subStr
  }

  const fileChange = (files) => {
    setLoadedState(!loadedState)
    const file = files[0]
    parseWordDocxFile(file)
    return
  }

  const src = 'http://162.220.165.141/a.docx'
  // 'https://file-examples-com.github.io/uploads/2017/02/file-sample_500kB.docx'
  return (
    <div className={styles.previewContainer}>
      {loadedState && (
        <Card title={title} extra={btn}>
          <div className={styles.iframe}>
            <iframe
              className={styles.iframeView}
              src={
                'https://docs.google.com/viewer?url=' + src + '&embedded=true'
              }
              title="file"
              width="100%"
              height="100%"
              style={{ display: 'block' }}
            ></iframe>
          </div>
        </Card>
      )}
      {!loadedState && (
        <Card>
          <div className={styles.iconContainer}>
            <input
              className={styles.file}
              type="file"
              onChange={(event) => fileChange(event.target.files)}
            />
            <div className={styles.image}>
              <DragDropIcon />
              <div className={styles.title}>
                {'Drag your word document here'}
              </div>
              <div className={styles.subTitle}>{'Some description here'}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default CommunicationLetterPreview
