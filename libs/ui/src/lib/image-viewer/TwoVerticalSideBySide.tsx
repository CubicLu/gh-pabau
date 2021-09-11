import React, { FC, useRef, useEffect, useState } from 'react'
import { useMedia } from 'react-use'
import {
  ImageViewerEx,
  ZoomInMode,
  ImageViewerAlbum,
  SelectIndexProps,
} from '@pabau/ui'
import { DropTarget } from 'react-drag-drop-container'
import styles from './TwoVerticalSideBySide.module.less'

export interface TwoVerticalSideBySideProps {
  isDragging: boolean
  selectedIndex: SelectIndexProps[]
  albums: ImageViewerAlbum[]
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<SelectIndexProps[]>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
}

export const TwoVerticalSideBySide: FC<TwoVerticalSideBySideProps> = ({
  isDragging,
  selectedIndex,
  albums,
  zoomInMode,
  setIsDragging,
  setSelectedIndex,
  setZoomInMode,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMedia('(max-width: 767px)', false)
  const isDesktop = useMedia('(min-width: 1201px)', false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

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
    const currentAlbum = albums.find((el) => el.name === album)
    return currentAlbum ? currentAlbum.imageList[imageIndex].origin : ''
  }

  const getImageDate = (selectedIndex) => {
    const { album, imageIndex } = selectedIndex
    const currentAlbum = albums.find((el) => el.name === album)
    return currentAlbum ? currentAlbum.imageList[imageIndex].date : ''
  }

  const setDragging = (viewerIndex) => {
    if (isDragging) {
      const draggingIndex = selectedIndex
        .slice(0, 2)
        .findIndex((el) => el.imageIndex < 0)
      if (draggingIndex < 0) return true
      if (viewerIndex === draggingIndex) return true
    }
    return false
  }

  const handleChangeImageOption = (option, itemIndex) => {
    const imageItems = [...selectedIndex]
    const selectedItem = { ...imageItems[itemIndex], option }
    imageItems.splice(itemIndex, 1, selectedItem)
    setSelectedIndex(imageItems)
  }

  useEffect(() => {
    console.log('ref >>>', ref)
    if (!!ref && !!ref.current) {
      const x = isDesktop ? 1040 : 750
      const y = isDesktop ? 700 : 500
      const offsetWidth = ref.current.offsetWidth
      const offsetHeight = ref.current.offsetHeight - (isMobile ? 160 : 130)
      const aspectRatio = x / y
      const rAspectRatio = offsetWidth / offsetHeight
      let widthValue = 0
      let heightValue = 0
      if (isMobile) {
        widthValue = offsetWidth > 320 ? 320 : offsetWidth
        heightValue = (widthValue / 320) * 860
      } else {
        if (rAspectRatio > aspectRatio) {
          widthValue = (offsetHeight / y) * x
          heightValue = offsetHeight
        } else {
          widthValue = offsetWidth
          heightValue = (offsetWidth / x) * y
        }
      }
      setHeight(heightValue)
      setWidth(widthValue)
    }
  }, [ref, isMobile, isDesktop])

  return (
    <div
      className={styles.twoVerticalSideBody}
      ref={ref}
      id="image-viewer-container"
    >
      <DropTarget onHit={(e) => handleDrop(e, 0)}>
        <div
          style={{
            width: `${!isMobile ? width / 2 : width}px`,
            height: `${!isMobile ? height : height / 2}px`,
          }}
        >
          <ImageViewerEx
            imageViewerExId="vertical-side-by-side-one"
            {...selectedIndex[0].option}
            dragging={setDragging(0)}
            width={!isMobile ? width / 2 : width}
            height={!isMobile ? height : height / 2}
            src={
              selectedIndex[0].imageIndex >= 0
                ? getImageUrl(selectedIndex[0])
                : ''
            }
            viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
            magnifierZoomInValue={zoomInMode}
            date={
              selectedIndex[0].imageIndex >= 0
                ? getImageDate(selectedIndex[0])
                : ''
            }
            datePos={isMobile ? 'top' : 'bottom'}
            onChangeImageOption={(option) => handleChangeImageOption(option, 0)}
          />
        </div>
      </DropTarget>
      <DropTarget onHit={(e) => handleDrop(e, 1)}>
        <div
          style={{
            width: `${!isMobile ? width / 2 : width}px`,
            height: `${!isMobile ? height : height / 2}px`,
          }}
        >
          <ImageViewerEx
            imageViewerExId="vertical-side-by-side-two"
            {...selectedIndex[1].option}
            dragging={setDragging(1)}
            width={!isMobile ? width / 2 : width}
            height={!isMobile ? height : height / 2}
            src={
              selectedIndex[1].imageIndex >= 0
                ? getImageUrl(selectedIndex[1])
                : ''
            }
            viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
            magnifierZoomInValue={zoomInMode}
            date={
              selectedIndex[1].imageIndex >= 0
                ? getImageDate(selectedIndex[1])
                : ''
            }
            datePos="bottom"
            onChangeImageOption={(option) => handleChangeImageOption(option, 1)}
          />
        </div>
      </DropTarget>
    </div>
  )
}

export default TwoVerticalSideBySide
