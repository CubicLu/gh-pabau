import React, { FC, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styles from './Epaper.module.less'
import { getDocumentURL } from '../../helper/CommunicationHepler'
import { getImage } from '../../helper/uploaders/UploadHelpers'
export interface EPaperProps {
  title: string
  numPages: number
  pageNumber: number
  onSetNumPages: (page) => void
  pdfURL?: string
  images?: string[]
  onDocumentLoadSuccess?: ({ numPages: number }) => void
}

const MyEPaper = dynamic(() => import('./MyEpaper'), {
  ssr: false,
})

export const Epaper: FC<EPaperProps> = ({
  title,
  pdfURL = '',
  images = [],
  numPages,
  pageNumber,
  onSetNumPages,
  onDocumentLoadSuccess,
}) => {
  const { t } = useTranslation('common')
  const [imageUrls, setImageUrls] = useState<string[]>()
  const [docUrl, setDocUrl] = useState<string>()
  const [isDocxFile, setIsDocxFile] = useState<boolean>(false)

  const getExtension = (url) => {
    if (url) {
      return url.split('.')[1]
    }
  }

  useEffect(() => {
    if (pdfURL) {
      switch (getExtension(pdfURL)) {
        case 'doc':
        case 'docx':
          setDocUrl(getDocumentURL(getImage(pdfURL)))
          setIsDocxFile(true)
          break
        case 'pdf':
          setDocUrl(getImage(pdfURL))
          setIsDocxFile(false)
          break
        case 'jpeg':
        case 'jpg':
        case 'gif':
        case 'png':
        case 'bmp':
          setImageUrls([getImage(pdfURL)])
          setIsDocxFile(false)
          break
        default:
          setDocUrl(pdfURL)
          setImageUrls(images)
          break
      }
    }
  }, [pdfURL, images])
  return (
    <div className={styles.ePaper}>
      {(docUrl && !isDocxFile) || imageUrls?.length ? (
        <>
          <div className={styles.ePaperHeader}>
            <span className={styles.ePaperTitle}>{title}</span>
            <div className={styles.ePaperPage}>
              <span>{t('ui.epaper.page')}</span>
              <div className={styles.ePaperPageNumber}>
                <span>{pageNumber}</span>
              </div>
              <span className={styles.numPages}>/{numPages}</span>
              <span
                onClick={() =>
                  pageNumber !== 1 && onSetNumPages?.(pageNumber - 1)
                }
                className={styles.navigation}
              >
                <LeftOutlined className={styles.prevPage} />
                {t('ui.epaper.prevpage')}
              </span>
              <span
                onClick={() =>
                  pageNumber !== numPages && onSetNumPages?.(pageNumber + 1)
                }
                className={styles.navigation}
              >
                {t('ui.epaper.nextpage')}
                <RightOutlined className={styles.nextPage} />
              </span>
            </div>
          </div>
          <div className={styles.ePaperContent}>
            {docUrl && !isDocxFile ? (
              <MyEPaper
                pdfURL={docUrl}
                pageNumber={pageNumber}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
              />
            ) : (
              imageUrls &&
              imageUrls.length > 0 && (
                <div className={styles.ePaperImage}>
                  <img
                    src={imageUrls[pageNumber - 1]}
                    alt={imageUrls[pageNumber - 1]}
                  />
                </div>
              )
            )}
          </div>
        </>
      ) : (
        docUrl &&
        isDocxFile && (
          <div id="frame" className={styles.frameWrapper}>
            <iframe
              id="doc-iframe"
              title={'demo'}
              src={docUrl}
              frameBorder="0"
              width="100%"
              height="100%"
              scrolling="no"
              loading="lazy"
            ></iframe>
          </div>
        )
      )}
    </div>
  )
}

export default Epaper
