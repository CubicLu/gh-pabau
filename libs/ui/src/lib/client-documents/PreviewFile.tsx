import React, { FC, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  RightOutlined,
  LeftOutlined,
  ShareAltOutlined,
  CloseOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import styles from './ClientDocuments.module.less'
import { Button } from 'antd'
import { FormikInput } from '../formik-input/FormikInput'
import { useMedia } from 'react-use'

export interface EPaperProps {
  title: string
  numPages: number
  pageNumber: number
  onSetNumPages: (page) => void
  pdfURL?: string
  onDocumentLoadSuccess?: ({ numPages: number }) => void
  setPreviewModal: (e) => void
}

const PdfPreview = dynamic(() => import('./DocumentViewer'), {
  ssr: false,
})

export const PreviewFile: FC<EPaperProps> = ({
  title,
  pdfURL,
  numPages,
  pageNumber,
  onSetNumPages,
  onDocumentLoadSuccess,
  setPreviewModal,
}) => {
  const [showPage, setShowPage] = useState(pageNumber)
  useEffect(() => {
    setShowPage(1)
  }, [])
  const isMobile = useMedia('(max-width: 767px)', false)

  return (
    <div className={styles.ePaper}>
      {pdfURL && !isMobile && (
        <>
          <div className={styles.ePaperHeader}>
            <span className={styles.ePaperTitle}>{title}</span>
            <div className={styles.ePaperPage}>
              <span>Page</span>
              <FormikInput
                name="page"
                value={numPages < showPage ? 1 : showPage}
                className={styles.ePaperPageNumber}
                onChange={(e) =>
                  setShowPage(
                    e.target.value ? Number.parseInt(e.target.value) : 1
                  )
                }
              />
              <span className={styles.numPages}>/{numPages}</span>
              <Button className={styles.shareBtn} icon={<ShareAltOutlined />}>
                Share
              </Button>
              <Button
                className={styles.shareBtn}
                icon={<LeftOutlined />}
                onClick={() => {
                  showPage !== 1 && onSetNumPages?.(showPage - 1)
                  showPage !== 1 && setShowPage((e) => e - 1)
                }}
              >
                Prev Page
              </Button>
              <Button
                className={styles.shareBtn}
                icon={<RightOutlined />}
                onClick={() => {
                  showPage !== numPages && onSetNumPages?.(showPage + 1)
                  showPage !== numPages && setShowPage((e) => e + 1)
                }}
              >
                Next Page
              </Button>
              <Button
                className={styles.shareBtn}
                icon={<CloseOutlined />}
                shape="circle"
                onClick={() => setPreviewModal((e) => !e)}
              />
            </div>
          </div>
          <div className={styles.ePaperContent}>
            {pdfURL && (
              <PdfPreview
                pdfURL={pdfURL}
                pageNumber={numPages < showPage ? 1 : showPage}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
              />
            )}
          </div>
        </>
      )}
      {pdfURL && isMobile && (
        <>
          <div className={styles.ePaperMobileHeader}>
            <span className={styles.ePaperMobileTitle}>{title}</span>
            <div className={styles.ePaperMobilePage}>
              <Button
                className={styles.shareBtn}
                icon={<MoreOutlined />}
                shape="circle"
              />
              <Button
                className={styles.shareBtn}
                icon={<CloseOutlined />}
                shape="circle"
                onClick={() => setPreviewModal((e) => !e)}
              />
            </div>
          </div>
          <div className={styles.ePaperMobileContent}>
            {pdfURL && (
              <PdfPreview
                pdfURL={pdfURL}
                pageNumber={numPages < showPage ? 1 : showPage}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
              />
            )}
            <div className={styles.bottomBar}>
              <Button
                className={styles.shareBtn}
                icon={<LeftOutlined />}
                onClick={() => {
                  showPage !== 1 && onSetNumPages?.(showPage - 1)
                  showPage !== 1 && setShowPage((e) => e - 1)
                }}
              >
                Prev Page
              </Button>
              <span>Page</span>
              <FormikInput
                name="page"
                value={numPages < showPage ? 1 : showPage}
                className={styles.ePaperPageNumber}
                onChange={(e) =>
                  setShowPage(
                    e.target.value ? Number.parseInt(e.target.value) : 1
                  )
                }
              />
              <span className={styles.numPages}>/{numPages}</span>

              <Button
                className={styles.shareBtn}
                onClick={() => {
                  showPage !== numPages && onSetNumPages?.(showPage + 1)
                  showPage !== numPages && setShowPage((e) => e + 1)
                }}
              >
                Next Page <RightOutlined />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PreviewFile
