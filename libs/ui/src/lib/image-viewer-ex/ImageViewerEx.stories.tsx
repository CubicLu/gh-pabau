import React, { FC, useState } from 'react'
import { Button } from '@pabau/ui'
import ImageViewerEx from './ImageViewerEx'
import sampleImage from '../../assets/images/image-viewer/sample/image233.png'

export default {
  component: ImageViewerEx,
  title: 'UI/ImageViewerEx',
}

export const ImageViewerExStory: FC = () => {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [dragging, setDragging] = useState(false)
  return (
    <>
      <Button
        type="primary"
        onClick={() => setShowMagnifier((e) => !e)}
        style={{ marginRight: '4px' }}
      >
        {showMagnifier ? 'Disable Magnifier' : 'Enable Magnifier'}
      </Button>
      <Button
        type="primary"
        onClick={() => setDragging((e) => !e)}
        style={{ marginRight: '4px' }}
      >
        {dragging ? 'Disable Dragging' : 'Enable Dragging'}
      </Button>
      <ImageViewerEx
        scale={1}
        positionX={0}
        positionY={0}
        dragging={dragging}
        imageViewerExId="storybook-test"
        width={520}
        height={700}
        src={sampleImage}
        viewMagnifier={showMagnifier}
        onChangeImageOption={(option) => {
          return
        }}
      />
    </>
  )
}
