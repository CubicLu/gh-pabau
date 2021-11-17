import React, { FC, useState, useEffect } from 'react'
import styles from './GalleryView.module.less'
import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  // DownOutlined,
  EnterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  // FilterOutlined,
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
  BasicModal,
  CamUploaderModal,
  UploadingImageProps,
  AlbumData,
  ImageProps,
  AlbumProps,
} from '@pabau/ui'
import {
  Breadcrumb,
  Drawer,
  Dropdown,
  Menu,
  Popover,
  Tooltip,
  Modal,
  Input,
} from 'antd'
import { ReactComponent as Gallery } from '../../assets/images/album.svg'
import { ReactComponent as Calender } from '../../assets/images/calender-item.svg'
import { useMedia } from 'react-use'
import { ReactComponent as Share } from '../../assets/images/image-share.svg'
import { ReactComponent as ImageAlbum } from '../../assets/images/image-album.svg'
import { ReactComponent as ListIcon } from '../../assets/images/list.svg'
import { ReactComponent as GridIcon } from '../../assets/images/grid.svg'

const albumFinder = (albums, albumId) => {
  const album = albums?.find((el) => {
    if (el?.id === albumId) {
      return el
    } else if (el?.album) albumFinder?.(el?.album, albumId)
    return null
  })
  return album
}

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
  onAlbumCreate?: (name: string, moveImages?: ImageProps[]) => void
  albumCreateLoading?: boolean
  onAlbumUpdate?: (data: AlbumProps) => void
  albumUpdateLoading?: boolean
  onAlbumDelete?: (data: AlbumProps) => void
  openImageStudio?: (album: number, image: number) => void
  albumDeleteLoading?: boolean

  uploadingImages: UploadingImageProps[]
  setUploadingImages: (data: UploadingImageProps[]) => void
  onImageUpload?: (data: UploadingImageProps) => void
  onImageRemove?: (imageId: number[]) => void
  onUploadCancel?: (data: UploadingImageProps) => void
  imagesDeleteLoading?: boolean
  singleImgDelLoading?: boolean

  onImagesMove?: (album, images) => void
}

