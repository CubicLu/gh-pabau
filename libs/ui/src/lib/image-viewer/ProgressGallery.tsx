import React, { FC, useState } from 'react'
import moment from 'moment'
import { DropTarget } from 'react-drag-drop-container'
import cn from 'classnames'
import { useMedia } from 'react-use'
import {
  ImageViewerEx,
  ZoomInMode,
  ImageViewerAlbum,
  SelectIndexProps,
} from '@pabau/ui'
import styles from './ProgressGallery.module.less'

export interface ProgressGalleryProps {
  isDragging: boolean
  albums: ImageViewerAlbum[]
  zoomInMode: ZoomInMode
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setZoomInMode: React.Dispatch<React.SetStateAction<ZoomInMode>>
  onChangeIndex: (selected: SelectIndexProps[]) => void
}

export const ProgressGallery: FC<ProgressGalleryProps> = ({
  isDragging,
  albums,
  zoomInMode,
  setIsDragging,
  setZoomInMode,
  onChangeIndex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<SelectIndexProps[]>([
    {
      imageIndex: -1,
      album: '',
      option: {
        scale: 1,
        positionX: 0,
        positionY: 0,
      },
    },
    {
      imageIndex: -1,
      album: '',
      option: {
        scale: 1,
        positionX: 0,
        positionY: 0,
      },
    },
  ])
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
    onChangeIndex(
      selected.find((el) => el.imageIndex < 0)
        ? selected
        : [
            ...selected,
            {
              imageIndex: -1,
              album: '',
              option: { scale: 1, positionX: 0, positionY: 0 },
            },
          ]
    )
    setSelectedIndex(
      selected.find((el) => el.imageIndex < 0)
        ? selected
        : [
            ...selected,
            {
              imageIndex: -1,
              album: '',
              option: { scale: 1, positionX: 0, positionY: 0 },
            },
          ]
    )
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

  const getNextDraggableIndex = () => {
    return selectedIndex.findIndex((el) => el.imageIndex < 0)
  }

  const handleChangeImageOption = (option, itemIndex) => {
    const imageItems = [...selectedIndex]
    const selectedItem = { ...imageItems[itemIndex], option }
    imageItems.splice(itemIndex, 1, selectedItem)
    onChangeIndex(imageItems)
    setSelectedIndex(imageItems)
  }

  return (
    <div className={styles.progressGalleryBody}>
      {!isMobile && (
        <div className={styles.desktop} id="image-viewer-container">
          <div>
            <div>
              {selectedIndex
                .filter((_, index) => index % 2 !== 0)
                .map((selected, index) => (
                  <DropTarget
                    key={`progress-gallery-item-${index * 2 + 1}`}
                    onHit={(e) => handleDrop(e, index * 2 + 1)}
                  >
                    <div className={styles.progressGalleryItem}>
                      {selected.imageIndex >= 0 && (
                        <p className={styles.date}>
                          {moment(
                            selected.imageIndex >= 0
                              ? getImageDate(selected)
                              : ''
                          ).format('MMM D, YYYY')}
                        </p>
                      )}
                      <ImageViewerEx
                        imageViewerExId={`progress-gallery-item-${
                          index * 2 + 1
                        }`}
                        {...selectedIndex[index * 2 + 1].option}
                        dragging={
                          isDragging &&
                          index * 2 + 1 === getNextDraggableIndex()
                        }
                        width={280}
                        height={372}
                        src={
                          selected.imageIndex >= 0 ? getImageUrl(selected) : ''
                        }
                        viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
                        magnifierZoomInValue={zoomInMode}
                        date={
                          selected.imageIndex >= 0 ? getImageDate(selected) : ''
                        }
                        datePos="none"
                        onChangeImageOption={(option) =>
                          handleChangeImageOption(option, index * 2 + 1)
                        }
                      />
                    </div>
                  </DropTarget>
                ))}
            </div>
            <div>
              {selectedIndex
                .filter((_, index) => index % 2 === 0)
                .map((selected, index) => (
                  <DropTarget
                    key={`progress-gallery-item-${index * 2}`}
                    onHit={(e) => handleDrop(e, index * 2)}
                  >
                    <div className={styles.progressGalleryItem}>
                      {selected.imageIndex >= 0 && (
                        <p className={styles.date}>
                          {moment(
                            selected.imageIndex >= 0
                              ? getImageDate(selected)
                              : ''
                          ).format('MMM D, YYYY')}
                        </p>
                      )}
                      <ImageViewerEx
                        imageViewerExId={`progress-gallery-item-${index * 2}`}
                        {...selectedIndex[index * 2].option}
                        dragging={
                          isDragging && index * 2 === getNextDraggableIndex()
                        }
                        width={280}
                        height={372}
                        src={
                          selected.imageIndex >= 0 ? getImageUrl(selected) : ''
                        }
                        viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
                        magnifierZoomInValue={zoomInMode}
                        date={
                          selected.imageIndex >= 0 ? getImageDate(selected) : ''
                        }
                        datePos="none"
                        onChangeImageOption={(option) =>
                          handleChangeImageOption(option, index * 2)
                        }
                      />
                    </div>
                  </DropTarget>
                ))}
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className={styles.mobile} id="image-viewer-container">
          {selectedIndex.map((selected, index) => (
            <DropTarget
              key={`progress-gallery-item-${index}`}
              onHit={(e) => handleDrop(e, index)}
            >
              <div
                className={cn(
                  styles.progressGalleryItem,
                  index % 2 === 0 ? styles.right : styles.left
                )}
              >
                {selected.imageIndex >= 0 && (
                  <div className={styles.date}>
                    <p>
                      {moment(
                        selected.imageIndex >= 0 ? getImageDate(selected) : ''
                      ).format('MMM D, YYYY')}
                    </p>
                  </div>
                )}
                <ImageViewerEx
                  imageViewerExId={`progress-gallery-item-${index}`}
                  {...selectedIndex[index].option}
                  dragging={isDragging && index === getNextDraggableIndex()}
                  width={196}
                  height={260}
                  src={selected.imageIndex >= 0 ? getImageUrl(selected) : ''}
                  viewMagnifier={zoomInMode !== ZoomInMode.zoomInNone}
                  magnifierZoomInValue={zoomInMode}
                  date={selected.imageIndex >= 0 ? getImageDate(selected) : ''}
                  datePos="none"
                  onChangeImageOption={(option) =>
                    handleChangeImageOption(option, index)
                  }
                />
              </div>
            </DropTarget>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProgressGallery
