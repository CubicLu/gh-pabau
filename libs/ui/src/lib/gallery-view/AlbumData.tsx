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
  CloseOutlined,
} from '@ant-design/icons'
import { Pagination } from '@pabau/ui'
import { ColumnsType } from 'antd/es/table'
import {
  Table,
  Drawer,
  Popover,
  Skeleton,
  Button,
  Card,
  Modal,
  Menu,
} from 'antd'
import { Checkbox } from '../checkbox/Checkbox'
import classNames from 'classnames'
import { ReactComponent as Dot } from '../../assets/images/three-dot-v.svg'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Share } from '../../assets/images/image-share.svg'
import { ReactComponent as ImageAlbum } from '../../assets/images/image-album.svg'
import dayjs from 'dayjs'

const getThumb = (src: string) => {
  if (src.includes('photos/')) {
    const pathArr = src.split('photos/')
    pathArr[1] = `thumb_${pathArr[1]}`
    return pathArr.join('photos/')
  } else {
    return src
  }
}

const ImageItem = ({ origin, isDirectPath = false, ...props }) => {
  const [source, setSource] = useState('')

  useEffect(() => {
    if (source === '' && origin !== '') {
      const path = getThumb(origin)
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
        setSource('')
      })
      img.src = path
    }
  }, [isDirectPath, origin, source])

  return source ? (
    <img
      src={!isDirectPath ? source : getThumb(origin)}
      alt="content"
      {...props}
    />
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
  modifiedDate: string
  albumTitle: string
  imageCount: number
  albumImage: Array<ImageProps>
}

interface DataSourceType {
  [key: string]: string | number
}

export interface AlbumDataProps {
  data: AlbumProps
  allAlbums: AlbumProps[]
  onFolderClick: (index) => void
  selectedImages: ImageProps[]
  setSelectedImages: (e) => void
  handleImageSelection: (checked, img) => void
  loading: boolean
  showMenu: boolean
  setOpenDeleteModal: (e) => void
  openDeleteModal: boolean
  handleImageMove: (album, images) => void
  drop: (e) => void
  allowDrop: (e) => void
  dragImage: (e) => void
  dragAlbum: (e) => void
  handleDownload: () => void
  imgDownload: (img) => void
  listView: boolean
  setCurrentData: (e) => void
  paginateData: {
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
    currentPage: number
  }
  onAlbumRename?: (id: number) => void
  onAlbumDelete: (id: number) => void
  openImageStudio?: (album, image) => void
  onSingleImageMove?: (
    albumId: number,
    imageId: number,
    createAlbum?: boolean
  ) => void
}

