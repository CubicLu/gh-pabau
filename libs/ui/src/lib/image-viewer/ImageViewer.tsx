import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import cn from 'classnames'
import {
  LeftOutlined,
  TagOutlined,
  HighlightOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
  DownOutlined,
  CheckOutlined,
  ZoomInOutlined,
  MoreOutlined,
  SwapOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import {
  Button,
  ImageViewerSidebar,
  SinglePhoto,
  ComparingSlider,
  TwoVerticalSideBySide,
  TwoHorizontalSideBySide,
  ThreeSideBySide,
  FourSideBySide,
  SixSideBySide,
  ProgressGallery,
  PresentModal,
  CreateLabels,
  CamUploaderModal as CamUploader,
  UploadingImageProps,
} from '@pabau/ui'
import { Modal as AntModal, Input, Popover, Drawer, Tooltip } from 'antd'
import singlePhotoMode from '../../assets//images/image-viewer/comparing/single-photo.svg'
import singlePhotoActiveMode from '../../assets//images/image-viewer/comparing/single-photo-active.svg'
import comparingSliderMode from '../../assets//images/image-viewer/comparing/comparing-slider.svg'
import comparingSliderActiveMode from '../../assets//images/image-viewer/comparing/comparing-slider-active.svg'
import twoVerticalSideMode from '../../assets//images/image-viewer/comparing/two-vertical-side.svg'
import twoVerticalSideActiveMode from '../../assets//images/image-viewer/comparing/two-vertical-side-active.svg'
import twoHorizontalSideMode from '../../assets//images/image-viewer/comparing/two-horizontal-side.svg'
import twoHorizontalSideActiveMode from '../../assets//images/image-viewer/comparing/two-horizontal-side-active.svg'
import threeSideMode from '../../assets//images/image-viewer/comparing/three-side.svg'
import threeSideActiveMode from '../../assets//images/image-viewer/comparing/three-side-active.svg'
import fourSideMode from '../../assets//images/image-viewer/comparing/four-side.svg'
import fourSideActiveMode from '../../assets//images/image-viewer/comparing/four-side-active.svg'
import sixSideMode from '../../assets//images/image-viewer/comparing/six-side.svg'
import sixSideActiveMode from '../../assets//images/image-viewer/comparing/six-side-active.svg'
import photoGalleryMode from '../../assets//images/image-viewer/comparing/photo-gallery.svg'
import photoGalleryActiveMode from '../../assets//images/image-viewer/comparing/photo-gallery-active.svg'
import { ReactComponent as CameraCircleFilled } from '../../assets//images/image-viewer/camera-circle-filled.svg'
import { ReactComponent as PhotoCircleFilled } from '../../assets//images/image-viewer/photo-circle-filled.svg'
import styles from './ImageViewer.module.less'

export interface AlbumImageTag {
  label?: string
  color?: string
  count?: number
}
export interface AlbumImageItem {
  id: number
  origin: string
  date: string
  tags?: AlbumImageTag[] | string
}
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(name: string): string
    }
    OPEN_PHOTO_CHECK?: boolean
  }
}
export enum ComparingMode {
  'single-photo' = 'single-photo',
  'comparing-slider' = 'comparing-slider',
  'two-vertical-side-by-side' = 'two-vertical-side-by-side',
  'two-horizontal-side-by-side' = 'two-horizontal-side-by-side',
  'three-side-by-side' = 'three-side-by-side',
  'four-side-by-side' = 'four-side-by-side',
  'six-side-by-side' = 'six-side-by-side',
  'progress-gallery' = 'progress-gallery',
}

export enum ZoomInMode {
  zoomInNone = 1,
  zoomIn30 = 1.3,
  zoomIn50 = 1.5,
  zoomIn70 = 1.7,
  zoomIn100 = 2,
}

export interface SelectIndexProps {
  imageIndex: number
  album: string
  option: {
    scale: number
    positionX: number
    positionY: number
  }
}

const defaultIndex: SelectIndexProps[] = [
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
]
const defaultProgressGalleryIndex: SelectIndexProps[] = [
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
]

export interface ImageViewerAlbum {
  id?: number
  name: string
  imageList?: AlbumImageItem[]
  imageCount?: number
}