export const GalleryView: FC<GalleryProps> = ({
  albumList,
  images,
  onAlbumClick,
  loading = false,
  paginateData,
  onAlbumCreate,
  albumCreateLoading,
  onAlbumUpdate,
  albumUpdateLoading,
  onAlbumDelete,
  openImageStudio,
  albumDeleteLoading,
  uploadingImages,
  setUploadingImages,
  onImageUpload,
  onImageRemove,
  onUploadCancel,
  imagesDeleteLoading,
  singleImgDelLoading,
  onImagesMove,
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
  const [deleteAlbumId, setDeleteAlbumId] = useState<number | null>(null)
  const [createAlbumModal, setCreateAlbumModal] = useState(false)
  const [createPopover, setCreatePopover] = useState(false)
  const [createAlbumDrawer, setCreateAlbumDrawer] = useState(false)

  const [selectAll, setSelectAll] = useState(false)
  const [selectedImages, setSelectedImages] = useState<ImageProps[]>([])
  const [singleImageMoveId, setSingleImageMoveId] = useState<number>()
  const [imageDeleteModal, setImageDeleteModal] = useState(false)
  const [status, setStatus] = useState(true)
  const [imagesList, setImagesList] = useState(images)
  const [sensitiveImg, setSensitiveImg] = useState([])
  const [deleteAlbumModal, setDeleteAlbumModal] = useState(false)
  const [listView, setListView] = useState(false)

  const [uploadModal, setUploadModal] = useState(false)

  useEffect(() => {
    setImagesList(images)
    setShowMenu(false)
    setSelectedImages([])
    setImageDeleteModal(false)
  }, [images])

  useEffect(() => {
    setData(albumList)
    setAlbumName('')
    setEditAlbumId(null)
    setDeleteAlbumId(null)
    setCreateAlbumModal(false)
    setDeleteAlbumModal(false)
    if (!currentData || currentData?.id === 0) {
      setCurrentData(albumList)
    } else {
      const currAlbum = albumFinder(albumList?.album, currentData?.id)
      if (currAlbum) {
        setCurrentData(currAlbum)
      }
    }
  }, [albumList, currentData])

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
      {currentData?.id === 0 && (
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
      )}
      <div
        className={styles.contentItem}
        onClick={() => {
          setUploadModal((e) => !e)
          setCreateAlbumDrawer(false)
        }}
      >
        <UploadOutlined /> {t('galley.view.album.create.photo.upload')}
      </div>
    </div>
  )

  const AlbumDropdownMenu = () => {
    const filtered: { id: number; name: string }[] = []
    const iterateToAlbms = (albums) => {
      for (const el of albums) {
        if (el?.id !== currentData?.id) {
          filtered.push({
            id: el?.id,
            name: el?.albumTitle,
          })
          if (el?.album?.length) iterateToAlbms(el?.album)
        }
      }
    }
    iterateToAlbms(data?.album)
    if (currentData?.id !== 0)
      filtered.unshift({ id: 0, name: 'Uncategorized' })

    return (
      <Menu className={styles.menuItemList}>
        {filtered?.map((album) => (
          <Menu.Item
            key={album.id.toString()}
            onClick={() =>
              onImagesMove?.(
                album.id,
                selectedImages?.map((el) => el?.id)
              )
            }
          >
            <ImageAlbum />
            <div>{album.name}</div>
          </Menu.Item>
        ))}
        <Menu.Item key="New" onClick={() => setCreateAlbumModal((e) => !e)}>
          <PlusOutlined />
          <div>{t('galley.view.album.create.album.modal.title')}</div>
        </Menu.Item>
      </Menu>
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false)
      setShowMenu(false)
      setSelectedImages([])
    } else {
      setSelectAll(true)
      setSelectedImages([...currentData.albumImage])
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
    setSelectedImages([])
    setShowMenu(false)
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

  const handleImagesDelete = () => {
    if (selectedImages?.length > 0) {
      const deleteImages = selectedImages?.map((el) => el?.id || 0)
      onImageRemove?.(deleteImages)
    }
  }

  const handleDownload = () => {
    selectedImages.map((img: ImageProps) => {
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

  const handleImageSelection = async (checked: boolean, img) => {
    const storeImg = [...selectedImages]
    const idx = storeImg.indexOf(img as never)
    checked ? storeImg.push(img as never) : storeImg.splice(idx, 1)
    storeImg.length > 0 ? setShowMenu(true) : setShowMenu(false)
    await setSelectedImages([...storeImg])
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

  const drop = (ev) => {
    ev.preventDefault()
    if (ev.dataTransfer.getData('imageId')) {
      const tarAlbumId = Number(ev.target.id.replace('tar', ''))
      const draggedImageId = Number(ev.dataTransfer.getData('imageId'))
      onImagesMove?.(tarAlbumId, [draggedImageId])
    }
    if (ev.dataTransfer.getData('albumId')) {
      // This block will be used when album can be dragged and dropped in other albums
      const tarAlbumId = Number(ev.target.id.replace('tar', ''))
      const draggedAlbumId = Number(ev.dataTransfer.getData('albumId'))
      document
        ?.querySelector(`#${ev.target.id}`)
        ?.classList.remove('dropEffect')
    }
  }

  const allowDrop = (ev) => {
    ev.preventDefault()
    document?.querySelector(`#${ev.target.id}`)?.classList.add('dropEffect')
  }

  const dragImage = (ev) => {
    ev.dataTransfer.setData('imageId', ev.target.id)
  }

  const dragAlbum = (ev) => {
    ev.dataTransfer.setData('albumId', ev.target.id)
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
                  {/* <Popover
                    placement="bottomRight"
                    title={<Text />}
                    content={<Content />}
                    trigger="click"
                  >
                    <Button type="ghost" className={styles.filterButton}>
                      <FilterOutlined />
                    </Button>
                  </Popover> */}
                  {/* <Popover
                    placement="bottomRight"
                    title={<AlbumText />}
                    content={<AlbumContent />}
                    trigger="click"
                    className={styles.filterMenu}
                  >
                    <Button type="ghost" className={styles.downloadBtn}>
                      {t('galley.view.album.view.album')} <DownOutlined />
                    </Button>
                  </Popover> */}

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
                      onBlur={() => setCreatePopover(() => false)}
                    >
                      <PlusOutlined />
                      {t('galley.view.album.create')}
                    </Button>
                  </Popover>
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
                  {/* <Button
                    type="ghost"
                    onClick={() => setFilterDrawer(true)}
                    className={styles.filterButton}
                  >
                    <FilterOutlined />
                  </Button> */}
                  {/* <Button type="ghost" onClick={() => setAlbumDrawer(true)}>
                    {t('galley.view.album.view.album')} <DownOutlined />
                  </Button> */}
                  <Button
                    type="primary"
                    className={styles.btnCreate}
                    onClick={() => setCreateAlbumDrawer((e) => !e)}
                  >
                    <PlusOutlined />
                    {t('galley.view.album.create')}
                  </Button>
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
                  onClick={() => setListView(false)}
                >
                  {!listView ? (
                    <GridIcon style={{ fill: '#54B2D3' }} />
                  ) : (
                    <GridIcon />
                  )}
                </div>
                <div
                  className={styles.viewItem}
                  onClick={() => setListView(true)}
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
                  <Button type="ghost" onClick={() => handleDownload()}>
                    <DownloadOutlined />
                    {t('galley.list.album.download.button')}{' '}
                    {`(${selectedImages.length})`}
                  </Button>
                  <Dropdown
                    overlay={<AlbumDropdownMenu />}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button type="ghost" className={styles.albumDropdownBtn}>
                      <EnterOutlined />
                      {t('galley.list.album.move.button')}{' '}
                      {`(${selectedImages.length})`}
                    </Button>
                  </Dropdown>
                  <Button className={styles.shareTextBtn} type="ghost">
                    <Share />
                    <span>
                      {t('galley.list.album.share.button')}{' '}
                      {`(${selectedImages.length})`}
                    </span>
                  </Button>
                  <Button type="ghost">
                    <TagOutlined />
                    {t('galley.list.album.tag.button')}{' '}
                    {`(${selectedImages.length})`}
                  </Button>
                  <Button
                    type="ghost"
                    onClick={() => {
                      setImageDeleteModal(!imageDeleteModal)
                    }}
                  >
                    <DeleteOutlined />
                    {t('galley.list.album.delete.button')}{' '}
                    {`(${selectedImages.length})`}
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
                {/* <button className={styles.btnFilter}>
                  <FilterOutlined />
                </button> */}
                <Drawer
                  placement={'bottom'}
                  closable={false}
                  onClose={() => setCreateAlbumDrawer((e) => !e)}
                  visible={createAlbumDrawer}
                  className={styles.menuContentMobile}
                >
                  <CreateContent />
                </Drawer>
                {!isMobile ? (
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
                      onBlur={() => setCreatePopover(() => false)}
                    >
                      <PlusOutlined />
                      {t('galley.view.album.create')}
                    </Button>
                  </Popover>
                ) : (
                  <Button
                    type="primary"
                    className={styles.btnCreate}
                    onClick={() => setCreateAlbumDrawer((e) => !e)}
                  >
                    <PlusOutlined />
                    {t('galley.view.album.create')}
                  </Button>
                )}
                <div className={styles.viewContainer}>
                  <div
                    className={styles.viewItem}
                    onClick={() => setListView(false)}
                  >
                    {!listView ? (
                      <GridIcon style={{ fill: '#54B2D3' }} />
                    ) : (
                      <GridIcon />
                    )}
                  </div>
                  <div
                    className={styles.viewItem}
                    onClick={() => setListView(true)}
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
          allAlbums={data?.album}
          onFolderClick={onFolderClick}
          selectedImages={selectedImages}
          handleImageSelection={handleImageSelection}
          loading={loading}
          setSelectedImages={setSelectedImages}
          showMenu={showMenu}
          setOpenDeleteModal={setImageDeleteModal}
          openDeleteModal={imageDeleteModal}
          handleImageMove={(album, images) => onImagesMove?.(album, images)}
          drop={drop}
          allowDrop={allowDrop}
          dragImage={dragImage}
          dragAlbum={dragAlbum}
          handleDownload={handleDownload}
          imgDownload={imgDownload}
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
          openImageStudio={openImageStudio}
          onImageDelete={(imageId: number) => {
            if (imageId !== 0) {
              onImageRemove?.([imageId])
            } else if (selectedImages?.length > 0) {
              const deleteImages = selectedImages?.map((el) => el?.id || 0)
              onImageRemove?.(deleteImages)
            }
          }}
          singleImgDelLoading={singleImgDelLoading}
          onSingleImageMove={(album, image, isCreateAlbum) => {
            if (image) {
              if ((album || album === 0) && !isCreateAlbum) {
                onImagesMove?.(album, [image])
              }
              if (!album && isCreateAlbum) {
                setAlbumName('')
                setSingleImageMoveId(image)
                setCreateAlbumModal(() => true)
              }
            } else if (selectedImages?.length > 0 && (album || album === 0)) {
              if ((album || album === 0) && !isCreateAlbum) {
                onImagesMove?.(
                  album,
                  selectedImages?.map((el) => el?.id)
                )
              }
              if (!album && isCreateAlbum) {
                setAlbumName('')
                setCreateAlbumModal(() => true)
              }
            }
          }}
        />
      </div>

      <CamUploaderModal
        albumId={currentData?.id || 0}
        uploadingImages={uploadingImages}
        visible={uploadModal}
        setUploadingImages={setUploadingImages}
        onClose={(done?: boolean) => {
          setUploadModal((e) => !e)
          if (done) {
            setUploadingImages?.([])
          }
        }}
        uploadImage={onImageUpload}
        removeImage={(imageId: number) => onImageRemove?.([imageId])}
        onCancelUpload={onUploadCancel}
      />

      <BasicModal
        modalWidth={600}
        onCancel={() => {
          setAlbumName('')
          setEditAlbumId(null)
          setCreateAlbumModal((e) => !e)
        }}
        onOk={() => {
          if (albumName) {
            if (editAlbumId) {
              const editedAlbum = data?.album?.find(
                (el) => el?.id === editAlbumId
              )
              onAlbumUpdate?.({
                ...editedAlbum,
                albumTitle: albumName,
              } as AlbumProps)
            } else {
              if (singleImageMoveId) {
                const img = imagesList?.find(
                  (el) => el?.id === singleImageMoveId
                )
                if (img) onAlbumCreate?.(albumName, [img])
              } else {
                onAlbumCreate?.(albumName, selectedImages)
              }
            }
          }
        }}
        title={
          editAlbumId
            ? t('galley.view.album.edit.album.modal.title')
            : t('galley.view.album.create.album.modal.title')
        }
        visible={createAlbumModal}
        newButtonText={
          editAlbumId
            ? t('galley.view.album.edit.album.modal.button')
            : t('galley.view.album.create.album.modal.button')
        }
        loading={albumCreateLoading || albumUpdateLoading}
      >
        <div className={styles.modalContent}>
          <label>{t('galley.view.album.create.album.name')}</label>
          <Input
            autoFocus
            name="name"
            placeholder={t('galley.view.album.create.album.placeholder')}
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
        </div>
      </BasicModal>

      <Modal
        centered={true}
        onCancel={() => {
          setImageDeleteModal(false)
        }}
        onOk={handleImagesDelete}
        visible={imageDeleteModal}
        title={t('galley.list.view.delete.modal.title')}
        cancelText={t('common-label-cancel')}
        okText={t('galley.list.view.delete.ok.button')}
        confirmLoading={imagesDeleteLoading}
      >
        <div>
          <p>
            {selectedImages.length > 0 ? selectedImages.length : 1}{' '}
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
          if (deleteAlbum) onAlbumDelete?.(deleteAlbum)
        }}
        visible={deleteAlbumModal}
        title={t('galley.list.view.delete.modal.title')}
        cancelText={t('common-label-cancel')}
        okText={t('galley.list.view.delete.ok.button')}
        confirmLoading={albumDeleteLoading}
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
