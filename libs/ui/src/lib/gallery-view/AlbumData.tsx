import React, { FC, useState, useEffect } from 'react'
import styles from './GalleryView.module.less'
import {
  CalendarOutlined,
  PictureOutlined,
  EyeInvisibleOutlined,
  DownloadOutlined,
  RightOutlined,
  EditOutlined,
  ShareAltOutlined,
  TagOutlined,
  DeleteOutlined,
  ToTopOutlined,
  EnterOutlined,
  LeftOutlined,
  PlusOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { Pagination } from '@pabau/ui'
import { Table, Drawer, Popover, Button, Card, Modal } from 'antd'
import img1 from '../../assets/images/blank-album.png'
import { Checkbox } from '../checkbox/Checkbox'
import classNames from 'classnames'
import { ReactComponent as Dot } from '../../assets/images/three-dot-v.svg'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Share } from '../../assets/images/image-share.svg'
import { ReactComponent as ImageAlbum } from '../../assets/images/image-album.svg'
import dayjs from 'dayjs'

interface ImageItemProps {
  id: string
  origin: string
  title?: string
  key?: number | string
  className: string
  draggable?: boolean
  height?: number
  width?: number
}

const ImageItem: FC<ImageItemProps> = ({
  id,
  key = '',
  origin,
  title = '',
  className,
  draggable = false,
  height,
  width,
}) => {
  const [source, setSource] = useState('')

  useEffect(() => {
    if (origin) {
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
  }, [origin])

  return (
    <img
      id={id}
      key={key}
      alt={title}
      draggable={draggable}
      src={source || img1}
      className={className}
      style={source ? {} : { backgroundColor: '#f4f4f4' }}
      height={height}
      width={width}
    />
  )
}

export interface ImageProps {
  id?: number
  date: number
  isSensitive?: boolean
  img?: string
}

export interface AlbumProps {
  id: number
  albumTitle: string
  modifiedDate?: string
  imageCount: number
  albumImages: Array<ImageProps>
  albums: AlbumProps[]
}

export interface AlbumDataProps {
  data: AlbumProps
  listImages: ImageProps[]
  onFolderClick: (index) => void
  selectedImage: ImageProps[]
  handleOnChange: (checked, img) => void
  loading: boolean
  setSelectedImage: (e) => void
  showMenu: boolean
  setOpenDeleteModal: (e) => void
  openDeleteModal: boolean
  handleImageMove: (album) => void
  drop: (e) => void
  allowDrop: (e) => void
  drag: (e) => void
  dragAlbum: (e) => void
  handleDownload: () => void
  imgDownload: (img) => void
  handleAlbumDelete: (album) => void
  listView: boolean
  setCurrentData: (e) => void
  loadeMorePhotos?: (albumId: number) => void
  currentPage: number
  onPageChange: (page: number) => void
}

export const AlbumData: FC<AlbumDataProps> = ({
  data,
  listImages,
  onFolderClick,
  selectedImage,
  handleOnChange,
  loading,
  setSelectedImage,
  showMenu,
  openDeleteModal,
  setOpenDeleteModal,
  handleImageMove,
  drop,
  allowDrop,
  drag,
  handleDownload,
  imgDownload,
  dragAlbum,
  handleAlbumDelete,
  listView,
  setCurrentData,
  loadeMorePhotos,
  currentPage,
  onPageChange,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const { t } = useTranslation('common')
  const [dotMenuDrawer, setDotMenuDrawer] = useState(false)
  const [menuDrawer, setMenuDrawer] = useState(false)
  const [moveAlbum, setMoveAlbum] = useState(false)
  const [albumDotMenuDrawer, setAlbumDotMenuDrawer] = useState(false)
  const [albumListDrawer, setAlbumListDrawer] = useState(false)
  const [albumImageList, setAlbumImageList] = useState([])
  const [listAlbumData, setListAlbumData] = useState([])
  const [photoDeleteModal, setPhotoDeleteModal] = useState(false)
  const [albumImage, setAlbumImage] = useState('')

  useEffect(() => {
    const temp = []
    if (listView) {
      data.albums?.map((albumData, index) =>
        temp.push({
          name: [albumData, index],
          files: [calculateAlbumLength(albumData), index],
          lastModified: [dayjs(albumData?.modifiedDate).format('DD.MM.YYYY')],
        } as never)
      )
      setListAlbumData(temp)
    }
  }, [data, listView])

  useEffect(() => {
    const temp = []
    if (listView) {
      listImages?.map((x, index) =>
        temp.push({
          name: [x, index],
          owner: 'me',
          lastModified: [dayjs(new Date(x.date * 1000)).format('DD.MM.YYYY')],
        } as never)
      )
      setAlbumImageList(temp)
    }
  }, [listImages, listView])

  const ShowAlbumImages = ({ x }) => {
    if (x.albumImages && x.albumImages.length > 0) {
      if (x.albumImages.length > 0 && x.albumImages.slice(0, 4)) {
        return (
          <>
            {x.albumImages.slice(0, 4).map((item, key) => {
              return (
                <ImageItem
                  key={key}
                  id={item?.id}
                  origin={item?.img}
                  title={x.albumTitle}
                  className={styles.gridItem}
                />
              )
            })}
            {Array.from({ length: 4 - x.albumImages.length })
              .fill(null)
              .map((_, i) => i)
              .map((i) => (
                <ImageItem
                  key={i}
                  id={x.albumTitle}
                  origin={''}
                  title={x.albumTitle}
                  className={styles.gridItem}
                />
              ))}
          </>
        )
      }
    } else {
      return (
        <ImageItem
          key={x.albumTitle}
          id={x.albumTitle}
          origin={''}
          className={styles.blankAlbum}
        />
      )
    }
    return <div />
  }

  const ImageMenuDrawer = () => (
    <div className={styles.menuContentMobileHeader}>
      <div className={styles.handler} />
      {!moveAlbum ? (
        <div className={styles.menuContentMobileBody}>
          <div className={styles.menuContentList}>
            <div
              className={styles.menuItem}
              style={{ borderBottom: '1px solid #ECEDF0' }}
              onClick={() => handleDownload()}
            >
              <DownloadOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.download.button')}
              {`(${selectedImage.length})`}
            </div>
            <div
              className={styles.menuItem}
              onClick={() => handleDrawerContent()}
            >
              <EnterOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.menu.move.button')}{' '}
              {`(${selectedImage.length})`}
              <div className={styles.leftItem}>
                <RightOutlined />
              </div>
            </div>
            <div className={styles.menuItem}>
              <Share />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.share.button')}{' '}
              {`(${selectedImage.length})`}
            </div>
            <div className={styles.menuItem}>
              <TagOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.tag.button')}{' '}
              {`(${selectedImage.length})`}
            </div>
            <div className={styles.menuItem}>
              <EyeOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.studio.button')}{' '}
              {`(${selectedImage.length})`}
            </div>
            <div
              className={styles.menuItem}
              onClick={() => {
                setOpenDeleteModal(!openDeleteModal)
              }}
              style={{ color: 'red' }}
            >
              <DeleteOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.delete.button')}{' '}
              {`(${selectedImage.length})`}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.title}>
            <span style={{ color: '#9292A3' }}>
              <LeftOutlined onClick={() => handleDrawerContent()} />
            </span>
            <h3>
              {t('galley.list.album.move.button')} ({selectedImage.length})
            </h3>
          </div>
          <div className={styles.menuContentMobileBody}>
            <div className={styles.menuContentList}>
              {data.albums?.map(
                (album) =>
                  data.albumTitle !== album.albumTitle.toString() && (
                    <div
                      className={styles.menuItem}
                      key={album.albumTitle.toString()}
                      onClick={() => handleImageMove(album.albumTitle)}
                    >
                      <ImageAlbum />
                      &nbsp;&nbsp;&nbsp;
                      {album.albumTitle} {`(${selectedImage.length})`}
                    </div>
                  )
              )}
              <div className={styles.menuItem}>
                <PlusOutlined />
                &nbsp;&nbsp;&nbsp;{t('galley.list.menu.new.album')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )

  const AlbumMenuDrawer = ({ x }) => (
    <Drawer
      placement={'bottom'}
      closable={false}
      onClose={() => setAlbumDotMenuDrawer((e) => !e)}
      visible={albumDotMenuDrawer}
      className={styles.menuContentMobile}
    >
      <div className={styles.menuContentMobileHeader}>
        <div className={styles.handler} />
        <AlbumDotMenu albums={x} />
      </div>
    </Drawer>
  )

  const DotButtonMenu = ({ img }) => (
    <div className={styles.menuContentMobileBody}>
      <div className={styles.menuContentList}>
        <div
          className={styles.menuItem}
          style={{ borderBottom: '1px solid #ECEDF0' }}
          onClick={() => {
            selectedImage.push(img)
            setSelectedImage([...selectedImage])
            imgDownload(img)
          }}
        >
          <DownloadOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.download.button')}
        </div>
        <div className={styles.menuItem}>
          <PictureOutlined style={{ color: '#9292A3' }} />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.add.album.button')}
          <div className={styles.leftItem}>
            <RightOutlined />
          </div>
        </div>
        <div className={styles.menuItem}>
          <CalendarOutlined style={{ color: '#9292A3' }} />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.change.date.button')}
        </div>
        <div className={styles.menuItem}>
          <EditOutlined style={{ color: '#9292A3' }} />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.rename.button')}
        </div>
        <div className={styles.menuItem}>
          <ShareAltOutlined style={{ color: '#9292A3' }} />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.share.button')}
        </div>
        <div className={styles.menuItem}>
          <TagOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.set.profile.button')}
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            setPhotoDeleteModal((e) => !e)
            setAlbumImage(img)
          }}
          style={{ color: 'red' }}
        >
          <DeleteOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.delete.button')}
        </div>
      </div>
    </div>
  )

  const AlbumDotMenu = ({ albums }) => (
    <div className={styles.menuContentMobileBody}>
      <div className={styles.menuContentList}>
        <div
          className={styles.menuItem}
          style={{ borderBottom: '1px solid #ECEDF0' }}
          onClick={() => {
            handleAlbumDownload(albums.albumImages)
          }}
        >
          <DownloadOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.download.button')}
        </div>
        <div className={styles.menuItem}>
          <EditOutlined style={{ color: '#9292A3' }} />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.rename.button')}
        </div>
        <div className={styles.menuItem}>
          <ShareAltOutlined style={{ color: '#9292A3' }} />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.share.button')}
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            handleAlbumDelete(albums)
          }}
          style={{ color: 'red' }}
        >
          <DeleteOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.delete.button')}
        </div>
      </div>
    </div>
  )

  const listAlbumColumns = [
    {
      title: t('galley.list.view.photo.name'),
      dataIndex: 'name',
      // eslint-disable-next-line react/display-name
      render: (value) => (
        <div
          className={styles.tableFirstCol}
          onClick={() => onFolderClick(value[1])}
        >
          <div className={styles.gridAlbum}>
            <ShowAlbumImages x={value[0]} />
          </div>
          <p>{value[0].albumTitle}</p>
        </div>
      ),
    },
    {
      title: t('galley.list.view.photo.files'),
      dataIndex: 'files',
      render: (value) => value[0],
    },
    {
      title: t('galley.list.view.photo.last.modified'),
      dataIndex: 'lastModified',
      render: (value) => value[0],
    },
    {
      title: '',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record) => {
        return !isMobile ? (
          <Popover
            placement="left"
            content={<AlbumDotMenu albums={record.name[0]} />}
            trigger="click"
          >
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Popover>
        ) : (
          <>
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => setAlbumDotMenuDrawer((e) => !e)}
            />
            <Drawer
              placement={'bottom'}
              closable={false}
              onClose={() => setAlbumDotMenuDrawer((e) => !e)}
              visible={albumDotMenuDrawer}
              className={styles.createContentMobile}
            >
              <div className={styles.mobileHeader}>
                <div className={styles.handler} />
                <AlbumDotMenu albums={record.name[0]} />
              </div>
            </Drawer>
          </>
        )
      },
    },
  ]

  const albumImageColumn = [
    {
      title: t('galley.list.view.photo.name'),
      dataIndex: 'name',
      render: function renderContentTable(value) {
        const filename = value[0] ? value[0].img.split('/') : []
        return (
          <div className={styles.folderContentFirst}>
            <Checkbox
              checked={selectedImage.includes(value[0])}
              onChange={(e) => handleOnChange(e.target.checked, value[0])}
            >
              <Card bordered={false}>
                <img
                  id={value[0].id}
                  key={value[0].id}
                  src={value[0].img}
                  alt="img"
                  height={50}
                  width={45}
                />
              </Card>
              <div>
                <p>{filename[filename.length - 1]}</p>
              </div>
            </Checkbox>
          </div>
        )
      },
    },
    {
      title: t('galley.list.menu.Owner.album'),
      dataIndex: 'owner',
    },
    {
      title: t('galley.list.view.photo.last.modified'),
      dataIndex: 'lastModified',
    },
    {
      title: '',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record) => {
        return !isMobile ? (
          <Popover
            placement="left"
            content={<DotButtonMenu img={record.name[0].img} />}
            trigger="click"
            className={styles.imageDotButton}
            style={{ backgroundColor: 'red' }}
          >
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Popover>
        ) : (
          <>
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => setAlbumListDrawer(true)}
            />
            <Drawer
              placement={'bottom'}
              closable={false}
              onClose={() => setAlbumListDrawer((e) => !e)}
              visible={albumListDrawer}
              className={styles.createContentMobile}
            >
              <div className={styles.mobileHeader}>
                <div className={styles.handler} />
                <DotButtonMenu img={record.name[0]} />
              </div>
            </Drawer>
          </>
        )
      },
    },
  ]

  const handleAlbumDownload = (images) => {
    images.map((img) => {
      return imgDownload(img)
    })
  }

  const handleDrawerContent = () => {
    setMoveAlbum((e) => !e)
  }

  const calculateAlbumLength = (currentAlbum) => {
    let albumImageLen = 0
    albumImageLen = currentAlbum?.imageCount || 0
    const checkLength = (innerAlbum) => {
      innerAlbum.map((x) => {
        albumImageLen += x?.imageCount || 0
        return x.album?.length > 0 ? checkLength(x.album) : albumImageLen
      })
    }
    currentAlbum.album?.length > 0 && checkLength(currentAlbum.album)
    return albumImageLen
  }

  const handleDelete = () => {
    const temp = { ...data }
    temp.albumImages.map((x, i) => {
      if (x.img === albumImage) {
        temp.albumImages.splice(i, 1)
      }
      return 1
    })
    setCurrentData(temp)
    setAlbumImage('')
    setPhotoDeleteModal(false)
  }

  const handleScroll = (e) => {
    const { scrollHeight: sH, scrollTop: sT, clientHeight: cH } = e?.target
    const bottom = sH - sT === cH

    if (bottom && !listView && data?.imageCount > data?.albumImages?.length) {
      loadeMorePhotos?.(Number(data?.id))
    }
  }

  return (
    <>
      <div className={styles.customScrollbar} onScroll={handleScroll}>
        {!listView && (
          <div className={styles.galleryImgBox}>
            <div className={styles.galleryWrap}>
              <div
                style={{
                  display: 'flex',
                  minWidth: '690px',
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                {data?.albums?.length > 0 &&
                  data?.albums?.map((x, i) => (
                    <>
                      <div
                        style={{ minWidth: '170px', marginTop: '20px' }}
                        key={i}
                      >
                        <div
                          className={styles.albumContainer}
                          id={x.albumTitle}
                          onDrop={(ev) => drop(ev)}
                          onDragOver={(ev) => allowDrop(ev)}
                        >
                          <div className={styles.checkWrapper}>
                            {!isMobile ? (
                              <Popover
                                placement="bottomRight"
                                content={<AlbumDotMenu albums={x} />}
                                trigger="click"
                                className={styles.imageDotButton}
                                style={{ backgroundColor: 'red' }}
                              >
                                <div className={styles.dotBtn}>
                                  <Dot />
                                </div>
                              </Popover>
                            ) : (
                              <div
                                className={styles.dotBtn}
                                onClick={() => setAlbumDotMenuDrawer(true)}
                              >
                                <Dot />
                              </div>
                            )}
                          </div>
                          <div
                            className={styles.gridContainer}
                            onClick={() => onFolderClick(i)}
                            onDragStart={(event) => dragAlbum(event)}
                            draggable={true}
                            id={x.albumTitle}
                          >
                            <ShowAlbumImages x={x} />
                          </div>
                        </div>
                        <div className={styles.albumInfo}>
                          <h2 className={styles.albumTitle}>{x.albumTitle}</h2>
                          <span className={styles.albumCount}>
                            {calculateAlbumLength(x) as number}
                          </span>
                        </div>
                      </div>
                      <AlbumMenuDrawer x={x} />
                      {/*<Drawer*/}
                      {/*  placement={'bottom'}*/}
                      {/*  closable={false}*/}
                      {/*  onClose={() => setAlbumDotMenuDrawer((e) => !e)}*/}
                      {/*  visible={albumDotMenuDrawer}*/}
                      {/*  className={styles.menuContentMobile}*/}
                      {/*>*/}
                      {/*  <div className={styles.menuContentMobileHeader}>*/}
                      {/*    <div className={styles.handler} />*/}
                      {/*    <AlbumDotMenu albums={x} />*/}
                      {/*  </div>*/}
                      {/*</Drawer>*/}
                    </>
                  ))}

                {data?.albumImages?.length > 0 && (
                  <div
                    className={styles.albumImagesDiv}
                    style={{
                      borderTop: data?.albums?.length
                        ? '1px solid #ecedf0'
                        : '',
                      marginTop: data?.albums?.length ? '50px' : '0px',
                    }}
                  >
                    <div className={styles.galleryAlbumImage}>
                      {data.albumImages &&
                        data.albumImages?.length !== 0 &&
                        data.albumImages.map((x: ImageProps, i) => {
                          return (
                            <Checkbox
                              checked={selectedImage.includes(x)}
                              key={i}
                              onChange={(value) =>
                                handleOnChange(value.target.checked, x)
                              }
                              className={
                                selectedImage.includes(x)
                                  ? classNames(styles.checked, styles.showCheck)
                                  : ''
                              }
                            >
                              <div className={styles.imagePreview}>
                                <div className={styles.checkWrappers}>
                                  {!isMobile ? (
                                    <Popover
                                      placement="bottomLeft"
                                      content={<DotButtonMenu img={x.img} />}
                                      trigger="click"
                                      className={styles.imageDotButton}
                                      style={{ backgroundColor: 'red' }}
                                    >
                                      <div className={styles.dotBtn}>
                                        <Dot />
                                      </div>
                                    </Popover>
                                  ) : (
                                    <div
                                      className={styles.dotBtn}
                                      onClick={() => setDotMenuDrawer(true)}
                                    >
                                      <Dot />
                                    </div>
                                  )}
                                </div>
                                <div className={styles.imageAlbum} key={i}>
                                  <ImageItem
                                    id={x?.id?.toString() || ''}
                                    origin={x.img || ''}
                                    className={classNames(
                                      styles.gridItem,
                                      `img${i}`
                                    )}
                                  />
                                  {x.isSensitive ? (
                                    <div className={styles.sensitiveClass}>
                                      <EyeInvisibleOutlined />
                                      {!isMobile && <p>Sensitive Content</p>}
                                      <span
                                        onClick={() => (x.isSensitive = false)}
                                      >
                                        {t('galley.list.image.show')}
                                      </span>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </Checkbox>
                          )
                        })}
                    </div>
                  </div>
                )}
                {(loading || data?.imageCount > data?.albumImages?.length) && (
                  <div
                    className={styles.albumImagesDiv}
                    style={{
                      borderTop:
                        data?.albums?.length > 0 ? '1px solid #ecedf0' : '',
                      marginTop: data?.albums?.length > 0 ? '50px' : '0px',
                    }}
                  >
                    <div className={styles.loadingText}>Loading...</div>
                  </div>
                )}
                {isMobile && showMenu && (
                  <div className={styles.bottomBar}>
                    <ToTopOutlined onClick={() => setMenuDrawer(true)} />
                    <h3>{selectedImage.length} photos selected</h3>
                    <Drawer
                      placement={'bottom'}
                      closable={false}
                      onClose={() => setMenuDrawer((e) => !e)}
                      visible={menuDrawer}
                      className={styles.menuContentMobile}
                    >
                      <ImageMenuDrawer />
                    </Drawer>
                    <Drawer
                      placement={'bottom'}
                      closable={false}
                      onClose={() => setDotMenuDrawer((e) => !e)}
                      visible={dotMenuDrawer}
                      className={styles.menuContentMobile}
                    >
                      <div className={styles.menuContentMobileHeader}>
                        <div className={styles.handler} />
                        <div className={styles.menuContentMobileBody}>
                          <div className={styles.menuContentList}>
                            <div
                              className={styles.menuItem}
                              style={{ borderBottom: '1px solid #ECEDF0' }}
                            >
                              <DownloadOutlined />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.download.button')}
                            </div>
                            <div className={styles.menuItem}>
                              <PictureOutlined style={{ color: '#9292A3' }} />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.add.album.button')}
                              <div className={styles.leftItem}>
                                <RightOutlined />
                              </div>
                            </div>
                            <div className={styles.menuItem}>
                              <CalendarOutlined style={{ color: '#9292A3' }} />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.change.date.button')}
                            </div>
                            <div className={styles.menuItem}>
                              <EditOutlined style={{ color: '#9292A3' }} />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.rename.button')}
                            </div>
                            <div className={styles.menuItem}>
                              <ShareAltOutlined style={{ color: '#9292A3' }} />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.share.button')}
                            </div>
                            <div className={styles.menuItem}>
                              <TagOutlined />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.set.profile.button')}
                            </div>
                            <div
                              className={styles.menuItem}
                              onClick={() => {
                                setOpenDeleteModal(!openDeleteModal)
                              }}
                              style={{ color: 'red' }}
                            >
                              <DeleteOutlined />
                              &nbsp;&nbsp;&nbsp;
                              {t('galley.list.album.delete.button')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Drawer>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {listView && (
          <>
            <div className={styles.albumListView}>
              {data.albums.length > 0 && (
                <Table
                  columns={listAlbumColumns}
                  dataSource={listAlbumData}
                  pagination={false}
                />
              )}
            </div>
            <div className={styles.albumListView}>
              {data.albumImages.length > 0 && (
                <Table
                  columns={albumImageColumn}
                  dataSource={albumImageList}
                  loading={loading}
                  pagination={false}
                />
              )}
              {isMobile && showMenu && (
                <div className={styles.bottomBar}>
                  <ToTopOutlined onClick={() => setMenuDrawer(true)} />
                  <h3>{selectedImage.length} photos selected</h3>
                  <Drawer
                    placement={'bottom'}
                    closable={false}
                    onClose={() => setMenuDrawer((e) => !e)}
                    visible={menuDrawer}
                    className={styles.menuContentMobile}
                  >
                    <ImageMenuDrawer />
                  </Drawer>
                </div>
              )}
            </div>
          </>
        )}
        <Modal
          centered={true}
          onCancel={() => setPhotoDeleteModal(false)}
          onOk={() => handleDelete()}
          visible={photoDeleteModal}
          title={t('galley.list.view.delete.modal.title')}
          cancelText={t('common-label-cancel')}
          okText={t('galley.list.view.delete.ok.button')}
        >
          <div>
            <p>{t('galley.list.view.delete.modal.photo.description')}</p>
          </div>
        </Modal>
      </div>
      {listView && (
        <div className={styles.imagesTablePagination}>
          <Pagination
            showingRecords={50}
            pageSize={20}
            total={data?.imageCount}
            defaultPageSize={20}
            current={currentPage}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  )
}

export default AlbumData
