import React, { FC, useState, useEffect } from 'react'
import styles from './GalleryView.module.less'
import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  EnterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FilterOutlined,
  FolderOutlined,
  MinusOutlined,
  PlusOutlined,
  TagOutlined,
  UploadOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import {
  Button,
  SimpleDropdown,
  Notification,
  NotificationType,
  FormikInput,
} from '@pabau/ui'
import AlbumData, { ImageProps, AlbumProps } from './AlbumData'
import {
  Breadcrumb,
  Drawer,
  Dropdown,
  Menu,
  Popover,
  Tooltip,
  Modal,
} from 'antd'
import { ReactComponent as Gallery } from '../../assets/images/album.svg'
import { ReactComponent as Calender } from '../../assets/images/calender-item.svg'
import { useMedia } from 'react-use'
import { ReactComponent as Share } from '../../assets/images/image-share.svg'
import { ReactComponent as ImageAlbum } from '../../assets/images/image-album.svg'
import { ReactComponent as ListIcon } from '../../assets/images/list.svg'
import { ReactComponent as GridIcon } from '../../assets/images/grid.svg'

export interface GalleryProps {
  albumList: AlbumProps
  images: ImageProps[]
  onAlbumClick?: (albumId: number) => void
  loading?: boolean
  paginateData: {
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
    currentPage: number
  }
  onAlbumCreate?: (name: string) => void
  onAlbumUpdate?: (data: AlbumProps) => void
  onAlbumDelete?: (data: AlbumProps) => void
}

