import React, { FC, useState, useEffect } from 'react'
import {
  CheckCircleFilled,
  RightOutlined,
  LeftOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
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
import classNames from 'classnames'

export interface ImageViewerSidebarProps {
  comparingMode: ComparingMode
  sidebarOpen: boolean
  albums: ImageViewerAlbum[]
  selectedAlbum?: ImageViewerAlbum
  selectedIndex: SelectIndexProps[]
  setSelectedIndex?: () => void
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  onAlbumSelect?: (album) => void
  defaultSelectedPhoto?: number
  loading?: boolean
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
  const handleDragStart = () => {
    if (
      !selectedIndex.find(
        (el) => el.album === currentAlbum && el.imageIndex === imageIndex
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
      let path = origin
      if (path?.includes('photos/')) {
        const pathArr = path.split('photos/')
        pathArr[1] = `thumb_${pathArr[1]}`
        path = pathArr.join('photos/')
      }

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
      img.src = path
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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
  selectedAlbum,
  selectedIndex,
  setSelectedIndex,
  setIsDragging,
  setSidebarOpen,
  onAlbumSelect,
  defaultSelectedPhoto,
  loading = false,
}) => {
  const [imageItems, setImageItems] = useState<AlbumImageItem[]>([])
  const [currentAlbum, setCurrentAlbum] = useState<ImageViewerAlbum | null>(
    null
  )
  const [openAlbumDrop, setOpenAlbumDrop] = useState(false)
  const [onceLoaded, setOnceLoaded] = useState(false)

  const albumsDropdown = (
    <div className={styles.albumsDropdown}>
      {albums?.length > 0 ? (
        albums?.map((item, index) => (
          <div
            className={classNames(
              styles.albumDropdownItem,
              (currentAlbum?.id && currentAlbum?.id === item?.id) ||
                (currentAlbum?.id === null &&
                  currentAlbum?.name === 'Uncategorized' &&
                  item?.name === 'Uncategorized')
                ? styles.selected
                : ''
            )}
            key={item?.id}
            onClick={() => {
              if (currentAlbum?.id !== item?.id) {
                onAlbumSelect?.(item)
                setImageItems(item?.imageList as AlbumImageItem[])
                setCurrentAlbum(item)
                setOpenAlbumDrop(false)
                setSelectedIndex?.()
              }
            }}
          >
            <div>{item.name}</div>
            <div>
              {item?.imageCount
                ? item?.imageCount || 0
                : item.imageList?.length || 0}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.albumDropdownItem}>
          <div>No Album</div>
        </div>
      )}
    </div>
  )

  const checkSelectedStatusForSameDate = (date) => {
    let status = false
    for (const el of selectedIndex) {
      if (
        el.album === currentAlbum?.name &&
        el.imageIndex >= 0 &&
        dayjs(date).isSame(imageItems[el.imageIndex].date, 'day')
      ) {
        status = true
        break
      }
    }
    return status
  }

  const DummyImagesLoader = ({ length = 10 }) => {
    return (
      <>
        {Array.from({
          length: length,
        }).map((el, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 && (
              <>
                <div className={styles.imageItemYearDivider}>
                  <Skeleton.Input active />
                </div>
                <div className={styles.imageItem} style={{ height: '1rem' }}>
                  <div />
                  <div />
                </div>
              </>
            )}
            <div className={styles.imageItem}>
              <div>
                {idx === 0 && (
                  <div className={styles.imageItemDate}>
                    <p>
                      <Skeleton.Avatar active />
                    </p>
                    <div className={styles.dot} />
                  </div>
                )}
              </div>
              <div>
                <React.Fragment key={idx}>
                  <ImageViewerSidebarItem
                    comparingMode={comparingMode}
                    currentAlbum={currentAlbum?.name || ''}
                    origin={''}
                    imageIndex={idx}
                    selectedIndex={selectedIndex}
                    setIsDragging={setIsDragging}
                    setSidebarOpen={setSidebarOpen}
                  />
                </React.Fragment>
              </div>
            </div>
          </React.Fragment>
        ))}
      </>
    )
  }

  useEffect(() => {
    const compare = (a, b) => {
      if (dayjs(a.date) > dayjs(b.date)) {
        return -1
      }
      if (dayjs(a.date) < dayjs(b.date)) {
        return 1
      }
      return 0
    }

    if (albums?.length > 0 && !selectedAlbum) {
      const sortedImages = albums[0]?.imageList?.sort(compare)
      albums[0].imageList = sortedImages
      setCurrentAlbum(albums[0])
      setImageItems(albums[0]?.imageList as AlbumImageItem[])
    }
    if (selectedAlbum) {
      const sortedImages = selectedAlbum?.imageList?.sort(compare) || []
      selectedAlbum.imageList = sortedImages
      setCurrentAlbum(selectedAlbum)
      setImageItems(selectedAlbum?.imageList as AlbumImageItem[])
    }
  }, [albums, selectedAlbum])

  useEffect(() => {
    if (!onceLoaded && !loading) {
      const elem = document?.querySelector(
        `#sidebarimage${defaultSelectedPhoto}`
      )
      if (elem) {
        elem.scrollIntoView()
      }
      setOnceLoaded(() => true)
    }
  }, [defaultSelectedPhoto, onceLoaded, loading, selectedIndex])

  return (
    <div
      className={
        sidebarOpen
          ? styles.imageViewerSideBar
          : cn(styles.imageViewerSideBar, styles.hideSidebar)
      }
    >
      <div>
        {albums?.length ? (
          <Popover
            visible={openAlbumDrop}
            placement="bottom"
            trigger="click"
            content={albumsDropdown}
            onVisibleChange={(visible) => setOpenAlbumDrop(visible)}
            overlayClassName={styles.albumsPopover}
          >
            <div className={styles.albumSelector}>
              <div>{albums?.length > 0 ? currentAlbum?.name : 'No Album'}</div>
              {albums?.length > 0 && (
                <div>
                  <CaretDownOutlined />
                </div>
              )}
            </div>
          </Popover>
        ) : (
          loading && (
            <div className={styles.albumLoader}>
              <Skeleton.Input active />
            </div>
          )
        )}
        {!loading
          ? imageItems?.map((item, index) => (
              <React.Fragment key={item?.id}>
                {(index === 0 ||
                  !dayjs(imageItems[index - 1].date).isSame(
                    item.date,
                    'year'
                  )) && (
                  <>
                    <div className={styles.imageItemYearDivider}>
                      {dayjs(item.date).format('YYYY')}
                    </div>
                    <div
                      className={styles.imageItem}
                      style={{ height: '1rem' }}
                    >
                      <div />
                      <div />
                    </div>
                  </>
                )}
                <div className={styles.imageItem}>
                  <div>
                    {(index === 0 ||
                      !dayjs(imageItems[index - 1].date).isSame(
                        item.date,
                        'day'
                      )) && (
                      <div className={styles.imageItemDate}>
                        <p>{dayjs(item?.date).format('DD')}</p>
                        <p>{dayjs(item?.date).format('MMM')}</p>
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
                  <div id={`sidebarimage${item?.id}`}>
                    <React.Fragment key={item?.id}>
                      <ImageViewerSidebarItem
                        comparingMode={comparingMode}
                        currentAlbum={currentAlbum?.name || ''}
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
            ))
          : loading &&
            (currentAlbum?.imageCount || 0) > 0 && (
              <DummyImagesLoader length={currentAlbum?.imageCount || 10} />
            )}
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
