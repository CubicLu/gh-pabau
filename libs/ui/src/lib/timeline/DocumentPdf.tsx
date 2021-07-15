import React, { FC } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface P {
  pdfURL?: string
  pageNumber: number
}

const DocumentPdf: FC<P> = ({ pdfURL, pageNumber }) => (
  <Document file={{ url: pdfURL }}>
    <Page pageNumber={pageNumber} scale={1.3} renderAnnotationLayer={false} />
  </Document>
)
export default DocumentPdf
