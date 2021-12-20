import React, { FC } from 'react'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
interface P {
  fileURL: string
  className?: string
}

const RenderDocument: FC<P> = ({ fileURL, ...props }) => (
  <DocViewer
    documents={[{ uri: fileURL }]}
    pluginRenderers={DocViewerRenderers}
    {...props}
  />
)
export default RenderDocument
