import React, { FC, useRef, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import { DropTarget } from 'react-drag-drop-container'
import {
  ImageViewerEx,
  ZoomInMode,
  ImageViewerAlbum,
  SelectIndexProps,
} from '@pabau/ui'
import styles from './TwoHorizontalSideBySide.module.less'

export interface TwoHorizontalSideBySideProps {
  isDragging: boolean
  selectedIndex: SelectIndexProps[]
  albums: ImageViewerAlbum[]
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<SelectIndexProps[]>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
}

export const TwoHorizontalSideBySide: FC<TwoHorizontalSideBySideProps> = ({
  isDragging,
  selectedIndex,
  albums,
  zoomInMode,
  setIsDragging,
  setSelectedIndex,
  setZoomInMode,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useMedia('(min-width: 1201px)', false)
  const isMobile = useMedia('(max-width: 767px)', false)
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
    if (!!ref && !!ref.current) {
      const x = isDesktop ? 1040 : 745
      const y = isDesktop ? 700 : 500
      const offsetWidth = ref.current.offsetWidth
      const offsetHeight = ref.current.offsetHeight - (isDesktop ? 100 : 160)
      const aspectRatio = x / y
      const rAspectRatio = offsetWidth / offsetHeight
      let widthValue = 0
      let heightValue = 0
      if (isMobile) {
        widthValue = offsetWidth > 345 ? 345 : offsetWidth
        heightValue = (widthValue / 345) * 400
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
      className={styles.twoHorizontalSideBody}
      ref={ref}
      id="image-viewer-container"
    >
      <DropTarget onHit={(e) => handleDrop(e, 0)}>
        <div
          style={{
            width: `${width}px`,
            height: `${height / 2}px`,
          }}
        >
          <ImageViewerEx
            imageViewerExId="horizontal-side-by-side-one"
            {...selectedIndex[0].option}
            dragging={setDragging(0)}
            width={width}
            height={height / 2}
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
            datePos={isDesktop ? 'right' : 'top'}
            onChangeImageOption={(option) => handleChangeImageOption(option, 0)}
          />
        </div>
      </DropTarget>
      <DropTarget onHit={(e) => handleDrop(e, 1)}>
        <div
          style={{
            width: `${width}px`,
            height: `${height / 2}px`,
          }}
        >
          <ImageViewerEx
            imageViewerExId="horizontal-side-by-side-two"
            {...selectedIndex[1].option}
            dragging={setDragging(1)}
            width={width}
            height={height / 2}
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
            datePos={isDesktop ? 'right' : 'bottom'}
            onChangeImageOption={(option) => handleChangeImageOption(option, 1)}
          />
        </div>
      </DropTarget>
    </div>
  )
}

export default TwoHorizontalSideBySide
