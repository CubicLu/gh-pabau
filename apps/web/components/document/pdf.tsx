import React, { FC } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export interface Q {
  type?: string
  size?: number
}
interface P {
  pdfData?: Q
  pageNumber: number
  onDocumentLoadSuccess?: ({ numPages: number }) => void
}

const Pdf: FC<P> = ({ pdfData, pageNumber, onDocumentLoadSuccess }) => {
  return (
    <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} scale={1.3} renderAnnotationLayer={false} />
    </Document>
  )
}
export default Pdf
