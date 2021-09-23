import React, { FC, useState, useEffect } from 'react'
import {
  Input,
  Button,
  Epaper,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { useGetAttachmentByIdLazyQuery } from '@pabau/graphql'
import { Card, Typography } from 'antd'
import Layout from '../../../components/Layout/Layout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { getDocument } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
import styles from './index.module.less'

const DocumentViewer: FC = () => {
  const { t } = useTranslationI18()
  const [showDocumentViewer, setShowDocumentViewer] = useState<boolean>(false)
  const [documentId, setDocumentId] = useState<number>(0)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [documentData, setDocumentData] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [
    getAttachmentById,
    { data: getDocumentData, loading: documentLoading },
  ] = useGetAttachmentByIdLazyQuery()

  useEffect(() => {
    if (getDocumentData?.data === null) {
      Notification(NotificationType.warning, t('ui.epaper.null.errormessage'))
    }
    if (getDocumentData?.data) {
      setDocumentData({
        name: getDocumentData.data.name,
        url: getDocument(getDocumentData.data.url),
      })
      setShowDocumentViewer(true)
    }
    if (!documentLoading) setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDocumentData, documentLoading])

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
            <Typography.Title>
              {t('contact.document.viewer.title')}
            </Typography.Title>
            <div className={styles.documentInputWrapper}>
              <Input
                label={t('contact.document.viewer.input.documentid')}
                name="documentId"
                placeHolderText={t('contact.document.viewer.input.documentid')}
                onChange={(e) => setDocumentId(Number(e))}
              />
            </div>
            <div className={styles.showBtn}>
              <Button
                type="primary"
                disabled={!documentId}
                loading={isLoading}
                onClick={() => {
                  setIsLoading(true)
                  getAttachmentById({
                    variables: {
                      id: documentId,
                    },
                  })
                }}
              >
                {t('contact.document.viewer.show.document')}
              </Button>
            </div>
          </Card>
        ) : (
          <div className={styles.documentWrapper}>
            <Epaper
              title={documentData?.name}
              pdfURL={documentData?.url}
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
