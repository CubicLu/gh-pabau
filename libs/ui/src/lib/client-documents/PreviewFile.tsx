import React, { FC, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { CloseOutlined, MoreOutlined } from '@ant-design/icons'
import { RenderHtml } from '@pabau/ui'
import styles from './ClientDocuments.module.less'
import { Button } from 'antd'
import { useMedia } from 'react-use'

const RenderDocument = dynamic(() => import('./DocumentViewer'), {
  ssr: false,
})

const HtmlView = ({ html }) => {
  const [htmlRendered, setHtmlRendered] = useState(false)
  return (
    <>
      <div
        className={styles.toggleBtnDiv}
        onClick={() => setHtmlRendered((e) => !e)}
      >
        <Button type="primary">
          {htmlRendered ? 'See Code View' : 'See Embed View'}
        </Button>
      </div>
      <div className={styles.htmlDiv}>
        {htmlRendered ? <RenderHtml __html={html} /> : <pre>{html}</pre>}
      </div>
    </>
  )
}

const CsvView = ({ csv }) => {
  const [csvTable, setCsvTable] = useState(false)

  const csvHtml = () => {
    const lines = csv.split('\n')
    let output: string | string[] = []
    for (const line of lines) {
      const cLine = line?.replaceAll(', ', ' ')
      output.push(
        `<tr><td>${cLine?.slice(0, -1).split(',').join('</td><td>')}</td></tr>`
      )
    }
    output = `<table border="2">${output.join('')}</table>`
    return output
  }

  return (
    <>
      <div
        className={styles.toggleBtnDiv}
        onClick={() => setCsvTable((e) => !e)}
      >
        <Button type="primary">
          {csvTable ? 'See Csv View' : 'See Table View'}
        </Button>
      </div>
      <div className={styles.csvDiv}>
        {!csvTable ? <pre>{csv}</pre> : <RenderHtml __html={csvHtml()} />}
      </div>
    </>
  )
}

export interface EPaperProps {
  title: string
  previewURL?: string
  previewType?: string
  setPreviewModal: (e) => void
}

export const PreviewFile: FC<EPaperProps> = ({
  title,
  previewURL,
  previewType,
  setPreviewModal,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)

  const [text, setText] = useState('')
  const [html, setHtml] = useState('')
  const [csv, setCsv] = useState('')

  useEffect(() => {
    if (
      previewType === 'txt' ||
      previewType === 'html' ||
      previewType === 'csv'
    ) {
      const client = new XMLHttpRequest()
      client.open('GET', previewURL || '', true)
      client.addEventListener('readystatechange', function () {
        if (previewType === 'txt') setText(client.responseText)
        if (previewType === 'html') setHtml(client.responseText)
        if (previewType === 'csv') setCsv(client.responseText)
      })
      client.send()
    }
  }, [previewType, previewURL])

  return (
    <div className={styles.ePaper}>
      {previewURL && !isMobile && (
        <>
          <div className={styles.ePaperHeader}>
            <span className={styles.ePaperTitle}>{title}</span>
            <div className={styles.ePaperPage}>
              <Button
                className={styles.shareBtn}
                icon={<CloseOutlined />}
                shape="circle"
                onClick={() => setPreviewModal((e) => !e)}
              />
            </div>
          </div>
          <div className={styles.ePaperContent}>
            {previewURL &&
              (previewType === 'txt' ? (
                text && (
                  <div className={styles.textDiv}>
                    <pre>{text}</pre>
                  </div>
                )
              ) : previewType === 'html' ? (
                html && <HtmlView html={html} />
              ) : previewType === 'csv' ? (
                csv && <CsvView csv={csv} />
              ) : (
                <RenderDocument
                  className={styles.documentViewer}
                  // pluginRenderers={DocViewerRenderers}
                  fileURL={previewURL}
                />
              ))}
          </div>
        </>
      )}
      {previewURL && isMobile && (
        <>
          <div className={styles.ePaperMobileHeader}>
            <span className={styles.ePaperMobileTitle}>{title}</span>
            <div className={styles.ePaperMobilePage}>
              <Button
                className={styles.shareBtn}
                icon={<CloseOutlined />}
                shape="circle"
                onClick={() => setPreviewModal((e) => !e)}
              />
            </div>
          </div>
          <div className={styles.ePaperContent}>
            {previewURL &&
              (previewType === 'txt' ? (
                text && (
                  <div className={styles.textDiv}>
                    <pre>{text}</pre>
                  </div>
                )
              ) : previewType === 'html' ? (
                html && <HtmlView html={html} />
              ) : previewType === 'csv' ? (
                csv && <CsvView csv={csv} />
              ) : (
                <RenderDocument
                  className={styles.documentViewer}
                  // pluginRenderers={DocViewerRenderers}
                  fileURL={previewURL}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PreviewFile
