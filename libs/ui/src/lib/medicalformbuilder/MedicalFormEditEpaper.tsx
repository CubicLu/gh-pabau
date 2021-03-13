import { Epaper } from '@pabau/ui'
import React, { FC, useState } from 'react'
import backgroundImg from '../../assets/images/medicalform_epaper.svg'
import styles from './MedicalFormBuilder.module.less'

interface P {
  previewPdf: boolean
}
const MedicalFormEditEpaper: FC<P> = ({ previewPdf }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  const onSetNumPages = (page: number) => {
    setPageNumber(page)
  }
  return (
    <div>
      {previewPdf === false ? (
        <div className={styles.medicalFormEditMainEmptyPanel}>
          <img src={backgroundImg} alt="" />
          <h1>Upload ebook or images</h1>
          <span>Some description here</span>
        </div>
      ) : (
        <Epaper
          title={'Ganog’s-Review-of-Medical-Psysiology.pdf'}
          numPages={numPages}
          pageNumber={pageNumber}
          pdfURL={
            'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf?hsLang=en'
          }
          images={[]}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          onSetNumPages={onSetNumPages}
        />
      )}
    </div>
  )
}

export default MedicalFormEditEpaper
