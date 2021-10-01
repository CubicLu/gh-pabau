import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
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
import { Table, Drawer, Popover, Skeleton, Button, Card, Modal } from 'antd'
import { Checkbox } from '../checkbox/Checkbox'
import classNames from 'classnames'
import { ReactComponent as Dot } from '../../assets/images/three-dot-v.svg'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Share } from '../../assets/images/image-share.svg'
import { ReactComponent as ImageAlbum } from '../../assets/images/image-album.svg'
import dayjs from 'dayjs'

const ImageItem = ({ origin, ...props }) => {
  const [source, setSource] = useState('')
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
  }, [origin, source])
  return source ? (
    <img src={source} alt="content" {...props} />
  ) : (
    <div {...props}>
      <Skeleton.Image />
    </div>
  )
}

export interface ImageProps {
  id?: number
  isSensitive?: boolean
  img?: string
  date?: number
  lastModified?: string
}

export interface AlbumProps {
  album: AlbumProps[]
  id: number
  albumTitle: string
  imageCount: number
  albumImage: Array<ImageProps>
}

export interface AlbumDataProps {
  data: AlbumProps
  onFolderClick: (index) => void
  selectedImage: Array<string>
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
  loadMorePhotos?: (albumId: number, page?: number) => void
  gridLoading?: boolean
  gridImagesLimit: number
  tableLoading?: boolean
  currentTablePage?: number
  tablePageSize?: number
  onPageChange?: (page: number) => void
  tableImages?: ImageProps[]
  pageSizeChange?: (size: number) => void
}

