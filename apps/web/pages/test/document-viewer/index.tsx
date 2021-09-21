import React, { FC, useState } from 'react'
import { Input, Button, Epaper } from '@pabau/ui'
import { Card, Typography } from 'antd'
import Layout from '../../../components/Layout/Layout'
import styles from './index.module.less'

const DocumentViewer: FC = () => {
  const [showDocumentViewer, setShowDocumentViewer] = useState(false)
  const [documentId, setDocumentId] = useState(undefined)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onSetNumPages = (page: number) => {
    setPageNumber(page)
  }

  return (
    <div className={styles.documentViewerWrapper}>
      <Layout>
        {!showDocumentViewer ? (
          <Card>
            <Typography.Title>Document Viewer</Typography.Title>
            <div className={styles.documentInputWrapper}>
              <Input
                label="Document Id"
                name="documentId"
                placeHolderText="Document Id"
                onChange={(e) => setDocumentId(Number(e))}
              />
            </div>
            <div className={styles.showBtn}>
              <Button
                type="primary"
                disabled={!documentId}
                onClick={() => setShowDocumentViewer(true)}
              >
                Show Document
              </Button>
            </div>
          </Card>
        ) : (
          <div className={styles.documentWrapper}>
            <Epaper
              title="Ganog’s-Review-of-Medical-Psysiology.pdf"
              pdfURL={
                'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf?hsLang=en'
              }
              numPages={numPages}
              pageNumber={pageNumber}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              onSetNumPages={onSetNumPages}
            />
          </div>
        )}
      </Layout>
    </div>
  )
}

export default DocumentViewer
