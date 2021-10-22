import React, { FC, useRef, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import { DropTarget } from 'react-drag-drop-container'
import {
  ImageViewerEx,
  ImageViewerDatePos,
  ZoomInMode,
  ImageViewerAlbum,
  SelectIndexProps,
} from '@pabau/ui'
import styles from './ThreeSideBySide.module.less'

export interface ThreeSideBySideProps {
  isDragging: boolean
  selectedIndex: SelectIndexProps[]
  albums: ImageViewerAlbum[]
  selectedAlbum?: ImageViewerAlbum
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<SelectIndexProps[]>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
}

export const ThreeSideBySide: FC<ThreeSideBySideProps> = ({
  isDragging,
  selectedIndex,
  albums,
  selectedAlbum,
  zoomInMode,
  setIsDragging,
  setSelectedIndex,
  setZoomInMode,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const datePositions: ImageViewerDatePos[] = ['top', 'none', 'bottom']
  const isMobile = useMedia('(max-width: 767px)', false)
  const isDesktop = useMedia('(min-width: 1201px)', true)

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

  const setDragging = (viewerIndex) => {
    if (isDragging) {
      const draggingIndex = selectedIndex
        .slice(0, 3)
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
        heightValue = (widthValue / 320) * 1140
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
      className={styles.threeSideBySideBody}
      ref={ref}
      id="image-viewer-container"
    >
      {[0, 1, 2].map((_, index) => (
        <DropTarget
          key={`three-side-by-side-${index}`}
          onHit={(e) => handleDrop(e, index)}
        >
          <div
            style={{
              width: `${isMobile ? width : width / 3}px`,
              height: `${isMobile ? height / 3 : height}px`,
            }}
          >
            <ImageViewerEx
              imageViewerExId={`three-side-by-side-${index}`}
              {...selectedIndex[index].option}
              dragging={setDragging(index)}
              width={isMobile ? width : width / 3}
              height={isMobile ? height / 3 : height}
              src={
                selectedIndex[index].imageIndex >= 0
                  ? getImageUrl(selectedIndex[index]) || ''
                  : ''
              }
              viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
              magnifierZoomInValue={zoomInMode}
              date={
                selectedIndex[index].imageIndex >= 0
                  ? getImageDate(selectedIndex[index])
                  : ''
              }
              datePos={!isMobile ? 'bottom' : datePositions[index]}
              onChangeImageOption={(option) =>
                handleChangeImageOption(option, index)
              }
            />
          </div>
        </DropTarget>
      ))}
    </div>
  )
}

export default ThreeSideBySide