export const AlbumData: FC<AlbumDataProps> = ({
  data,
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
  loadMorePhotos,
  gridLoading = false,
  tableLoading = false,
  gridImagesLimit,
  currentTablePage = 1,
  tablePageSize = 20,
  onPageChange,
  tableImages = [],
  pageSizeChange,
}) => {
  const imagesDivRef = useRef<HTMLDivElement>(null)

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
      data.album?.map((albumData, index) =>
        temp.push({
          name: [albumData, index],
          files: [calculateAlbumLength(albumData), index],
          lastModified: [dayjs().format('DD.MM.YYYY') as string, index],
        } as never)
      )
      setListAlbumData(temp)
    }
  }, [data, listView])

  useEffect(() => {
    const temp = []
    if (listView) {
      console.log('T:', tableImages)
      tableImages?.map((x, index) =>
        temp.push({
          name: [x, index],
          owner: 'me',
          lastModified: [dayjs().format('DD.MM.YYYY') as string, index],
        } as never)
      )
      setAlbumImageList(temp)
    }
  }, [tableImages, listView, selectedImage])

  useEffect(() => {
    if (imagesDivRef?.current) {
      imagesDivRef.current.scrollTop = 0
    }
  }, [listView])

  const listAlbumColumns = [
    {
      window: '30%',
      visible: true,
      title: t('galley.list.view.photo.name'),
      dataIndex: 'name',
      render: function renderTableSource(value) {
        return (
          <div
            className={styles.tableFirstCol}
            onClick={() => onFolderClick(value[1])}
          >
            <div className={styles.gridAlbum}>{showAlbumImages(value[0])}</div>
            <p>{value[0].albumTitle}</p>
          </div>
        )
      },
    },
    {
      width: '20%',
      visible: true,
      title: t('galley.list.view.photo.files'),
      dataIndex: 'files',
      render: function renderTableSource(value) {
        return value[0]
      },
    },
    {
      width: '30%',
      visible: true,
      title: t('galley.list.view.photo.last.modified'),
      dataIndex: 'lastModified',
      render: function renderTableSource(value) {
        return value[0]
      },
    },
    {
      visible: true,
      title: '',
      key: 'action',
      width: '20%',
      render: function renderTableSource(text, record) {
        return !isMobile ? (
          <Popover
            placement="left"
            content={albumDotMenu(record.name[0])}
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
                {albumDotMenu(record.name[0])}
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
      visible: true,
      width: '50%',
      render: function renderTableSource(value) {
        const filename = value[0] ? value[0].img.split('/') : []
        return (
          <div className={styles.folderContentFirst}>
            <Checkbox
              checked={selectedImage.includes(value[0] as never)}
              onChange={(e) => handleOnChange(e.target.checked, value[0])}
            >
              <Card bordered={false}>
                <ImageItem
                  origin={value[0].img}
                  alt={'none'}
                  className={styles.tableImage}
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
      width: '15%',
      visible: true,
      title: t('galley.list.menu.Owner.album'),
      dataIndex: 'owner',
    },
    {
      width: '25%',
      visible: true,
      title: t('galley.list.view.photo.last.modified'),
      dataIndex: 'lastModified',
    },
    {
      visible: true,
      title: '',
      key: 'action',
      width: '10%',
      render: function renderTableSource(text, record) {
        return !isMobile ? (
          <Popover
            placement="left"
            content={() => dotButtonMenu(record.name[0].img)}
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
                {dotButtonMenu(record.name[0])}
              </div>
            </Drawer>
          </>
        )
      },
    },
  ]

  const dotButtonMenu = (img) => (
    <div className={styles.menuContentMobileBody}>
      <div className={styles.menuContentList}>
        <div
          className={styles.menuItem}
          style={{ borderBottom: '1px solid #ECEDF0' }}
          onClick={() => {
            selectedImage.push(img as never)
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

  const handleAlbumDownload = (albumImage) => {
    albumImage.map((img) => {
      return imgDownload(img)
    })
  }
  const albumDotMenu = (albums) => (
    <div className={styles.menuContentMobileBody}>
      <div className={styles.menuContentList}>
        <div
          className={styles.menuItem}
          style={{ borderBottom: '1px solid #ECEDF0' }}
          onClick={() => {
            handleAlbumDownload(albums.albumImage)
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
  const handleDrawerContent = () => {
    setMoveAlbum((e) => !e)
  }

  const showAlbumImages = (x) => {
    if (x.albumImage && x.albumImage.length > 0) {
      if (x.albumImage.length > 0 && x.albumImage.slice(0, 4)) {
        return (
          <>
            {x.albumImage.slice(0, 4).map((item, key) => {
              return (
                <ImageItem
                  origin={item?.img}
                  alt={x.albumTitle}
                  key={key}
                  className={styles.gridItem}
                  id={x.albumTitle}
                  draggable={false}
                />
              )
            })}
            {Array.from({ length: 4 - x.albumImage.length })
              .fill(null)
              .map((_, i) => i)
              .map((i) => (
                <div key={i} className={styles.gridItem}>
                  <Skeleton.Image />
                </div>
              ))}
          </>
        )
      }
    } else {
      return (
        <div className={styles.blankAlbum}>
          <Skeleton.Image />
        </div>
      )
    }
  }

  const calculateAlbumLength = (currentAlbum) => {
    let albumImageLen = 0
    albumImageLen = currentAlbum?.albumImage?.length
    const checkLength = (innerAlbum) => {
      innerAlbum.map((x) => {
        albumImageLen += x.albumImage?.length
        return x.album?.length > 0 ? checkLength(x.album) : albumImageLen
      })
    }
    currentAlbum.album?.length > 0 && checkLength(currentAlbum.album)
    return albumImageLen
  }
  const handleDelete = () => {
    const temp = { ...data }
    temp.albumImage.map((x, i) => {
      if (x.img === albumImage) {
        temp.albumImage.splice(i, 1)
      }
      return 1
    })
    setCurrentData(temp)
    setAlbumImage('')
    setPhotoDeleteModal(false)
  }

  const imageMenuDrawer = () => (
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
              {data.album?.map(
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

  const albumMenuDrawer = (x) => (
    <Drawer
      placement={'bottom'}
      closable={false}
      onClose={() => setAlbumDotMenuDrawer((e) => !e)}
      visible={albumDotMenuDrawer}
      className={styles.menuContentMobile}
    >
      <div className={styles.menuContentMobileHeader}>
        <div className={styles.handler} />
        {albumDotMenu(x)}
      </div>
    </Drawer>
  )

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom && !listView && data?.albumImage?.length < data?.imageCount) {
      loadMorePhotos?.(data?.id)
    }
  }

  return (
    <div>
      {!listView && (
        <div className={styles.galleryImgBox}>
          <div className={styles.galleryWrap}>
            <div
              className={classNames(styles.albumImagesDiv, styles.scrollDiv)}
              onScroll={handleScroll}
              ref={imagesDivRef}
            >
              {data.album?.map((x, i) => (
                <>
                  <div style={{ minWidth: '170px', marginTop: '24px' }} key={i}>
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
                            content={() => albumDotMenu(x)}
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
                        {showAlbumImages(x)}
                      </div>
                    </div>
                    <div className={styles.albumInfo}>
                      <h2 className={styles.albumTitle}>{x.albumTitle}</h2>
                      <span className={styles.albumCount}>
                        {calculateAlbumLength(x) as number}
                      </span>
                    </div>
                  </div>
                  {albumMenuDrawer(x)}
                  {/*<Drawer*/}
                  {/*  placement={'bottom'}*/}
                  {/*  closable={false}*/}
                  {/*  onClose={() => setAlbumDotMenuDrawer((e) => !e)}*/}
                  {/*  visible={albumDotMenuDrawer}*/}
                  {/*  className={styles.menuContentMobile}*/}
                  {/*>*/}
                  {/*  <div className={styles.menuContentMobileHeader}>*/}
                  {/*    <div className={styles.handler} />*/}
                  {/*    {albumDotMenu(x)}*/}
                  {/*  </div>*/}
                  {/*</Drawer>*/}
                </>
              ))}

              <div
                style={{
                  marginTop: data.album?.length ? '50px' : '0px',
                  borderTop: data.album?.length ? '1px solid #ecedf0' : '',
                }}
                className={styles.albumImagesDiv}
              >
                <div className={styles.galleryAlbumImage}>
                  {data.albumImage?.length > 0 &&
                    data.albumImage.map((x: ImageProps, i) => {
                      return (
                        <Checkbox
                          checked={selectedImage.includes(x as never)}
                          key={i}
                          onChange={(value) =>
                            handleOnChange(value.target.checked, x)
                          }
                          className={
                            selectedImage.includes(x as never)
                              ? classNames(styles.checked, styles.showCheck)
                              : ''
                          }
                        >
                          <div className={styles.imagePreview}>
                            <div className={styles.checkWrappers}>
                              {!isMobile ? (
                                <Popover
                                  placement="bottomRight"
                                  content={() => dotButtonMenu(x.img)}
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
                                origin={x.img}
                                className={`img${i}`}
                                alt={x.img}
                                id={x.img}
                                key={i}
                                draggable={true}
                                onDragStart={(event) => drag(event)}
                              />
                              {x.isSensitive ? (
                                <div className={styles.sensitiveClass}>
                                  <EyeInvisibleOutlined />
                                  {!isMobile && <p>Sensitive Content</p>}
                                  <span onClick={() => (x.isSensitive = false)}>
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
                {gridLoading && (
                  <div className={styles.gridViewItemSkeleton}>
                    <div className={styles.boxItemImage}>
                      {Array.from({ length: gridImagesLimit })
                        .fill(null)
                        .map((_, i) => i)
                        .map((img) => {
                          return (
                            <div className={styles.imagePreview} key={img}>
                              <Skeleton.Image />
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )}
              </div>
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
                    {imageMenuDrawer()}
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
            {data.album.length > 0 && (
              <Table
                columns={listAlbumColumns}
                dataSource={listAlbumData}
                pagination={false}
              />
            )}
          </div>
          <div className={styles.albumListView}>
            {albumImageList.length > 0 && (
              <Table
                loading={tableLoading}
                columns={albumImageColumn}
                dataSource={albumImageList}
                pagination={false}
                scroll={{ x: 'max-content' }}
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
                  {imageMenuDrawer()}
                </Drawer>
              </div>
            )}
            <Pagination
              total={data?.imageCount}
              defaultPageSize={50}
              showSizeChanger={false}
              onChange={onPageChange}
              pageSizeOptions={['10', '25', '50', '100']}
              onPageSizeChange={pageSizeChange}
              pageSize={tablePageSize}
              current={currentTablePage}
              showingRecords={
                (currentTablePage - 1) * tablePageSize +
                  albumImageList?.length || 0
              }
            />
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
  )
}

export default AlbumData
