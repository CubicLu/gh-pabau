import React, { FC, useRef, useEffect, useState } from 'react'
import { useMedia } from 'react-use'
import {
  ZoomInMode,
  ImageViewerAlbum,
  ImageViewerEx,
  SelectIndexProps,
} from '@pabau/ui'
import { DropTarget } from 'react-drag-drop-container'
import styles from './SinglePhoto.module.less'

export interface SinglePhotoProps {
  isDragging: boolean
  selectedIndex: SelectIndexProps[]
  albums: ImageViewerAlbum[]
  selectedAlbum?: ImageViewerAlbum
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<SelectIndexProps[]>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
}

export const SinglePhoto: FC<SinglePhotoProps> = ({
  isDragging,
  selectedIndex,
  albums,
  selectedAlbum,
  zoomInMode,
  setSelectedIndex,
  setZoomInMode,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const isMobile = useMedia('(max-width: 767px)', false)

  const handleDrop = (e, index) => {
    e.preventDefault()
    const selected = [...selectedIndex]
    const { album, imageIndex } = e.dragData
    if (
      !selected.find((el) => el.album === album && el.imageIndex === imageIndex)
    ) {
      selected[index] = e.dragData
    }
    setSelectedIndex(selected)
    setZoomInMode(ZoomInMode.zoomInNone)
  }

  const getImageUrl = (selectedIndex) => {
    const { album, imageIndex } = selectedIndex
    const currentAlbum = selectedAlbum || albums.find((el) => el.name === album)
    return currentAlbum ? currentAlbum?.imageList?.[imageIndex]?.origin : ''
  }

  const getImageDate = (selectedIndex) => {
    const { album, imageIndex } = selectedIndex
    const currentAlbum = selectedAlbum || albums.find((el) => el.name === album)
    return currentAlbum
      ? (currentAlbum?.imageList?.[imageIndex]?.date as string)
      : ''
  }

  const handleChangeImageOption = (option, itemIndex) => {
    const imageItems = [...selectedIndex]
    const selectedItem = { ...imageItems[itemIndex], option }
    imageItems.splice(itemIndex, 1, selectedItem)
    setSelectedIndex(imageItems)
  }

  useEffect(() => {
    if (!!ref && !!ref.current) {
      const x = isMobile ? 320 : 520
      const y = isMobile ? 430 : 700
      const offsetWidth = ref.current.offsetWidth
      const offsetHeight = ref.current.offsetHeight - 130
      const aspectRatio = x / y
      const rAspectRatio = offsetWidth / offsetHeight
      let widthValue = 0
      let heightValue = 0
      if (!isMobile) {
        if (rAspectRatio > aspectRatio) {
          widthValue = (offsetHeight / y) * x
          heightValue = offsetHeight
        } else {
          widthValue = offsetWidth
          heightValue = (offsetWidth / x) * y
        }
      } else {
        widthValue = offsetWidth
        heightValue = (offsetWidth / x) * y
      }
      setHeight(heightValue)
      setWidth(widthValue)
    }
  }, [ref, isMobile])

  return (
    <div
      className={styles.singlePhotoContainer}
      ref={ref}
      id="image-viewer-container"
    >
      <DropTarget onHit={(e) => handleDrop(e, 0)}>
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <ImageViewerEx
            imageViewerExId={'single-photo-mode'}
            {...selectedIndex[0].option}
            dragging={isDragging}
            width={width}
            height={height}
            src={
              selectedIndex[0].imageIndex >= 0
                ? getImageUrl(selectedIndex[0]) || ''
                : ''
            }
            viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
            magnifierZoomInValue={zoomInMode}
            date={
              selectedIndex[0].imageIndex >= 0
                ? getImageDate(selectedIndex[0]) || ''
                : ''
            }
            datePos={isMobile ? 'top' : 'bottom'}
            onChangeImageOption={(option) => handleChangeImageOption(option, 0)}
          />
        </div>
      </DropTarget>
    </div>
  )
}

export default SinglePhoto
