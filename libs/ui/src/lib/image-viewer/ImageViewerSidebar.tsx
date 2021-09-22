import React, { FC, useState, useEffect } from 'react'
import {
  CheckCircleFilled,
  RightOutlined,
  LeftOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import cn from 'classnames'
import { Popover, Skeleton } from 'antd'
import {
  ImageViewerAlbum,
  AlbumImageItem,
  ComparingMode,
  SelectIndexProps,
} from '@pabau/ui'
import { DragDropContainer } from 'react-drag-drop-container'
import sidebarToggle from '../../assets//images/image-viewer/sidebar-toggle.svg'
import styles from './ImageViewerSidebar.module.less'

export interface ImageViewerSidebarProps {
  comparingMode: ComparingMode
  sidebarOpen: boolean
  albums: ImageViewerAlbum[]
  selectedIndex: SelectIndexProps[]
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageViewerSidebarItem = ({
  comparingMode,
  origin,
  setIsDragging,
  setSidebarOpen,
  selectedIndex,
  currentAlbum,
  imageIndex,
}: {
  comparingMode: ComparingMode
  origin: string
  currentAlbum: string
  imageIndex: number
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedIndex: SelectIndexProps[]
}) => {
  const [source, setSource] = useState('')
  const handleDragStart = (item) => {
    const { album, imageIndex } = item
    if (
      !selectedIndex.find(
        (el) => el.album === album && el.imageIndex === imageIndex
      )
    ) {
      setSidebarOpen(false)
      setIsDragging(true)
    }
  }
  const handleDragEnd = () => {
    setIsDragging(false)
    if (comparingMode === ComparingMode['single-photo']) {
      setSidebarOpen(selectedIndex[0].imageIndex < 0)
    }
    if (
      comparingMode === ComparingMode['comparing-slider'] ||
      comparingMode === ComparingMode['two-horizontal-side-by-side'] ||
      comparingMode === ComparingMode['two-vertical-side-by-side']
    ) {
      setSidebarOpen(
        selectedIndex.slice(0, 2).filter((el) => el.imageIndex < 0).length > 0
      )
    }
    if (comparingMode === ComparingMode['three-side-by-side']) {
      setSidebarOpen(
        selectedIndex.slice(0, 3).filter((el) => el.imageIndex < 0).length > 0
      )
    }
    if (comparingMode === ComparingMode['four-side-by-side']) {
      setSidebarOpen(
        selectedIndex.slice(0, 4).filter((el) => el.imageIndex < 0).length > 0
      )
    }
    if (comparingMode === ComparingMode['six-side-by-side']) {
      setSidebarOpen(
        selectedIndex.slice(0, 6).filter((el) => el.imageIndex < 0).length > 0
      )
    }
    if (comparingMode === ComparingMode['progress-gallery']) {
      setSidebarOpen(true)
    }
  }
  useEffect(() => {
    if (source === '' && origin !== '') {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.addEventListener('load', () => {
        //draw origin image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          img.width,
          img.height
        )
        setSource(canvas.toDataURL())
      })
      img.addEventListener('error', () => {
        setSource('load-error')
      })
      img.src = origin
    }
  }, [source, origin])
  return (
    <DragDropContainer
      dragData={{
        album: currentAlbum,
        imageIndex,
        option: { scale: 1, positionX: 0, positionY: 0 },
      }}
      dragClone={false}
      onDragStart={() =>
        handleDragStart({
          album: currentAlbum,
          imageIndex,
        })
      }
      onDragEnd={() => handleDragEnd()}
      customDragElement={
        <div
          className={styles.dragItem}
          style={{ backgroundImage: `url(${source})` }}
        />
      }
    >
      {source ? (
        <div
          className={styles.imageItemThumbnail}
          style={{ backgroundImage: `url(${source})` }}
        >
          {selectedIndex.find(
            (el) => el.album === currentAlbum && el.imageIndex === imageIndex
          ) && (
            <div className={styles.selelctedThumbnail}>
              <div className={styles.selectedIndex}>
                <div className={styles.checkIcon}>
                  <CheckCircleFilled />
                </div>
                {selectedIndex.findIndex(
                  (el) =>
                    el.album === currentAlbum && el.imageIndex === imageIndex
                ) + 1}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.imageItemThumbnail}>
          <Skeleton.Image />
          {selectedIndex.find(
            (el) => el.album === currentAlbum && el.imageIndex === imageIndex
          ) && (
            <div className={styles.selelctedThumbnail}>
              <div className={styles.selectedIndex}>
                <div className={styles.checkIcon}>
                  <CheckCircleFilled />
                </div>
                {selectedIndex.findIndex(
                  (el) =>
                    el.album === currentAlbum && el.imageIndex === imageIndex
                ) + 1}
              </div>
            </div>
          )}
        </div>
      )}
    </DragDropContainer>
  )
}

export const ImageViewerSidebar: FC<ImageViewerSidebarProps> = ({
  comparingMode,
  sidebarOpen,
  albums,
  selectedIndex,
  setIsDragging,
  setSidebarOpen,
}) => {
  const [imageItems, setImageItems] = useState<AlbumImageItem[]>([])
  const [currentAlbum, setCurrentAlbum] = useState('')
  const [openAlbumDrop, setOpenAlbumDrop] = useState(false)

  const albumsDropdown = (
    <div className={styles.albumsDropdown}>
      {albums.map((item, index) => (
        <div
          className={styles.albumDropdownItem}
          key={`album-dropdown-item-${index}`}
          onClick={() => {
            setImageItems(item.imageList)
            setCurrentAlbum(item.name)
            setOpenAlbumDrop(false)
          }}
        >
          <div>{item.name}</div>
          <div>{item.imageList.length}</div>
        </div>
      ))}
    </div>
  )

  const checkSelectedStatusForSameDate = (date) => {
    let status = false
    for (const el of selectedIndex) {
      if (
        el.album === currentAlbum &&
        el.imageIndex >= 0 &&
        moment(date).isSame(imageItems[el.imageIndex].date, 'day')
      ) {
        status = true
        break
      }
    }
    return status
  }

  useEffect(() => {
    if (albums.length > 0 && currentAlbum === '') {
      setCurrentAlbum(albums[0].name)
      setImageItems(albums[0].imageList)
    }
  }, [albums, currentAlbum])

  return (
    <div
      className={
        sidebarOpen
          ? styles.imageViewerSideBar
          : cn(styles.imageViewerSideBar, styles.hideSidebar)
      }
    >
      <div>
        <Popover
          visible={openAlbumDrop}
          placement="bottom"
          trigger="click"
          content={albumsDropdown}
          onVisibleChange={(visible) => setOpenAlbumDrop(visible)}
          overlayClassName={styles.albumsPopover}
        >
          <div className={styles.albumSelector}>
            <div>{currentAlbum}</div>
            <div>
              <CaretDownOutlined />
            </div>
          </div>
        </Popover>
        {imageItems.map((item, index) => (
          <React.Fragment key={`image-item-${index}`}>
            {(index === 0 ||
              !moment(imageItems[index - 1].date).isSame(
                item.date,
                'year'
              )) && (
              <>
                <div className={styles.imageItemYearDivider}>
                  {moment(item.date).format('YYYY')}
                </div>
                <div className={styles.imageItem} style={{ height: '1rem' }}>
                  <div />
                  <div />
                </div>
              </>
            )}
            <div className={styles.imageItem}>
              <div>
                {(index === 0 ||
                  !moment(imageItems[index - 1].date).isSame(
                    item.date,
                    'day'
                  )) && (
                  <div className={styles.imageItemDate}>
                    <p>{moment(item.date).format('DD')}</p>
                    <p>{moment(item.date).format('MMM')}</p>
                    <div
                      className={
                        checkSelectedStatusForSameDate(item.date)
                          ? cn(styles.dot, styles.selected)
                          : styles.dot
                      }
                    />
                  </div>
                )}
              </div>
              <div>
                <React.Fragment key={`${currentAlbum}-${index}`}>
                  <ImageViewerSidebarItem
                    comparingMode={comparingMode}
                    currentAlbum={currentAlbum}
                    origin={item.origin}
                    imageIndex={index}
                    selectedIndex={selectedIndex}
                    setIsDragging={setIsDragging}
                    setSidebarOpen={setSidebarOpen}
                  />
                </React.Fragment>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        <div
          className={styles.imageViewerToggle}
          style={{ backgroundImage: `url(${sidebarToggle})` }}
          onClick={() => setSidebarOpen((e) => !e)}
        >
          {sidebarOpen ? <LeftOutlined /> : <RightOutlined />}
        </div>
      </div>
    </div>
  )
}

export default ImageViewerSidebar
