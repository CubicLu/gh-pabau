import { Button } from 'antd'
import React, { FC, useState } from 'react'
import ImageViewer from './ImageViewer'
import { albums } from './mock'

export default {
  component: ImageViewer,
  title: 'UI/ImageViewer',
}

export const ImageViewerStory: FC = () => {
  const [visible, setVisible] = useState(true)
  return (
    <>
      {!visible && (
        <Button type="primary" onClick={() => setVisible(() => true)}>
          Open Studio
        </Button>
      )}
      <ImageViewer
        visible={visible}
        title={''}
        onClose={() => {
          setVisible(() => false)
        }}
        albums={albums}
      />
    </>
  )
}
