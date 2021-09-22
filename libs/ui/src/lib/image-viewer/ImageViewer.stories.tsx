import React, { FC } from 'react'
import ImageViewer from './ImageViewer'
import { albums } from './mock'

export default {
  component: ImageViewer,
  title: 'UI/ImageViewer',
}

export const ImageViewerStory: FC = () => {
  return (
    <ImageViewer
      visible={true}
      title={''}
      onClose={() => {
        return
      }}
      albums={albums}
    />
  )
}
