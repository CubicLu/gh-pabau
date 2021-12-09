import React, { FC, useState } from 'react'
import { gapi } from 'gapi-script'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Button } from 'antd'
import dynamic from 'next/dynamic'
interface P {
  docId: string
  apiKey: string
  clientId: string
}
const IndexDynamic: FC<P> = ({ docId, apiKey, clientId }) => {
  const [fileName, setFileName] = useState('')
  const [id, setId] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState<number>(0)
  const [docData, setDocData] = useState({})
  const Pdf = dynamic(() => import('./pdf'), {
    ssr: false,
  })
  if (id === '') {
    gapi.load('client:auth2', initClient)
    setId(docId)
  }
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  const onSetNumPages = (page: number) => {
    setPageNumber(page)
  }
  const downloadPdf = () => {
    const a = document.createElement('a')
    document.body.append(a)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    a.href = window.URL.createObjectURL(docData)
    a.download = `${fileName}.pdf`
    a.click()
  }
  function initClient() {
    gapi.client
      .init({
        apiKey,
        clientId,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/drive.file',
      })
      .then(
        function () {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        function (error) {
          console.log(error)
        }
      )
  }
  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      displayPdf()
    } else {
      handleAuthClick()
    }
  }
  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn()
  }

  const displayPdf = () => {
    gapi.client.drive.files
      .get({
        fileId: id,
      })
      .then(function (response) {
        for (let i = 0; i < response.result.files.length; i++) {
          if (docId === response.result.files[i].id) {
            setFileName(response.result.files[i].name)
          }
        }
        return gapi.client.drive.files
          .export({
            fileId: docId,
            mimeType: 'application/pdf',
          })
          .then(function (response) {
            const byteNumbers: number[] = []
            for (let i = 0; i < response.body.length; i++) {
              byteNumbers[i] = response.body.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            const pdf = new Blob([byteArray], { type: 'application/pdf' })
            setDocData(pdf)
          })
      })
  }
  return (
    <div className={styles.ePaper}>
      <div className={styles.ePaperHeader}>
        <span className={styles.ePaperTitle}>{fileName}</span>
        <Button onClick={downloadPdf}>Download Pdf</Button>
        <div className={styles.ePaperPage}>
          <span>Page</span>
          <div className={styles.ePaperPageNumber}>
            <span>{pageNumber}</span>
          </div>
          <span className={styles.numPages}>/{numPages}</span>
          <span
            onClick={() => pageNumber !== 1 && onSetNumPages?.(pageNumber - 1)}
            className={styles.navigation}
          >
            <LeftOutlined className={styles.prevPage} />
            Prev Page
          </span>
          <span
            onClick={() =>
              pageNumber !== numPages && onSetNumPages?.(pageNumber + 1)
            }
            className={styles.navigation}
          >
            Next Page
            <RightOutlined className={styles.nextPage} />
          </span>
        </div>
      </div>
      <div className={styles.ePaperContent}>
        <Pdf
          pdfData={docData}
          pageNumber={pageNumber}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
        />
      </div>
    </div>
  )
}

export default IndexDynamic
