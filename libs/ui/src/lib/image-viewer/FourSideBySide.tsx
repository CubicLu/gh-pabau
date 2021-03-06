import React, { FC, useRef, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import { DropTarget } from 'react-drag-drop-container'
import {
  ImageViewerEx,
  ZoomInMode,
  ImageViewerAlbum,
  ImageViewerDatePos,
  SelectIndexProps,
} from '@pabau/ui'
import styles from './FourSideBySide.module.less'

export interface FourSideBySideProps {
  isDragging: boolean
  selectedIndex: SelectIndexProps[]
  albums: ImageViewerAlbum[]
  selectedAlbum?: ImageViewerAlbum
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<SelectIndexProps[]>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
}

export const FourSideBySide: FC<FourSideBySideProps> = ({
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
  const datePositionsDesktop: ImageViewerDatePos[] = [
    'left',
    'right',
    'left',
    'right',
  ]
  const datePositionsTablet: ImageViewerDatePos[] = [
    'top',
    'top',
    'bottom',
    'bottom',
  ]
  const datePositionsMobile: ImageViewerDatePos[] = [
    'top',
    'none',
    'none',
    'bottom',
  ]
  const isDesktop = useMedia('(min-width: 1201px)', true)
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
        .slice(0, 4)
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
      const offsetHeight = ref.current.offsetHeight - (isDesktop ? 100 : 160)
      const aspectRatio = x / y
      const rAspectRatio = offsetWidth / offsetHeight
      let widthValue = 0
      let heightValue = 0
      if (isMobile) {
        widthValue = offsetWidth > 345 ? 345 : offsetWidth
        heightValue = (widthValue / 345) * 800
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
      className={styles.fourSideBySideBody}
      ref={ref}
      id="image-viewer-container"
    >
      {[0, 1, 2, 3].map((_, index) => (
        <div key={`four-side-by-side-${index}`}>
          <DropTarget onHit={(e) => handleDrop(e, index)}>
            <div
              style={{
                width: `${isMobile ? width : width / 2}px`,
                height: `${isMobile ? height / 4 : height / 2}px`,
              }}
            >
              <ImageViewerEx
                imageViewerExId={`four-side-by-side-${index}`}
                {...selectedIndex[index].option}
                dragging={setDragging(index)}
                width={isMobile ? width : width / 2}
                height={isMobile ? height / 4 : height / 2}
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
                datePos={
                  isDesktop
                    ? datePositionsDesktop[index]
                    : isMobile
                    ? datePositionsMobile[index]
                    : datePositionsTablet[index]
                }
                onChangeImageOption={(option) =>
                  handleChangeImageOption(option, index)
                }
              />
            </div>
          </DropTarget>
        </div>
      ))}
    </div>
  )
}

export default FourSideBySide
