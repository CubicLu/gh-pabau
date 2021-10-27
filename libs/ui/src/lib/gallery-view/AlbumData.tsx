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
import { Table, Drawer, Popover, Skeleton, Button, Card, Modal } from 'antd'
import img1 from '../../assets/images/blank-album.png'
import { Checkbox } from '../checkbox/Checkbox'
import classNames from 'classnames'
import { ReactComponent as Dot } from '../../assets/images/three-dot-v.svg'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Share } from '../../assets/images/image-share.svg'
import { ReactComponent as ImageAlbum } from '../../assets/images/image-album.svg'
import dayjs from 'dayjs'

export interface ImageProps {
  id?: number
  isSensitive?: boolean
  img?: string
}

export interface AlbumProps {
  album: AlbumProps[]
  id: string | number
  albumTitle: string
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
      data.albumImage?.map((x, index) =>
        temp.push({
          name: [x, index],
          owner: 'me',
          lastModified: [dayjs().format('DD.MM.YYYY') as string, index],
        } as never)
      )
      setAlbumImageList(temp)
    }
  }, [data, listView, selectedImage])

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
          <div className={styles.gridAlbum}>{showAlbumImages(value[0])}</div>
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
      // eslint-disable-next-line react/display-name
      render: (value) => {
        const filename = value[0] ? value[0].img.split('/') : []
        return (
          <div className={styles.folderContentFirst}>
            <Checkbox
              checked={selectedImage.includes(value[0] as never)}
              onChange={(e) => handleOnChange(e.target.checked, value[0])}
            >
              <Card bordered={false}>
                <img src={value[0].img} alt={'none'} height={35} width={50} />
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
                <img
                  src={item as unknown as string}
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
                <img
                  src={img1}
                  key={i}
                  alt={x.albumTitle}
                  id={x.albumTitle}
                  className={styles.gridItem}
                  style={{ backgroundColor: '#f4f4f4' }}
                />
              ))}
          </>
        )
      }
    } else {
      return (
        <img
          src={img1}
          key={x.albumTitle}
          alt={x.albumTitle}
          id={x.albumTitle}
          className={styles.blankAlbum}
        />
      )
    }
  }

  const calculateAlbumLength = (currentAlbum) => {
    let albumImageLen = 0
    albumImageLen = currentAlbum.albumImage.length
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

  return (
    <div>
      {!listView && (
        <div className={styles.galleryImgBox}>
          <div className={styles.galleryWrap}>
            <div
              style={{ display: 'flex', minWidth: '690px', flexWrap: 'wrap' }}
            >
              {data.album?.map((x, i) => (
                <>
                  <div style={{ minWidth: '170px' }} key={i}>
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

              <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                {loading ? (
                  <div className={styles.gridViewItemSkeleton}>
                    <div className={styles.boxItemImage}>
                      {Array.from({ length: data.albumImage?.length })
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
                ) : (
                  <div className={styles.galleryAlbumImage}>
                    {data.albumImage &&
                      data.albumImage?.length !== 0 &&
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
                                <img
                                  src={x.img}
                                  className={`img${i}`}
                                  alt={x.img}
                                  id={x.img}
                                  draggable="true"
                                  onDragStart={(event) => drag(event)}
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
            {data.albumImage.length > 0 && (
              <Table
                columns={albumImageColumn}
                dataSource={albumImageList}
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
                  {imageMenuDrawer()}
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
  )
}

export default AlbumData
