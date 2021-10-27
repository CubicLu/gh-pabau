import React, { FC, useRef, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import {
  ZoomInMode,
  ImageViewerEx,
  ImageViewerAlbum,
  SelectIndexProps,
} from '@pabau/ui'
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from 'react-compare-slider'
import { DropTarget } from 'react-drag-drop-container'
import styles from './ComparingSlider.module.less'

export interface ComparingSliderProps {
  isDragging: boolean
  selectedIndex: SelectIndexProps[]
  albums: ImageViewerAlbum[]
  selectedAlbum?: ImageViewerAlbum
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<SelectIndexProps[]>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
}

export const ComparingSlider: FC<ComparingSliderProps> = ({
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
  const isMobile = useMedia('(max-width: 767px)', false)
  const [width, setWidth] = useState(520)
  const [height, setHeight] = useState(700)

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
      className={styles.comparingSliderBody}
      ref={ref}
      id="image-viewer-container"
    >
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        <ReactCompareSlider
          onlyHandleDraggable={true}
          itemOne={
            <DropTarget onHit={(e) => handleDrop(e, 0)}>
              <ImageViewerEx
                imageViewerExId={'comparing-slider-one'}
                {...selectedIndex[0].option}
                dragging={setDragging(0)}
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
                    ? getImageDate(selectedIndex[0])
                    : ''
                }
                datePos="bottom"
                onChangeImageOption={(option) =>
                  handleChangeImageOption(option, 0)
                }
              />
            </DropTarget>
          }
          itemTwo={
            <DropTarget onHit={(e) => handleDrop(e, 1)}>
              <ImageViewerEx
                imageViewerExId={'comparing-slider-two'}
                {...selectedIndex?.[1]?.option}
                dragging={setDragging(1)}
                width={width}
                height={height}
                src={
                  selectedIndex[1].imageIndex >= 0
                    ? getImageUrl(selectedIndex[1]) || ''
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
                onChangeImageOption={(option) =>
                  handleChangeImageOption(option, 0)
                }
              />
            </DropTarget>
          }
          handle={
            <ReactCompareSliderHandle
              style={{ color: '#faad14' }}
              buttonStyle={{
                display:
                  selectedIndex[1].imageIndex >= 0 &&
                  selectedIndex[0].imageIndex >= 0
                    ? 'grid'
                    : 'none',
                border: 0,
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                boxShadow: 'none',
              }}
              linesStyle={{ opacity: 0 }}
            />
          }
        />
      </div>
    </div>
  )
}

export default ComparingSlider