export const AlbumData: FC<AlbumDataProps> = ({
  data,
  allAlbums,
  onFolderClick,
  selectedImages,
  handleImageSelection,
  loading = true,
  setSelectedImages,
  showMenu,
  openDeleteModal,
  setOpenDeleteModal,
  handleImageMove,
  drop,
  allowDrop,
  dragImage,
  dragAlbum,
  handleDownload,
  imgDownload,
  onAlbumDelete,
  listView,
  setCurrentData,
  paginateData,
  onAlbumRename,
  openImageStudio,
  onSingleImageMove,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [dotMenuDrawer, setDotMenuDrawer] = useState(false)
  const [menuDrawer, setMenuDrawer] = useState(false)
  const [moveAlbum, setMoveAlbum] = useState(false)
  const [albumDotMenuDrawer, setAlbumDotMenuDrawer] = useState(false)
  const [albumListDrawer, setAlbumListDrawer] = useState(false)
  const [photoDeleteModal, setPhotoDeleteModal] = useState(false)
  const [albumImage, setAlbumImage] = useState('')

  const handleAlbumDownload = (albumImage) => {
    albumImage.map((img) => {
      return imgDownload(img)
    })
  }

  const AlbumDotMenu = ({ album }) => (
    <div className={styles.menuContentMobileBody}>
      <div className={styles.menuContentList}>
        <div
          className={styles.menuItem}
          onClick={() => {
            handleAlbumDownload(album.albumImage)
          }}
        >
          <DownloadOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.download.button')}
        </div>
        <div
          className={styles.menuItem}
          onClick={() => onAlbumRename?.(album?.id)}
        >
          <EditOutlined />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.rename.button')}
        </div>
        <div className={styles.menuItem}>
          <ShareAltOutlined />
          &nbsp;&nbsp;&nbsp;
          {t('galley.list.album.share.button')}
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            onAlbumDelete(album?.id)
          }}
        >
          <DeleteOutlined />
          &nbsp;&nbsp;&nbsp;{t('galley.list.album.delete.button')}
        </div>
      </div>
    </div>
  )

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
            <p>{value[0].albumTitle?.substring(0, 40)}</p>
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
        return value
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
            content={<AlbumDotMenu album={record.name[0]} />}
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
                <AlbumDotMenu album={record.name[0]} />
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
      skeletonWidth: '50%',
      render: function renderTableSource(value) {
        const filename = value?.[0] ? value?.[0]?.img.split('/') : []
        return (
          <div className={styles.folderContentFirst}>
            <Checkbox
              checked={selectedImages.includes(value?.[0] as never)}
              onChange={(e) =>
                handleImageSelection?.(e.target.checked, value?.[0])
              }
            />
            <Card bordered={false}>
              <ImageItem
                origin={value?.[0]?.img || ''}
                alt={'none'}
                className={styles.tableImage}
                onClick={() => openImageStudio?.(data?.id, value?.[0]?.id)}
              />
            </Card>
            <div>
              <p>{filename?.[filename.length - 1]?.substring(0, 40)}</p>
            </div>
          </div>
        )
      },
    },
    {
      width: '15%',
      skeletonWidth: '15%',
      visible: true,
      title: t('galley.list.menu.Owner.album'),
      dataIndex: 'owner',
    },
    {
      width: '25%',
      skeletonWidth: '25%',
      visible: true,
      title: t('galley.list.view.photo.last.modified'),
      dataIndex: 'lastModified',
    },
    {
      visible: true,
      title: '',
      key: 'action',
      width: '10%',
      skeletonWidth: '10%',
      render: function renderTableSource(text, record) {
        return !isMobile ? (
          <Popover
            placement="left"
            content={() => (
              <DotButtonMenu
                img={record?.name?.[0]?.img}
                imageId={record?.id}
                albumMenu={false}
              />
            )}
            trigger="click"
            className={styles.imageDotButton}
          >
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              title="hell"
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
                <DotButtonMenu
                  img={record.name[0]}
                  imageId={record.id}
                  albumMenu={false}
                />
              </div>
            </Drawer>
          </>
        )
      },
    },
  ]

  const AlbumDropdownMenu = ({ imageId, closePopover }) => {
    const filtered: { id: number; name: string }[] = []
    const iterateToAlbms = (albums) => {
      for (const el of albums) {
        if (el?.id !== data?.id) {
          filtered.push({
            id: el?.id,
            name: el?.albumTitle,
          })
          if (el?.album?.length) iterateToAlbms(el?.album)
        }
      }
    }
    iterateToAlbms(allAlbums)
    if (data?.id !== 0) filtered.unshift({ id: 0, name: 'Uncategorized' })

    return (
      <Menu className={styles.menuItemList}>
        {filtered?.map((album) => (
          <Menu.Item
            key={album.id.toString()}
            onClick={() => {
              onSingleImageMove?.(album.id, imageId, false)
              closePopover?.()
            }}
          >
            <ImageAlbum />
            <div>{album.name}</div>
          </Menu.Item>
        ))}
        <Menu.Item
          key="New"
          onClick={() => {
            onSingleImageMove?.(0, imageId, true)
            closePopover?.()
          }}
        >
          <PlusOutlined />
          <div>{t('galley.view.album.create.album.modal.title')}</div>
        </Menu.Item>
      </Menu>
    )
  }

  const DotButtonMenu = ({ img, imageId, albumMenu = false }) => {
    const [albumDropdown, setAlbumDropdown] = useState(albumMenu)
    useEffect(() => {
      setAlbumDropdown(albumMenu)
    }, [albumMenu])
    return albumDropdown ? (
      <div className={styles.dotBtnAlbumDropdown}>
        <CloseOutlined onClick={() => setAlbumDropdown((e) => false)} />
        <AlbumDropdownMenu
          imageId={imageId}
          closePopover={() => setAlbumDropdown((e) => false)}
        />
      </div>
    ) : (
      <div className={styles.menuContentMobileBody}>
        <div className={styles.menuContentList}>
          <div
            className={styles.menuItem}
            onClick={() => {
              selectedImages.push(img as never)
              setSelectedImages([...selectedImages])
              imgDownload(img)
            }}
          >
            <DownloadOutlined />
            &nbsp;&nbsp;&nbsp;{t('galley.list.album.download.button')}
          </div>
          <div
            className={styles.menuItem}
            onClick={() => setAlbumDropdown((e) => !e)}
          >
            <PictureOutlined />
            &nbsp;&nbsp;&nbsp;
            {t('galley.list.album.add.album.button')}
            <div className={styles.leftItem}>
              <RightOutlined />
            </div>
          </div>
          <div className={styles.menuItem}>
            <CalendarOutlined />
            &nbsp;&nbsp;&nbsp;
            {t('galley.list.album.change.date.button')}
          </div>
          <div className={styles.menuItem}>
            <EditOutlined />
            &nbsp;&nbsp;&nbsp;
            {t('galley.list.album.rename.button')}
          </div>
          <div className={styles.menuItem}>
            <ShareAltOutlined />
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
          >
            <DeleteOutlined />
            &nbsp;&nbsp;&nbsp;{t('galley.list.album.delete.button')}
          </div>
        </div>
      </div>
    )
  }

  const handleDrawerContent = () => {
    setMoveAlbum((e) => !e)
  }

  const showAlbumImages = (album) => {
    if (album.albumImage && album.albumImage.length > 0) {
      if (album.albumImage.length > 0 && album.albumImage.slice(0, 4)) {
        return (
          <>
            {album.albumImage.slice(0, 4).map((item, key) => (
              <ImageItem
                isDirectPath
                origin={item?.img}
                alt={album.albumTitle}
                key={key}
                className={styles.gridItem}
                id={album.albumTitle}
                draggable={false}
              />
            ))}
            {Array.from({ length: 4 - album.albumImage.length })
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
    albumImageLen = currentAlbum?.imageCount
    const checkLength = (innerAlbum) => {
      innerAlbum.map((x) => {
        albumImageLen += x.imageCount
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

  const ImageMenuDrawer = () => (
    <div className={styles.menuContentMobileHeader}>
      <div className={styles.handler} />
      {!moveAlbum ? (
        <div className={styles.menuContentMobileBody}>
          <div className={styles.menuContentList}>
            <div className={styles.menuItem} onClick={() => handleDownload()}>
              <DownloadOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.download.button')}
              {`(${selectedImages.length})`}
            </div>
            <div
              className={styles.menuItem}
              onClick={() => handleDrawerContent()}
            >
              <EnterOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.menu.move.button')}{' '}
              {`(${selectedImages.length})`}
              <div className={styles.leftItem}>
                <RightOutlined />
              </div>
            </div>
            <div className={styles.menuItem}>
              <Share />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.share.button')}{' '}
              {`(${selectedImages.length})`}
            </div>
            <div className={styles.menuItem}>
              <TagOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.tag.button')}{' '}
              {`(${selectedImages.length})`}
            </div>
            <div className={styles.menuItem}>
              <EyeOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.studio.button')}{' '}
              {`(${selectedImages.length})`}
            </div>
            <div
              className={styles.menuItem}
              onClick={() => {
                setOpenDeleteModal(!openDeleteModal)
              }}
            >
              <DeleteOutlined />
              &nbsp;&nbsp;&nbsp;{t('galley.list.album.delete.button')}{' '}
              {`(${selectedImages.length})`}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.title}>
            <span>
              <LeftOutlined onClick={() => handleDrawerContent()} />
            </span>
            <h3>
              {t('galley.list.album.move.button')} ({selectedImages.length})
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
                      onClick={() => handleImageMove(album.albumTitle, [])}
                    >
                      <ImageAlbum />
                      &nbsp;&nbsp;&nbsp;
                      {album.albumTitle} {`(${selectedImages.length})`}
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

  const AlbumMenuDrawer = ({ data }) => (
    <Drawer
      placement={'bottom'}
      closable={false}
      onClose={() => setAlbumDotMenuDrawer((e) => !e)}
      visible={albumDotMenuDrawer}
      className={styles.menuContentMobile}
    >
      <div className={styles.menuContentMobileHeader}>
        <div className={styles.handler} />
        <AlbumDotMenu album={data} />
      </div>
    </Drawer>
  )

  const LoadingTable = ({ columns }) => {
    const cColumns: ColumnsType = []
    const dataSource: DataSourceType[] = []
    for (const key of columns) {
      const { visible = true } = key
      if (visible) {
        cColumns.push({
          ...key,
          render: function render() {
            const width = key.skeletonWidth ?? '200px'
            return (
              <div className={styles.columnLoader} style={{ width: width }}>
                <Skeleton.Input active={true} size="small" />
              </div>
            )
          },
        })
      }
    }
    for (let i = 0; i < (paginateData?.pageSize || 10); i = i + 1) {
      let data
      for (const key of columns) {
        data = { ...data, id: i, key: i, [key.dataIndex]: '' }
      }
      dataSource.push(data)
    }
    return (
      <Table
        dataSource={dataSource}
        columns={cColumns}
        rowKey="key"
        pagination={false}
        className={styles.dragTable}
      />
    )
  }

  return (
    <>
      <div
        className={classNames(
          styles.galleryImgBox,
          listView && styles.displayNone
        )}
      >
        <div className={styles.galleryWrap}>
          <div className={styles.albumImagesDiv}>
            {data.album?.map((x, i) => (
              <div key={i}>
                <div
                  id={x.id?.toString()}
                  className={styles.albumContainer}
                  onDragStart={(event) => dragAlbum(event)}
                  draggable={true}
                >
                  <div
                    id={`tar${x.id}`}
                    className={styles.dropable}
                    onClick={() => onFolderClick(i)}
                    onDrop={(ev) => drop(ev)}
                    onDragOver={(ev) => allowDrop(ev)}
                    onDragLeave={() => {
                      document
                        ?.querySelector(`#tar${x.id}`)
                        ?.classList?.remove('dropEffect')
                    }}
                  ></div>
                  <div className={styles.checkWrapper}>
                    {!isMobile ? (
                      <Popover
                        placement="bottomRight"
                        content={() => <AlbumDotMenu album={x} />}
                        trigger="click"
                        className={styles.imageDotButton}
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
                  <div className={styles.gridContainer}>
                    {showAlbumImages(x)}
                  </div>
                </div>
                <div className={styles.albumInfo}>
                  <h2 className={styles.albumTitle}>{x.albumTitle}</h2>
                  <span className={styles.albumCount}>
                    {calculateAlbumLength(x) as number}
                  </span>
                </div>
                <AlbumMenuDrawer data={x} />
              </div>
            ))}

            <div
              style={{
                marginTop: data.album?.length ? '50px' : '0px',
                borderTop:
                  data.album?.length && data.imageCount
                    ? '1px solid #ecedf0'
                    : '',
              }}
              className={styles.albumImagesDiv}
            >
              <div className={styles.galleryAlbumImage}>
                {!loading &&
                  data.albumImage?.length > 0 &&
                  data.albumImage.map((x: ImageProps, i) => {
                    return (
                      <div
                        className={
                          selectedImages.includes(x as never)
                            ? classNames(styles.imagePreview, styles.showCheck)
                            : styles.imagePreview
                        }
                        key={i}
                      >
                        <div
                          className={styles.imageAlbum}
                          key={i}
                          onClick={() => openImageStudio?.(data?.id, x?.id)}
                        >
                          <ImageItem
                            origin={x.img}
                            className={`img${i}`}
                            alt={x.img}
                            id={x.id}
                            key={i}
                            draggable={true}
                            onDragStart={(event) => dragImage(event)}
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
                        <div className={styles.checkWrappers}>
                          <Checkbox
                            checked={selectedImages.includes(x as never)}
                            onChange={(value) =>
                              handleImageSelection?.(value.target.checked, x)
                            }
                          />
                        </div>
                        <div className={styles.checkWrappers}>
                          {!isMobile ? (
                            <Popover
                              placement="bottomRight"
                              content={() => (
                                <DotButtonMenu
                                  img={x.img}
                                  imageId={x.id}
                                  albumMenu={false}
                                />
                              )}
                              trigger="click"
                              className={styles.imageDotButton}
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
                      </div>
                    )
                  })}
                {loading && data.albumImage?.length > 0 && (
                  <div className={styles.gridViewItemSkeleton}>
                    <div className={styles.boxItemImage}>
                      {Array.from({
                        length:
                          data?.imageCount < paginateData?.pageSize
                            ? data?.imageCount
                            : paginateData?.pageSize || 10,
                      })
                        .fill(null)
                        .map((_, i) => i)
                        .map((img) => {
                          return (
                            <ImageItem
                              origin=""
                              className={styles.imagePreview}
                              key={img}
                            />
                          )
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isMobile && showMenu && (
              <div className={styles.bottomBar}>
                <ToTopOutlined onClick={() => setMenuDrawer(true)} />
                <h3>{selectedImages.length} photos selected</h3>
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
                        <div className={styles.menuItem}>
                          <DownloadOutlined />
                          &nbsp;&nbsp;&nbsp;
                          {t('galley.list.album.download.button')}
                        </div>
                        <div className={styles.menuItem}>
                          <PictureOutlined />
                          &nbsp;&nbsp;&nbsp;
                          {t('galley.list.album.add.album.button')}
                          <div className={styles.leftItem}>
                            <RightOutlined />
                          </div>
                        </div>
                        <div className={styles.menuItem}>
                          <CalendarOutlined />
                          &nbsp;&nbsp;&nbsp;
                          {t('galley.list.album.change.date.button')}
                        </div>
                        <div className={styles.menuItem}>
                          <EditOutlined />
                          &nbsp;&nbsp;&nbsp;
                          {t('galley.list.album.rename.button')}
                        </div>
                        <div className={styles.menuItem}>
                          <ShareAltOutlined />
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

      <div
        className={classNames(
          styles.albumListView,
          !listView && styles.displayNone
        )}
      >
        {data.album.length > 0 && (
          <Table
            columns={listAlbumColumns}
            dataSource={data?.album?.map(
              (albumData, index) =>
                ({
                  name: [albumData, index],
                  files: [calculateAlbumLength(albumData), index],
                  lastModified: dayjs(albumData.modifiedDate).format(
                    'DD.MM.YYYY'
                  ) as string,
                } as never)
            )}
            pagination={false}
          />
        )}
        {data?.albumImage?.length > 0 &&
          (loading ? (
            <LoadingTable columns={albumImageColumn} />
          ) : (
            <Table
              columns={albumImageColumn}
              dataSource={data.albumImage?.map((x, index) => ({
                id: x?.id,
                name: [x, index],
                owner: 'me',
                lastModified: dayjs(
                  new Date((x?.date || 0) * 1000 || '')
                ).format('DD.MM.YYYY') as string,
              }))}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          ))}
        {isMobile && showMenu && (
          <div className={styles.bottomBar}>
            <ToTopOutlined onClick={() => setMenuDrawer(true)} />
            <h3>{selectedImages.length} photos selected</h3>
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

      {data?.imageCount > 0 && (
        <div className={styles.pagination}>
          <Pagination
            total={data?.imageCount}
            defaultPageSize={50}
            showSizeChanger={false}
            onChange={paginateData?.onPageChange}
            pageSizeOptions={['10', '25', '50', '100']}
            onPageSizeChange={paginateData?.onPageSizeChange}
            pageSize={paginateData?.pageSize}
            current={paginateData?.currentPage}
            showingRecords={
              (paginateData?.currentPage - 1) * paginateData?.pageSize +
                data?.albumImage?.length || 0
            }
          />
        </div>
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
    </>
  )
}

export default AlbumData