export interface ImageViewerProps {
  visible: boolean
  title: string
  albums: ImageViewerAlbum[]
  currentAlbum?: ImageViewerAlbum
  selectedPhotoId?: number
  onAlbumSelect?: (album) => void
  onClose: () => void
  uploadingImages?: UploadingImageProps[]
  setUploadingImages?: (images: UploadingImageProps[]) => void
  uploadImage?: (image: UploadingImageProps) => void
  removeImage?: (imageId: number) => void
  loading?: boolean
}

const ImageViewerModal: FC<ImageViewerProps> = ({
  visible,
  title,
  albums,
  currentAlbum,
  selectedPhotoId,
  onAlbumSelect,
  onClose,
  uploadingImages,
  setUploadingImages,
  uploadImage,
  removeImage,
  loading = false,
}) => {
  const { t } = useTranslation('common')
  const [viewerTitle, setViewerTitle] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [showCamUploader, setShowCamUploader] = useState(false)

  const [editTitle, setEditTitle] = useState(false)
  const [isDefaultPhoto, setIsDefaultPhoto] = useState(false)
  const [comparingMode, setComparingMode] = useState<ComparingMode>(
    ComparingMode['single-photo']
  )
  const [showComparingMode, setShowComparingMode] = useState(false)
  const [showZoomInMode, setShowZoomInMode] = useState(false)
  const [showOperations, setShowOperations] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(selectedPhotoId ? false : true)
  const [openPresent, setOpenPresent] = useState(false)
  const comparingModes = [
    {
      mode: ComparingMode['single-photo'],
      title: t('ui.imageviewer.comparingmode.single'),
      icon: singlePhotoMode,
      activeIcon: singlePhotoActiveMode,
    },
    {
      mode: ComparingMode['comparing-slider'],
      title: t('ui.imageviewer.comparingmode.comparison'),
      icon: comparingSliderMode,
      activeIcon: comparingSliderActiveMode,
    },
    {
      mode: ComparingMode['two-vertical-side-by-side'],
      title: t('ui.imageviewer.comparingmode.twovertical'),
      icon: twoVerticalSideMode,
      activeIcon: twoVerticalSideActiveMode,
    },
    {
      mode: ComparingMode['two-horizontal-side-by-side'],
      title: t('ui.imageviewer.comparingmode.twohorizontal'),
      icon: twoHorizontalSideMode,
      activeIcon: twoHorizontalSideActiveMode,
    },
    {
      mode: ComparingMode['three-side-by-side'],
      title: t('ui.imageviewer.comparingmode.threeside'),
      icon: threeSideMode,
      activeIcon: threeSideActiveMode,
    },
    {
      mode: ComparingMode['four-side-by-side'],
      title: t('ui.imageviewer.comparingmode.fourside'),
      icon: fourSideMode,
      activeIcon: fourSideActiveMode,
    },
    {
      mode: ComparingMode['six-side-by-side'],
      title: t('ui.imageviewer.comparingmode.sixside'),
      icon: sixSideMode,
      activeIcon: sixSideActiveMode,
    },
    {
      mode: ComparingMode['progress-gallery'],
      title: t('ui.imageviewer.comparingmode.progress'),
      icon: photoGalleryMode,
      activeIcon: photoGalleryActiveMode,
    },
  ]
  const zoomInModes = [
    {
      mode: ZoomInMode.zoomIn30,
      title: '30%',
    },
    {
      mode: ZoomInMode.zoomIn50,
      title: '50%',
    },
    {
      mode: ZoomInMode.zoomIn70,
      title: '70%',
    },
    {
      mode: ZoomInMode.zoomIn100,
      title: '100%',
    },
  ]
  const [isDragging, setIsDragging] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<SelectIndexProps[]>(
    defaultIndex
  )
  const [progressGalleryIndex, setProgressGalleryIndex] = useState(
    defaultProgressGalleryIndex
  )
  const [zoomInMode, setZoomInMode] = useState<ZoomInMode>(
    ZoomInMode.zoomInNone
  )
  const isDesktop = useMedia('(min-width: 1201px)', true)
  const isTablet = useMedia('(max-width: 1200px) and (min-width: 768px)', false)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [hoverModeIndex, setHoverModeIndex] = useState(0)
  const [albumList, setAlbumList] = useState<ImageViewerAlbum[]>([])
  const [currentLabels, setCurrentLabels] = useState<AlbumImageTag[] | string>(
    []
  )

  const handleClickPresent = () => {
    if (comparingMode === ComparingMode['progress-gallery']) {
      if (progressGalleryIndex.filter((el) => el.imageIndex >= 0).length > 0)
        setOpenPresent(true)
    } else {
      if (selectedIndex.filter((el) => el.imageIndex >= 0).length > 0)
        setOpenPresent(true)
    }
  }

  const handleSwap = () => {
    const indexes = [...selectedIndex]
    const changedIndexes = [indexes[1], indexes[0], ...indexes.slice(2)]
    setSelectedIndex(changedIndexes)
  }

  const setLabels = (val) => {
    setCurrentLabels(val)
    if (
      comparingMode === ComparingMode['single-photo'] &&
      selectedIndex[0].imageIndex >= 0
    ) {
      const albumItems = [...albumList]
      const { imageIndex, album: selectedAlbum } = selectedIndex[0]
      const albumIndex = albumList.findIndex((el) => el.name === selectedAlbum)
      if (albumIndex >= 0) {
        const album = { ...albumList[albumIndex] }
        if (album?.imageList) {
          album.imageList[imageIndex].tags = [...val]
        }
        albumItems.splice(albumIndex, 1, album)
      }
      setAlbumList(albumItems)
    }
  }

  useEffect(() => {
    setViewerTitle(`${title || 'Untitled'} Single photo`)
  }, [title, t])

  useEffect(() => {
    if (
      comparingMode === ComparingMode['single-photo'] &&
      selectedIndex[0].imageIndex >= 0
    ) {
      const { imageIndex, album: selectedAlbum } = selectedIndex[0]
      const album = albums?.find((el) => el.name === selectedAlbum)
      if (album) {
        setCurrentLabels(album?.imageList?.[imageIndex]?.tags || [])
      } else {
        setCurrentLabels([])
      }
    }
  }, [albums, comparingMode, selectedIndex])

  useEffect(() => {
    if (albums?.length > 0) {
      setAlbumList(albums)
    }
  }, [albums])

  useEffect(() => {
    if (currentAlbum?.imageList?.length && !isDefaultPhoto) {
      const imgIndex = currentAlbum?.imageList?.findIndex(
        (el) => el?.id === selectedPhotoId
      )
      if (imgIndex !== -1) {
        const selected = [
          {
            album: currentAlbum?.name as string,
            imageIndex: imgIndex as number,
            option: {
              scale: 1,
              positionX: 0,
              positionY: 0,
            },
          },
        ]
        setSelectedIndex(selected)
        setIsDefaultPhoto(() => true)
      }
    }
  }, [currentAlbum, isDefaultPhoto, selectedPhotoId])

  const comparingModeList = (
    <div className={styles.comparingModeList}>
      {comparingModes.map((item, index) => (
        <div
          key={`comparing-mode-${index}`}
          className={styles.comparingModeItem}
          onClick={() => {
            setComparingMode(item.mode as ComparingMode)
            setShowComparingMode(false)
            setSelectedIndex(defaultIndex)
            setProgressGalleryIndex(defaultProgressGalleryIndex)
            setSidebarOpen(true)
            setViewerTitle(`${title || 'Untitled'} ${item.title}`)
          }}
          onMouseOver={() => setHoverModeIndex(index)}
        >
          <div className={item.mode === comparingMode ? styles.selected : ''}>
            <CheckOutlined />
          </div>
          <div>
            <div
              style={{
                backgroundImage: `url(${
                  item.mode === comparingMode || hoverModeIndex === index
                    ? item.activeIcon
                    : item.icon
                })`,
              }}
            />
          </div>
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  )

  const zoomInModeList = (
    <div className={styles.zoomInModeList}>
      {zoomInModes.map((item, index) => (
        <div
          key={`zoom-in-mode-${index}`}
          className={
            item.mode === zoomInMode
              ? cn(styles.zoomInModeItem, styles.selected)
              : styles.zoomInModeItem
          }
          onClick={() => {
            setZoomInMode(item.mode)
            setShowZoomInMode(false)
          }}
        >
          <ZoomInOutlined />
          {item.title}
        </div>
      ))}
    </div>
  )

  const operationList = (
    <div className={styles.operationList}>
      <div className={styles.operationItem}>
        <div className={styles.icon}>
          <HighlightOutlined />
        </div>
        <div className={styles.text}>{t('ui.imageviewer.draw')}</div>
      </div>
      <div
        className={styles.operationItem}
        onClick={() => {
          setShowOperations(false)
          handleClickPresent()
        }}
      >
        <div className={styles.icon}>
          <PlayCircleOutlined />
        </div>
        <div className={styles.text}>{t('ui.imageviewer.present')}</div>
      </div>
      <div className={styles.operationItem}>
        <div className={styles.icon}>
          <ShareAltOutlined />
        </div>
        <div className={styles.text}>{t('ui.imageviewer.share')}</div>
      </div>
    </div>
  )

  const createLabelsChild =
    comparingMode !== ComparingMode['single-photo'] ? (
      <Tooltip title={t('ui.imageviewer.tag.tooltip')}>
        <Button
          icon={<TagOutlined />}
          size="middle"
          shape="circle"
          disabled={true}
        />
      </Tooltip>
    ) : (
      <Button
        icon={<TagOutlined />}
        size="middle"
        shape="circle"
        disabled={
          comparingMode !== ComparingMode['single-photo'] ||
          selectedIndex[0].imageIndex < 0
        }
      />
    )

  return (
    <>
      <AntModal
        visible={visible}
        closable={false}
        footer={null}
        width={'100%'}
        wrapClassName={styles.imageViewerModal}
      >
        <div className={styles.imageViewerModalContainer}>
          <div className={styles.imageViewerModalHeader}>
            <div>
              <div className={styles.backTo} onClick={() => onClose()}>
                <LeftOutlined />
              </div>
              <div
                className={styles.imageGalleryIcon}
                style={{
                  backgroundImage: `url(${
                    comparingModes.find((el) => el.mode === comparingMode)
                      ?.activeIcon
                  })`,
                }}
              />
              <div className={styles.titleContainer}>
                {!editTitle && (
                  <Tooltip
                    title={t('ui.imageviewer.rename')}
                    placement="bottom"
                  >
                    <div
                      className={styles.title}
                      onClick={() => setEditTitle(true)}
                    >
                      {viewerTitle}
                    </div>
                  </Tooltip>
                )}
                {editTitle && (
                  <div className={styles.titleInputContainer}>
                    <Input
                      value={viewerTitle}
                      onChange={(e) => setViewerTitle(e.target.value)}
                      onBlur={() => setEditTitle(false)}
                      onPressEnter={(e) => {
                        e.preventDefault()
                        setEditTitle(false)
                      }}
                      autoFocus
                    />
                  </div>
                )}
                {!editTitle && comparingMode === ComparingMode['single-photo'] && (
                  <div className={styles.tags}>
                    {typeof currentLabels === 'string' ? (
                      <div className={styles.imageTagItem}>
                        {`#${currentLabels}`}
                      </div>
                    ) : (
                      (currentLabels as AlbumImageTag[])?.map((tag, index) => (
                        <div
                          className={styles.imageTagItem}
                          key={`tag-item-${index}`}
                          style={{
                            color: tag.color,
                            border: `1px solid ${tag.color}`,
                          }}
                        >
                          {`#${tag.label}`}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {!isMobile && (
                <CreateLabels
                  labels={
                    typeof currentLabels === 'string'
                      ? []
                      : (currentLabels as AlbumImageTag[])
                  }
                  setLabels={(val) => setLabels(val)}
                >
                  {createLabelsChild}
                </CreateLabels>
              )}
            </div>
            <div>
              {!isMobile && (
                <Popover
                  placement="bottomLeft"
                  title={t('ui.imageviewer.comparingmode.title')}
                  overlayClassName={styles.comparingModesPopover}
                  content={comparingModeList}
                  trigger="click"
                  visible={showComparingMode}
                  onVisibleChange={(visible) => setShowComparingMode(visible)}
                >
                  <Tooltip title={t('ui.imageviewer.comparingmode.tooltip')}>
                    <Button>
                      {
                        comparingModes.find((el) => el.mode === comparingMode)
                          ?.title
                      }
                      <DownOutlined />
                    </Button>
                  </Tooltip>
                </Popover>
              )}
              {isDesktop && (
                <Button icon={<HighlightOutlined />}>
                  {t('ui.imageviewer.draw')}
                </Button>
              )}
              {isDesktop && (
                <Tooltip title={t('ui.imageviewer.present.tooltip')}>
                  <Button
                    icon={<PlayCircleOutlined />}
                    onClick={handleClickPresent}
                  >
                    {t('ui.imageviewer.present')}
                  </Button>
                </Tooltip>
              )}
              {isDesktop && (
                <Tooltip title={t('ui.imageviewer.share.tooltip')}>
                  <Button
                    icon={<ShareAltOutlined />}
                    type="primary"
                    className={styles.shareButton}
                  >
                    {t('ui.imageviewer.share')}
                  </Button>
                </Tooltip>
              )}
              {isTablet && (
                <Popover
                  placement="bottomRight"
                  overlayClassName={styles.operationListPopover}
                  content={operationList}
                  trigger="click"
                  visible={showOperations}
                  onVisibleChange={(visible) => setShowOperations(visible)}
                >
                  <Button
                    shape="circle"
                    size="middle"
                    icon={<MoreOutlined />}
                  />
                </Popover>
              )}
              {isMobile && (
                <Button
                  shape="circle"
                  size="middle"
                  icon={<MoreOutlined />}
                  onClick={() => setShowOperations(true)}
                />
              )}
            </div>
          </div>
          <div className={styles.imageViewerModalBody}>
            <div className={styles.imageViewerModalBodyContainer}>
              {comparingMode === ComparingMode['single-photo'] && (
                <SinglePhoto
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode === ComparingMode['comparing-slider'] && (
                <ComparingSlider
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode === ComparingMode['two-vertical-side-by-side'] && (
                <TwoVerticalSideBySide
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode ===
                ComparingMode['two-horizontal-side-by-side'] && (
                <TwoHorizontalSideBySide
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode === ComparingMode['three-side-by-side'] && (
                <ThreeSideBySide
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode === ComparingMode['four-side-by-side'] && (
                <FourSideBySide
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode === ComparingMode['six-side-by-side'] && (
                <SixSideBySide
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  setSelectedIndex={setSelectedIndex}
                  zoomInMode={zoomInMode}
                  selectedIndex={selectedIndex}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                />
              )}
              {comparingMode === ComparingMode['progress-gallery'] && (
                <ProgressGallery
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  setZoomInMode={setZoomInMode}
                  zoomInMode={zoomInMode}
                  albums={albums}
                  selectedAlbum={currentAlbum}
                  onChangeIndex={(selected) =>
                    setProgressGalleryIndex(selected)
                  }
                />
              )}
              {(selectedIndex.filter((el) => el.imageIndex >= 0).length > 0 ||
                progressGalleryIndex.filter((el) => el.imageIndex >= 0).length >
                  0) && (
                <div className={styles.zoomInOptions}>
                  {zoomInMode === ZoomInMode.zoomInNone && (
                    <Popover
                      placement="bottomRight"
                      title={t('ui.imageviewer.zoominmode.title')}
                      trigger="click"
                      overlayClassName={styles.zoomInModesPopover}
                      content={zoomInModeList}
                      visible={showZoomInMode}
                      onVisibleChange={(visible) => setShowZoomInMode(visible)}
                    >
                      <div className={styles.zoomInButton}>
                        <ZoomInOutlined />
                      </div>
                    </Popover>
                  )}
                  {zoomInMode !== ZoomInMode.zoomInNone && (
                    <div
                      className={styles.zoomInButton}
                      onClick={() => setZoomInMode(ZoomInMode.zoomInNone)}
                    >
                      <CloseOutlined />
                    </div>
                  )}
                </div>
              )}
              {(comparingMode === ComparingMode['comparing-slider'] ||
                comparingMode ===
                  ComparingMode['two-horizontal-side-by-side'] ||
                comparingMode ===
                  ComparingMode['two-vertical-side-by-side']) && (
                <div className={styles.swapButtonContainer}>
                  <div
                    className={styles.swapButton}
                    onClick={() => handleSwap()}
                  >
                    <SwapOutlined />
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isMobile && (
            <div className={styles.uppyButtons}>
              <div>
                <PhotoCircleFilled
                  onClick={() => {
                    setShowCamera(false)
                    setShowCamUploader(() => true)
                  }}
                />
                <CameraCircleFilled
                  onClick={() => {
                    setShowCamera(true)
                    setShowCamUploader(() => true)
                  }}
                />
              </div>
            </div>
          )}

          <ImageViewerSidebar
            comparingMode={comparingMode}
            selectedIndex={
              comparingMode === ComparingMode['progress-gallery']
                ? progressGalleryIndex
                : selectedIndex
            }
            setSelectedIndex={() => setSelectedIndex(defaultIndex)}
            albums={albums}
            selectedAlbum={currentAlbum}
            onAlbumSelect={(album) => {
              if (album !== currentAlbum?.id) {
                setUploadingImages?.([])
              }
              onAlbumSelect?.(album)
            }}
            sidebarOpen={sidebarOpen}
            setIsDragging={setIsDragging}
            setSidebarOpen={setSidebarOpen}
            defaultSelectedPhoto={selectedPhotoId}
            loading={loading}
          />
          {isMobile && (
            <div className={styles.imageViewerModalFooter}>
              <div>
                <CreateLabels
                  labels={
                    typeof currentLabels === 'string'
                      ? []
                      : (currentLabels as AlbumImageTag[])
                  }
                  setLabels={(val) => setLabels(val)}
                >
                  {createLabelsChild}
                </CreateLabels>
                <div className={styles.uppyButtons}>
                  <div>
                    <PhotoCircleFilled
                      onClick={() => {
                        setShowCamera(false)
                        setShowCamUploader(() => true)
                      }}
                    />
                    <CameraCircleFilled
                      onClick={() => {
                        window?.ReactNativeWebView?.postMessage('OPEN_PHOTO')
                        if (window?.OPEN_PHOTO_CHECK !== true) {
                          setShowCamera(true)
                          setShowCamUploader(() => true)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Tooltip title={t('ui.imageviewer.comparingmode.tooltip')}>
                  <Button
                    onClick={() => {
                      setShowComparingMode(true)
                      setHoverModeIndex(0)
                    }}
                  >
                    {
                      comparingModes.find((el) => el.mode === comparingMode)
                        ?.title
                    }
                    <DownOutlined />
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
          <PresentModal
            visible={openPresent}
            onClose={() => setOpenPresent(false)}
            comparingMode={comparingMode}
          />
        </div>
        {showCamUploader && (
          <CamUploader
            visible={showCamUploader}
            onClose={(done?: boolean) => {
              setShowCamera(false)
              setShowCamUploader(() => false)
              if (done) {
                setUploadingImages?.([])
              }
            }}
            uploadingImages={uploadingImages as UploadingImageProps[]}
            setUploadingImages={(images) => setUploadingImages?.(images)}
            showCamera={showCamera}
            uploadImage={uploadImage}
            removeImage={removeImage}
            albumId={currentAlbum?.id || 0}
            cancelFunctionality={false}
          />
        )}
      </AntModal>

      {isMobile && (
        <>
          <Drawer
            visible={showOperations}
            placement="bottom"
            closable={false}
            onClose={() => setShowOperations(false)}
            className={styles.imageViewerDrawer}
          >
            <div className={styles.imageViewerDrawerHeader}>
              <div
                className={styles.handler}
                onClick={() => setShowOperations(false)}
              />
            </div>
            <div className={styles.imageViewerDrawerBody}>{operationList}</div>
          </Drawer>
          <Drawer
            visible={showComparingMode}
            placement="bottom"
            closable={false}
            onClose={() => setShowComparingMode(false)}
            className={styles.imageViewerDrawer}
          >
            <div className={styles.imageViewerDrawerHeader}>
              <div
                className={styles.handler}
                onClick={() => setShowComparingMode(false)}
              />
              <div className={styles.title}>
                {t('ui.imageviewer.comparingmode.title')}
              </div>
            </div>
            <div className={styles.imageViewerDrawerBody}>
              {comparingModeList}
            </div>
          </Drawer>
        </>
      )}
    </>
  )
}

export const ImageViewer: FC<ImageViewerProps> = (props) => {
  const { visible } = props
  return visible ? <ImageViewerModal {...props} /> : <div />
}

export default ImageViewer
