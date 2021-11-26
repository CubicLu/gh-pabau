import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styles from './Epaper.module.less'

export interface EPaperProps {
  title: string
  numPages: number
  pageNumber: number
  onSetNumPages: (page) => void
  pdfURL?: string
  images?: string[]
  isDocxFile?: boolean
  onDocumentLoadSuccess?: ({ numPages: number }) => void
}

const MyEPaper = dynamic(() => import('./MyEpaper'), {
  ssr: false,
})

export const Epaper: FC<EPaperProps> = ({
  title,
  pdfURL,
  images,
  numPages,
  pageNumber,
  onSetNumPages,
  onDocumentLoadSuccess,
  isDocxFile,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.ePaper}>
      {(pdfURL && !isDocxFile) || images?.length ? (
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
            {pdfURL && !isDocxFile ? (
              <MyEPaper
                pdfURL={pdfURL}
                pageNumber={pageNumber}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
              />
            ) : (
              images &&
              images.length > 0 && (
                <div className={styles.ePaperImage}>
                  <img
                    src={images[pageNumber - 1]}
                    alt={images[pageNumber - 1]}
                  />
                </div>
              )
            )}
          </div>
        </>
      ) : (
        pdfURL &&
        isDocxFile && (
          <div id="frame" className={styles.frameWrapper}>
            <iframe
              id="doc-iframe"
              title={'demo'}
              src={pdfURL}
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