export const GalleryView: FC<GalleryProps> = ({
  albumList,
  images,
  onAlbumClick,
  loading = false,
  paginateData,
  onAlbumCreate,
  onAlbumUpdate,
  onAlbumDelete,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [data, setData] = useState(albumList)
  const [currentData, setCurrentData] = useState(albumList)
  const [breadcrumbs, setBreadcrumbs] = useState([
    { title: 'Albums', index: -1 },
  ])
  const [showMenu, setShowMenu] = useState(false)
  const [employeeValue, setEmployeeValue] = useState('All')
  const [servicesValue, setServicesValue] = useState('All')
  const [albumView, setAlbumView] = useState(false)
  const [groupView, setGroupView] = useState(false)
  const [albumDrawer, setAlbumDrawer] = useState(false)
  const [filterDrawer, setFilterDrawer] = useState(false)

  const [albumName, setAlbumName] = useState('')
  const [editAlbumId, setEditAlbumId] = useState<number | null>(null)
  const [editAlbumLoading, setEditAlbumLoading] = useState(false)
  const [deleteAlbumId, setDeleteAlbumId] = useState<number | null>(null)
  const [deleteAlbumLoading, setDeleteAlbumLoading] = useState(false)
  const [createAlbumModal, setCreateAlbumModal] = useState(false)
  const [createPopover, setCreatePopover] = useState(false)
  const [createAlbumDrawer, setCreateAlbumDrawer] = useState(false)

  const [selectAll, setSelectAll] = useState(false)
  const [selectedImage, setSelectedImage] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [status, setStatus] = useState(true)
  const [dragAlbumTitle, setDragAlbumTitle] = useState('')
  const [imagesList, setImagesList] = useState(images)
  const [sensitiveImg, setSensitiveImg] = useState([])
  const [deleteAlbumModal, setDeleteAlbumModal] = useState(false)
  const [listView, setListView] = useState(false)

  useEffect(() => {
    setImagesList(images)
  }, [images])

  useEffect(() => {
    setData(albumList)
    setAlbumName('')
    setEditAlbumId(null)
    setDeleteAlbumId(null)
    setCreateAlbumModal(false)
    setDeleteAlbumModal(false)
    setEditAlbumLoading(false)
    setDeleteAlbumLoading(false)
    setCurrentData(albumList)
  }, [albumList])

  const employee = ['will lawsons', 'jessica Winter', 'Jeff Hackley']
  const services = ['abc', 'xyz', 'ert', 'botox']

  const Text = () => <span>{t('galley.view.album.filter.title')}</span>

  const AlbumText = () => (
    <div className={styles.menuItemHeader}>
      <h3>{t('galley.view.album.menu.title')}</h3>
    </div>
  )

  const Content = () => (
    <div className={styles.filterItems}>
      <h5>{t('galley.view.album.employee')}</h5>
      <SimpleDropdown
        value={employeeValue}
        dropdownItems={employee.map((e) => e)}
        onSelected={(value) => setEmployeeValue(value)}
      />
      <h5>{t('galley.view.album.services')}</h5>
      <SimpleDropdown
        value={servicesValue}
        dropdownItems={services.map((e) => e)}
        onSelected={(value) => setServicesValue(value)}
      />
      <p onClick={() => handleClearFilter()}>
        {t('galley.view.album.clear.all')}
      </p>
    </div>
  )

  const ArrowContent = () => (
    <div className={styles.arrowItems}>
      <h5>{t('galley.list.arrow.content.all')}</h5>
      <h5>{t('galley.list.arrow.content.none')}</h5>
    </div>
  )

  const AlbumContent = () => (
    <div className={styles.albumContentBody}>
      <div className={styles.menuItems}>
        <Menu>
          <Menu.Item key="1">
            <div
              className={styles.menuIcon}
              onClick={() => {
                setAlbumView(true)
                setGroupView(false)
              }}
            >
              {albumView ? (
                <CheckOutlined className={styles.active} />
              ) : (
                <CheckOutlined className={styles.inActive} />
              )}
              <div
                className={styles.galleryIcon}
                style={
                  albumView
                    ? { backgroundColor: '#54B2D3' }
                    : { backgroundColor: '#9292A2' }
                }
              >
                <Gallery />
              </div>
              <span>{t('galley.view.album.view.album')}</span>
            </div>
          </Menu.Item>
          <Menu.Item key="2">
            <div
              className={styles.menuIcon}
              onClick={() => {
                setAlbumView(false)
                setGroupView(true)
              }}
            >
              {groupView ? (
                <CheckOutlined className={styles.active} />
              ) : (
                <CheckOutlined className={styles.inActive} />
              )}
              <div
                className={styles.galleryIcon}
                style={
                  groupView
                    ? { backgroundColor: '#54B2D3' }
                    : { backgroundColor: '#9292A2' }
                }
              >
                <Calender />
              </div>
              <span>{t('galley.view.album.view.groupby.date')}</span>
            </div>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )

  const CreateContent = () => (
    <div className={styles.createContent}>
      <div
        className={styles.contentItem}
        onClick={() => {
          setCreateAlbumModal(true)
          setCreatePopover(false)
          setCreateAlbumDrawer(false)
        }}
      >
        <FolderOutlined /> {t('galley.view.album.create.new.album')}
      </div>
      <div className={styles.contentItem}>
        <UploadOutlined /> {t('galley.view.album.create.photo.upload')}
      </div>
    </div>
  )

  const DropdownMenu = () => (
    <Menu className={styles.menuItemList}>
      {currentData?.album?.map((albumValue) => (
        <Menu.Item
          key={albumValue.albumTitle.toString()}
          onClick={() => handleImageMove(albumValue.albumTitle)}
        >
          <ImageAlbum />
          &nbsp;&nbsp;&nbsp;{albumValue.albumTitle}
        </Menu.Item>
      ))}
      <Menu.Item key="New" onClick={() => setCreateAlbumModal((e) => !e)}>
        <PlusOutlined />
        &nbsp;&nbsp;&nbsp;
        <span>{t('galley.view.album.create.album.modal.title')}</span>
      </Menu.Item>
    </Menu>
  )

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false)
      setShowMenu(false)
      setSelectedImage([])
    } else {
      setSelectAll(true)
      setSelectedImage([...currentData.albumImage] as never)
    }
  }

  const handleClearFilter = () => {
    setEmployeeValue(t('galley.list.filter.all.value'))
    setServicesValue(t('galley.list.filter.all.value'))
  }

  const onFolderClick = (index: number) => {
    let temp = [...breadcrumbs]
    temp = [
      ...temp,
      { title: currentData.album[index].albumTitle, index: index },
    ]
    setBreadcrumbs(temp)
    setImagesList([])
    setCurrentData(currentData.album[index])
    onAlbumClick?.(currentData.album[index]?.id)

    const alterImg = currentData.album[index].albumImage.map((x, id) => ({
      id,
      isSensitive: false,
      img: x,
    }))
    setCurrentData({ ...currentData.album[index], albumImage: alterImg as [] })
    saveNudityData({ ...currentData.album[index], albumImage: alterImg })
  }

  const onBreadCrumbsClick = (index) => {
    let newData = { ...data }
    const wantData = breadcrumbs.slice(1, index + 1)
    let tempData = { ...newData }
    for (const x of wantData) {
      tempData = { ...tempData.album[x.index] }
    }
    newData = index ? tempData : newData
    if (currentData?.id !== newData?.id) {
      setImagesList([])
    }
    setCurrentData(newData)
    setBreadcrumbs(breadcrumbs.slice(0, index + 1))
    onAlbumClick?.(newData?.id)

    const alterImg = newData.albumImage.map((x, id) => ({
      id,
      isSensitive: false,
      img: x,
    }))
    setCurrentData({ ...newData, albumImage: alterImg as [] })
    saveNudityData({ ...newData, albumImage: alterImg })
  }

  const handleImageMove = (album) => {
    const moveAlbum = { ...currentData }
    moveAlbum.album.map((albumData) => {
      return (
        albumData.albumTitle === album &&
        selectedImage.map((img: ImageProps) =>
          albumData.albumImage.push(img.img as never)
        )
      )
    })
    setCurrentData(moveAlbum)
    handleDelete()
  }

  const handleDelete = () => {
    const moveAlbum = { ...currentData }
    selectedImage.map((img: ImageProps) => {
      const idx = moveAlbum.albumImage.findIndex((i) => i.img === img.img)
      return moveAlbum.albumImage.splice(idx, 1)
    })
    setCurrentData(moveAlbum)
    setSelectedImage([])
    setShowMenu(false)
    setOpenDeleteModal(false)
  }

  const handleImageStudio = () => {
    console.log('SELECTED IMAGES:', selectedImage)
    console.log('C:', currentData)
    // setShowStudio(() => true)
  }

  const handleDownload = () => {
    selectedImage.map((img: ImageProps) => {
      return imgDownload(img.img)
    })
  }

  const imgDownload = (img) => {
    const link = document.createElement('a')
    link.href = img
    link.download = img
    document.body.append(link)
    link.click()
    link.remove()
  }

  const handleOnChange = async (checked: boolean, img) => {
    const storeImg = [...selectedImage]
    const idx = storeImg.indexOf(img as never)
    checked ? storeImg.push(img as never) : storeImg.splice(idx, 1)
    storeImg.length > 0 ? setShowMenu(true) : setShowMenu(false)
    await setSelectedImage([...storeImg])
  }

  const handleBulkHide = () => {
    const currentSensitive = currentData
    if (status) {
      const showAll = currentSensitive.albumImage.map((item) => {
        let obj = { ...item }
        obj = {
          ...item,
          isSensitive: false,
        }
        return obj
      })
      setCurrentData({ ...currentSensitive, albumImage: showAll })
      setStatus(false)
    } else {
      setCurrentData({ ...currentSensitive, albumImage: sensitiveImg })
      setStatus(true)
    }
  }

  const saveNudityData = async (album) => {
    // setLoading(true)
    // let images = []
    // const checkData = []
    // images = album.albumImage.map(async (item) => {
    //   let obj = { ...item }
    //   let check1: boolean[] = []
    //   const predication = await loadImage(item.img)
    //   check1 = predication.map((item) => {
    //     return checkForNudity(item)
    //   }) as []
    //   if (check1.includes(true)) {
    //     obj = {
    //       ...item,
    //       isSensitive: true,
    //     }
    //     checkData.push(obj as never)
    //   }
    //   return obj
    // }) as never
    // images = await Promise.all(images)
    // setCurrentData({ ...album, albumImage: images })
    // setSensitiveImg(images)
    // setLoading(false)
  }
  // const loadImage = async (imgID) => {
  //   // const img = new Image()
  //   // img.src = imgID
  //   const img = document.querySelector(`#${imgID}`)
  //   // const model = await nsfwjs.load(basePath)
  //   // return model.classify(img as HTMLImageElement)
  //   return img
  // }
  // const checkForNudity = (predictionData) => {
  //   let isSensitive = false
  //   switch (predictionData.className) {
  //     case 'Porn':
  //       isSensitive = predictionData.probability.toFixed(2) > 0.7
  //       return isSensitive
  //     default:
  //       return isSensitive
  //   }
  // }

  const drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id)
    const img = new Image()
    img.src = ev.target.id
    img.width = 200
    img.height = 200
    ev.dataTransfer.setDragImage(img, 10, 10)
  }

  const drop = (ev) => {
    ev.preventDefault()
    const data = ev.dataTransfer.getData('text')
    const albumDataTitle = ev.dataTransfer.getData('albumData')
    if (data !== '') {
      const dropData = { ...currentData }
      const fileData = data.split('/')
      const imagesDrop = imagesList
      if (dropData.albumTitle === 'Album') {
        dropData.album.map((albumData) => {
          if (albumData.albumTitle === dragAlbumTitle) {
            albumData.albumImage.push(data)
            const idx = imagesDrop.indexOf(data)
            imagesDrop.splice(idx, 1)
            Notification(
              NotificationType.success,
              `${
                fileData[fileData.length - 1]
              } has been moved to ${dragAlbumTitle}`
            )
          }
          return 1
        })
        setImagesList(imagesDrop)
        setData(dropData)
        setCurrentData(dropData)
      } else {
        dropData.album.map((albumData) => {
          if (albumData.albumTitle === dragAlbumTitle) {
            albumData.albumImage.push(data)
            dropData.albumImage.map((dropAlbum, i) => {
              if (dropAlbum.img === data) {
                dropData.albumImage.splice(i, 1)
                return Notification(
                  NotificationType.success,
                  `${fileData[fileData.length - 1]} has been moved ${
                    dropData.albumTitle
                  } to ${dragAlbumTitle}`
                )
              }
              return 1
            })
            setCurrentData(dropData)
            // setData(dropData)
            // setChanges((e) => !e)
          }
          return 1
        })
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.querySelector(`#${ev.target.id}`).style.backgroundColor = 'white'
    }
    if (albumDataTitle !== '') {
      const dropData = { ...currentData }
      let transferAlbum = {}
      dropData.album.map((albums) => {
        if (albums.albumTitle === albumDataTitle) {
          transferAlbum = albums
        }
        return 1
      })
      dropData.album.map((albumData) => {
        if (
          albumData.albumTitle === dragAlbumTitle &&
          albumData.albumTitle !== albumDataTitle
        ) {
          albumData.album.push(transferAlbum as AlbumProps)
          dropData.album.map((dropAlbum, i) => {
            if (dropAlbum.albumTitle === albumDataTitle) {
              dropData.album.splice(i, 1)
            }
            return 1
          })
        }
        return 1
      })
      if (dropData.albumTitle === 'Album') {
        setData(dropData)
        if (albumDataTitle !== dragAlbumTitle) {
          Notification(
            NotificationType.success,
            `${albumDataTitle} has been moved into ${dragAlbumTitle}`
          )
        }
      } else {
        if (albumDataTitle !== dragAlbumTitle) {
          Notification(
            NotificationType.success,
            `${dragAlbumTitle} has been moved ${dropData.albumTitle} to ${dragAlbumTitle}`
          )
        }
      }
      setCurrentData(dropData)
      // setChanges((e) => !e)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.querySelector(`#${albumDataTitle}`).style.backgroundColor =
        'white'
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector(`#${ev.target.id}`).style.backgroundColor = 'white'
  }

  const allowDrop = (ev) => {
    ev.preventDefault()
    setDragAlbumTitle(ev.target.id)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector(`#${ev.target.id}`).style.backgroundColor = 'skyblue'
  }

  const dragAlbum = (ev) => {
    ev.dataTransfer.setData('albumData', ev.target.id)
  }

  const changeContentView = (view: boolean) => {
    setListView(view)
  }

  return (
    <div className={styles.mainLayout}>
      <div>
        {breadcrumbs.length <= 1 && !showMenu ? (
          <div className={styles.headerText}>
            <div className={styles.breadcrumbs}>
              <Breadcrumb separator=">">
                {breadcrumbs.map((x, i) => (
                  <Breadcrumb.Item
                    onClick={() => onBreadCrumbsClick(i)}
                    className={styles.breadcrumbsTitle}
                    key={i}
                  >
                    <h3>{x.title}</h3>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
            <div className={styles.rightSide}>
              {!isMobile && (
                <>
                  <Popover
                    placement="bottomRight"
                    title={<Text />}
                    content={<Content />}
                    trigger="click"
                  >
                    <Button type="ghost" className={styles.filterButton}>
                      <FilterOutlined />
                    </Button>
                  </Popover>
                  <Popover
                    placement="bottomRight"
                    title={<AlbumText />}
                    content={<AlbumContent />}
                    trigger="click"
                    className={styles.filterMenu}
                  >
                    <Button type="ghost" className={styles.downloadBtn}>
                      {t('galley.view.album.view.album')} <DownOutlined />
                    </Button>
                  </Popover>
                  {currentData?.id === 0 && (
                    <Popover
                      placement="bottomRight"
                      content={<CreateContent />}
                      trigger="click"
                      visible={createPopover}
                    >
                      <Button
                        type="primary"
                        className={styles.btnCreate}
                        onClick={() => setCreatePopover((e) => !e)}
                      >
                        <PlusOutlined />
                        {t('galley.view.album.create')}
                      </Button>
                    </Popover>
                  )}
                </>
              )}
              {isMobile && (
                <>
                  <Drawer
                    placement={'bottom'}
                    closable={false}
                    onClose={() => setFilterDrawer((e) => !e)}
                    visible={filterDrawer}
                    className={styles.createContentMobile}
                  >
                    <div className={styles.filterContentMobileHeader}>
                      <div className={styles.handler} />
                      <div className={styles.title}>Create</div>
                      <div className={styles.filterContentMobileBody}>
                        <div className={styles.filterItems}>
                          <h5>{t('galley.view.album.employee')}</h5>
                          <SimpleDropdown
                            value={employeeValue}
                            dropdownItems={employee.map((e) => e)}
                            onSelected={(value) => setEmployeeValue(value)}
                            className={styles.dropDownMenu}
                          />
                          <h5>{t('galley.view.album.services')}</h5>
                          <SimpleDropdown
                            value={servicesValue}
                            dropdownItems={services.map((e) => e)}
                            onSelected={(value) => setServicesValue(value)}
                          />
                          <div className={styles.footerButton}>
                            <Button onClick={() => handleClearFilter()}>
                              {t('galley.view.album.clear.all')}
                            </Button>
                            <Button type="primary">
                              {t('galley.view.album.apply')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Drawer>
                  <Button
                    type="ghost"
                    onClick={() => setFilterDrawer(true)}
                    className={styles.filterButton}
                  >
                    <FilterOutlined />
                  </Button>
                  <Button type="ghost" onClick={() => setAlbumDrawer(true)}>
                    {t('galley.view.album.view.album')} <DownOutlined />
                  </Button>
                  <button
                    className={styles.btnCreate}
                    onClick={() => setCreateAlbumDrawer((e) => !e)}
                  >
                    <PlusOutlined /> Create
                  </button>
                  <Drawer
                    placement={'bottom'}
                    closable={false}
                    onClose={() => setAlbumDrawer((e) => !e)}
                    visible={albumDrawer}
                    className={styles.createContentMobile}
                  >
                    <div className={styles.albumContentMobileHeader}>
                      <div className={styles.handler} />
                      <div className={styles.title}>Choose photo view</div>
                      <div className={styles.albumContentMobileBody}>
                        <div className={styles.menuItems}>
                          <Menu>
                            <Menu.Item key="1">
                              <div
                                className={styles.menuIcon}
                                onClick={() => {
                                  setAlbumView(true)
                                  setGroupView(false)
                                }}
                              >
                                {albumView ? (
                                  <CheckOutlined className={styles.active} />
                                ) : (
                                  <CheckOutlined className={styles.inActive} />
                                )}
                                <div
                                  className={styles.galleryIcon}
                                  style={
                                    albumView
                                      ? { backgroundColor: '#54B2D3' }
                                      : { backgroundColor: '#9292A2' }
                                  }
                                >
                                  <Gallery />
                                </div>
                                <span>{t('galley.view.album.view.album')}</span>
                              </div>
                            </Menu.Item>
                            <Menu.Item key="2">
                              <div
                                className={styles.menuIcon}
                                onClick={() => {
                                  setAlbumView(false)
                                  setGroupView(true)
                                }}
                              >
                                {groupView ? (
                                  <CheckOutlined className={styles.active} />
                                ) : (
                                  <CheckOutlined className={styles.inActive} />
                                )}
                                <div
                                  className={styles.galleryIcon}
                                  style={
                                    groupView
                                      ? { backgroundColor: '#54B2D3' }
                                      : { backgroundColor: '#9292A2' }
                                  }
                                >
                                  <Calender />
                                </div>
                                <span>
                                  {t('galley.view.album.view.groupby.date')}
                                </span>
                              </div>
                            </Menu.Item>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </Drawer>
                  <Drawer
                    placement={'bottom'}
                    closable={false}
                    onClose={() => setCreateAlbumDrawer((e) => !e)}
                    visible={createAlbumDrawer}
                    className={styles.createContentMobile}
                  >
                    <CreateContent />
                  </Drawer>
                </>
              )}
              <div className={styles.viewContainer}>
                <div
                  className={styles.viewItem}
                  onClick={() => changeContentView(false)}
                >
                  {!listView ? (
                    <GridIcon style={{ fill: '#54B2D3' }} />
                  ) : (
                    <GridIcon />
                  )}
                </div>
                <div
                  className={styles.viewItem}
                  onClick={() => changeContentView(true)}
                >
                  {listView ? (
                    <ListIcon style={{ fill: '#54B2D3' }} />
                  ) : (
                    <ListIcon />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : showMenu ? (
          <div>
            <div className={styles.headerText}>
              <span>
                <button
                  className={styles.selectButton}
                  onClick={handleSelectAll}
                >
                  <b>
                    <MinusOutlined />
                  </b>
                </button>
                <Popover content={<ArrowContent />} placement="bottom">
                  <CaretDownOutlined style={{ color: '#54B2D3' }} />
                </Popover>
              </span>
              {!isMobile && (
                <div className={styles.rightSide}>
                  <Button type="ghost" onClick={() => handleImageStudio()}>
                    <EyeOutlined />
                    Studio {`(${selectedImage.length})`}
                  </Button>
                  <Button type="ghost" onClick={() => handleDownload()}>
                    <DownloadOutlined />
                    {t('galley.list.album.download.button')}{' '}
                    {`(${selectedImage.length})`}
                  </Button>
                  <Dropdown overlay={<DropdownMenu />} placement="bottomRight">
                    <Button type="ghost">
                      <EnterOutlined />
                      {t('galley.list.album.move.button')}{' '}
                      {`(${selectedImage.length})`}
                    </Button>
                  </Dropdown>
                  <Button className={styles.shareTextBtn} type="ghost">
                    <Share />
                    <span>
                      {t('galley.list.album.share.button')}{' '}
                      {`(${selectedImage.length})`}
                    </span>
                  </Button>
                  <Button type="ghost">
                    <TagOutlined />
                    {t('galley.list.album.tag.button')}{' '}
                    {`(${selectedImage.length})`}
                  </Button>
                  <Button
                    type="ghost"
                    onClick={() => {
                      setOpenDeleteModal(!openDeleteModal)
                    }}
                  >
                    <DeleteOutlined />
                    {t('galley.list.album.delete.button')}{' '}
                    {`(${selectedImage.length})`}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.headerMenu}>
            <div className={styles.breadcrumbs}>
              <Breadcrumb separator=">">
                {breadcrumbs.map((x, i) => (
                  <Breadcrumb.Item
                    onClick={() => onBreadCrumbsClick(i)}
                    className={styles.breadcrumbsTitle}
                    key={i}
                  >
                    {x.title}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
            <div className={styles.headerText}>
              <h2>{breadcrumbs[breadcrumbs.length - 1].title}</h2>
              <div className={styles.rightSide}>
                <button
                  className={styles.btnVisible}
                  onClick={() => handleBulkHide()}
                >
                  {status ? (
                    <Tooltip
                      placement="topLeft"
                      title={t('galley.list.sensitive.show.image.text')}
                    >
                      <EyeOutlined />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      placement="topLeft"
                      title={t('galley.list.sensitive.hide.image.text')}
                    >
                      <EyeInvisibleOutlined />
                    </Tooltip>
                  )}
                </button>
                <button className={styles.btnFilter}>
                  <FilterOutlined />
                </button>
                <Drawer
                  placement={'bottom'}
                  closable={false}
                  onClose={() => setCreateAlbumDrawer((e) => !e)}
                  visible={createAlbumDrawer}
                  className={styles.menuContentMobile}
                >
                  <CreateContent />
                </Drawer>
                {currentData?.id === 0 &&
                  (!isMobile ? (
                    <Popover
                      placement="bottomRight"
                      content={<CreateContent />}
                      trigger="click"
                      visible={createPopover}
                    >
                      <button
                        className={styles.btnCreate}
                        onClick={() => setCreatePopover((e) => !e)}
                      >
                        <PlusOutlined /> {t('galley.view.album.create')}
                      </button>
                    </Popover>
                  ) : (
                    <button
                      className={styles.btnCreate}
                      onClick={() => setCreateAlbumDrawer((e) => !e)}
                    >
                      <PlusOutlined /> {t('galley.view.album.create')}
                    </button>
                  ))}
                <div className={styles.viewContainer}>
                  <div
                    className={styles.viewItem}
                    onClick={() => changeContentView(false)}
                  >
                    {!listView ? (
                      <GridIcon style={{ fill: '#54B2D3' }} />
                    ) : (
                      <GridIcon />
                    )}
                  </div>
                  <div
                    className={styles.viewItem}
                    onClick={() => changeContentView(true)}
                  >
                    {listView ? (
                      <ListIcon style={{ fill: '#54B2D3' }} />
                    ) : (
                      <ListIcon />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{' '}
        <AlbumData
          data={{ ...currentData, albumImage: imagesList || [] }}
          onFolderClick={onFolderClick}
          selectedImage={selectedImage}
          handleOnChange={handleOnChange}
          loading={loading}
          setSelectedImage={setSelectedImage}
          showMenu={showMenu}
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          handleImageMove={handleImageMove}
          drop={drop}
          allowDrop={allowDrop}
          drag={drag}
          handleDownload={handleDownload}
          imgDownload={imgDownload}
          dragAlbum={dragAlbum}
          listView={listView}
          setCurrentData={setCurrentData}
          paginateData={paginateData}
          onAlbumDelete={(id) => {
            const deleteAlbum = data?.album?.find((dt) => dt?.id === id)
            if (deleteAlbum) {
              setDeleteAlbumId(deleteAlbum?.id)
              setDeleteAlbumModal((e) => !e)
            }
          }}
          onAlbumRename={(id) => {
            const editAlbum = data?.album?.find((dt) => dt?.id === id)
            if (editAlbum) {
              setEditAlbumId(editAlbum?.id)
              setAlbumName(editAlbum?.albumTitle)
              setCreateAlbumModal((e) => !e)
            }
          }}
        />
      </div>

      <Modal
        centered
        onCancel={() => {
          setAlbumName('')
          setEditAlbumId(null)
          setCreateAlbumModal((e) => !e)
        }}
        onOk={() => {
          if (editAlbumId) {
            const editedAlbum = data?.album?.find(
              (el) => el?.id === editAlbumId
            )
            onAlbumUpdate?.({
              ...editedAlbum,
              albumTitle: albumName,
            } as AlbumProps)
          } else {
            onAlbumCreate?.(albumName)
          }
          setEditAlbumLoading((e) => !e)
        }}
        title={
          editAlbumId
            ? t('galley.view.album.edit.album.modal.title')
            : t('galley.view.album.create.album.modal.title')
        }
        visible={createAlbumModal}
        okText={
          editAlbumId
            ? t('galley.view.album.edit.album.modal.button')
            : t('galley.view.album.create.album.modal.button')
        }
        okButtonProps={{
          disabled: !albumName,
        }}
        confirmLoading={editAlbumLoading}
      >
        <div className={styles.modalContent}>
          <label>{t('galley.view.album.create.album.name')}</label>
          <FormikInput
            autoFocus
            name="name"
            placeholder={t('galley.view.album.create.album.placeholder')}
            value={albumName}
            onPressEnter={() => {
              if (editAlbumId) {
                const editedAlbum = data?.album?.find(
                  (el) => el?.id === editAlbumId
                )
                onAlbumUpdate?.({
                  ...editedAlbum,
                  albumTitle: albumName,
                } as AlbumProps)
              } else {
                onAlbumCreate?.(albumName)
              }
            }}
            onChange={(e) => setAlbumName(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        centered={true}
        onCancel={() => setOpenDeleteModal(false)}
        onOk={handleDelete}
        visible={openDeleteModal}
        title={t('galley.list.view.delete.modal.title')}
        cancelText={t('common-label-cancel')}
        okText={t('galley.list.view.delete.ok.button')}
      >
        <div>
          <p>
            {selectedImage.length > 0 ? selectedImage.length : 1}{' '}
            {`item will be
            deleted forever and you won't be able to restore them.`}
          </p>
        </div>
      </Modal>

      <Modal
        centered={true}
        onCancel={() => {
          setDeleteAlbumId(null)
          setDeleteAlbumModal(false)
        }}
        onOk={() => {
          const deleteAlbum = data?.album?.find(
            (el) => el?.id === deleteAlbumId
          )
          if (deleteAlbum) {
            onAlbumDelete?.(deleteAlbum)
            setDeleteAlbumLoading((e) => !e)
          }
        }}
        visible={deleteAlbumModal}
        title={t('galley.list.view.delete.modal.title')}
        cancelText={t('common-label-cancel')}
        okText={t('galley.list.view.delete.ok.button')}
        confirmLoading={deleteAlbumLoading}
      >
        <div>
          <p>
            {`${data?.album?.find((el) => el?.id === deleteAlbumId)?.albumTitle}
            album will be deleted forever and you won't be able to restore
            them`}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default GalleryView
