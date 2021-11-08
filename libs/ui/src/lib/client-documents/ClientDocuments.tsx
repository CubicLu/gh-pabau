import React, { FC, useEffect, useState, useCallback } from 'react'
import styles from './ClientDocuments.module.less'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { Drawer, Popover, Breadcrumb, Menu, Dropdown, Modal, Input } from 'antd'
import {
  FolderOutlined,
  PlusOutlined,
  UploadOutlined,
  MinusOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EnterOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { ReactComponent as ListIcon } from '../../assets/images/icons/list.svg'
import { ReactComponent as GridIcon } from '../../assets/images/icons/grid.svg'
import empty from '../../assets/images/empty-doc.png'
import {
  Button,
  FormikInput,
  Notification,
  NotificationType,
  BasicModal,
} from '@pabau/ui'
import FolderData from './FolderData'
import { ReactComponent as Share } from '../../assets/images/share-folder.svg'
import dayjs from 'dayjs'

const folderFinder = (folders, folderId) => {
  const folder = folders?.find((el) => {
    if (el?.id === folderId) {
      return el
    } else if (el?.folder) folderFinder?.(el?.folder, folderId)
    return null
  })
  return folder
}

interface OpenByProps {
  firstName: string
  lastName: string
}

export interface FolderContentProps {
  id: number
  folderData: string
  dateTime: number
  sharedWith?: OpenByProps[]
}

export interface FolderProps {
  folder: FolderProps[]
  id: number
  folderTitle: string
  modifiedDate?: string
  contentCount?: number
  folderContent?: FolderContentProps[]
}

export interface SelectProps {
  folderData?: FolderProps[]
  folderTitle?: string
}

export interface ClientDocumentsProps {
  folderList: FolderProps
  folderDocuments: FolderContentProps[]
  onFolderClick?: (folderId: number) => void
  loading?: boolean
  paginateData?: {
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
    currentPage: number
  }
  onFolderCreate?: (name: string, moveImages?: FolderContentProps[]) => void
  folderCreateLoading?: boolean
  onFolderUpdate?: (data: FolderProps) => void
  folderUpdateLoading?: boolean
  onFolderDelete?: (data: FolderProps) => void
  folderDeleteLoading?: boolean
}

export const ClientDocuments: FC<ClientDocumentsProps> = ({
  folderList,
  folderDocuments,
  onFolderClick,
  loading = false,
  paginateData,
  onFolderCreate,
  folderCreateLoading = false,
  onFolderUpdate,
  folderUpdateLoading = false,
  onFolderDelete,
  folderDeleteLoading = false,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [data, setData] = useState(folderList)
  const [currentData, setCurrentData] = useState(folderList)
  const [folderContent, setFolderContent] = useState(folderDocuments)
  const [singleDocumentMoveId, setSingleImageMoveId] = useState<number>()
  const [breadcrumbs, setBreadcrumbs] = useState([
    { title: 'Folders', index: -1 },
  ])
  const [createFolderDrawer, setCreateFolderDrawer] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [createFolderModal, setCreateFolderModal] = useState(false)
  const [editFolderId, setEditFolderId] = useState<number | null>(null)
  const [deleteFolderId, setDeleteFolderId] = useState<number | null>(null)
  const [deleteFolderModal, setDeleteFolderModal] = useState(false)

  const [listView, setListView] = useState(false)
  const [checkedData, setCheckedData] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [recentData, setRecentData] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState([])
  const [tempData, setTempData] = useState([])
  const [recentActionData, setRecentActionData] = useState([] as SelectProps[])
  const [visibleCreatePopover, setVisibleCreatePopover] = useState(false)

  useEffect(() => {
    setFolderContent(folderDocuments)
    setShowMenu(false)
    setSelectedDocuments([])
    // setImageDeleteModal(false)
  }, [folderDocuments])

  useEffect(() => {
    setData(folderList)
    setFolderName('')
    setEditFolderId(null)
    setDeleteFolderId(null)
    setCreateFolderModal(false)
    setDeleteFolderModal(false)
    if (!currentData || currentData?.id === 0) {
      setCurrentData(folderList)
    } else {
      const currAlbum = folderFinder(folderList?.folder, currentData?.id)
      if (currAlbum) {
        setCurrentData(currAlbum)
      }
    }
  }, [folderList, currentData])

  const onDocumentFolderClick = useCallback(
    (id: number) => {
      const index = currentData?.folder?.findIndex((el) => el?.id === id)
      let temp = [...breadcrumbs]
      temp = [
        ...temp,
        { title: currentData.folder[index].folderTitle, index: index },
      ]
      setBreadcrumbs(temp)
      setCurrentData(currentData.folder[index])
      onFolderClick?.(currentData.folder[index]?.id)

      setSelectedDocuments([])
      setCheckedData([])
    },
    [breadcrumbs, currentData.folder, onFolderClick]
  )

  const onBreadCrumbsClick = (index) => {
    let newData = { ...data }
    const wantData = breadcrumbs.slice(1, index + 1)
    let tempData = { ...newData }

    for (const x of wantData) {
      tempData = { ...tempData.folder[x.index] }
    }
    newData = index ? tempData : newData
    setCurrentData(newData)
    setBreadcrumbs(breadcrumbs.slice(0, index + 1))
  }

  const CreateContent = () => (
    <div className={styles.createContent}>
      {currentData?.id === 0 && (
        <div
          className={styles.contentItem}
          style={{ padding: '10px', cursor: 'pointer' }}
          onClick={() => {
            setCreateFolderModal(() => true)
            setVisibleCreatePopover(() => false)
            setCreateFolderDrawer(() => false)
          }}
        >
          <FolderOutlined /> New Folder
        </div>
      )}
      <div
        className={styles.contentItem}
        style={{ padding: '10px', cursor: 'pointer' }}
      >
        <UploadOutlined /> File Upload
      </div>
    </div>
  )

  const menu = (
    <Menu className={styles.menuItemList}>
      {currentData?.folder?.map((folderValue) => (
        <Menu.Item
          key={folderValue.folderTitle.toString()}
          onClick={() =>
            checkedData.length > 0
              ? handleRecentMove(folderValue)
              : handleMoveData(folderValue)
          }
        >
          <FolderOutlined /> {folderValue.folderTitle}
        </Menu.Item>
      ))}
      <Menu.Item key="New" onClick={() => setCreateFolderModal((e) => !e)}>
        <PlusOutlined />
        <span>New folder</span>
      </Menu.Item>
    </Menu>
  )

  const handleRecentMove = (x) => {
    const val = currentData
    checkedData.map((recent) => {
      val.folder.map((folder, index) => {
        if (x.folderTitle === folder.folderTitle) {
          folder.folderContent?.push({
            id: index,
            folderData: recent,
            dateTime: dayjs().format('DD.MM.YYYY') as string,
          } as never)
        }
        return 1
      })
      return 1
    })
    setData(val)
    setCurrentData(val)

    handleDeleteRecent()
  }

  const handleMoveData = (x) => {
    const moveData = currentData
    moveData.folderContent?.map((val) => {
      if (selectedDocuments.includes(val.folderData as never)) {
        moveData.folder.map((folderValue) => {
          return (
            folderValue.folderTitle === x.folderTitle &&
            folderValue.folderContent?.push(val)
          )
        })
      }
      return 1
    })
    setCurrentData(moveData)
    handlefolderDataDelete()
    Notification(
      NotificationType.success,
      `${selectedDocuments.length} items has been moved from ${moveData.folderTitle} to ${x.folderTitle}`
    )
    setShowMenu(false)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false)
      setShowMenu(false)
      setCheckedData([])
    } else {
      setSelectAll(true)
      setCheckedData([...recentData] as never)
    }
  }

  const handleSelectAllData = () => {
    if (selectAll) {
      setSelectAll(false)
      setShowMenu(false)
      setSelectedDocuments([])
    } else {
      setSelectAll(true)
      const x = []
      currentData.folderContent?.map((folderValue) => {
        return x.push(folderValue.folderData as never)
      })
      setSelectedDocuments(x as never)
    }
  }

  const handlefolderDataDelete = () => {
    let deleteData = currentData
    const updateFolderContent = []
    deleteData.folderContent?.map((x) => {
      if (!selectedDocuments.includes(x.folderData as never)) {
        updateFolderContent.push({
          ...x,
        } as never)
      }
      return 1
    })
    deleteData = {
      ...deleteData,
      folderContent: updateFolderContent,
    }
    setCurrentData(deleteData)
    setSelectedDocuments([])
    setShowMenu(false)
  }

  const handleDelete = useCallback(() => {
    let deleteData = currentData
    const updateFolderContent = []
    deleteData.folderContent?.map((x) => {
      if (!tempData.includes(x.folderData as never)) {
        updateFolderContent.push({
          ...x,
        } as never)
      }
      return 1
    })
    deleteData = {
      ...deleteData,
      folderContent: updateFolderContent,
    }
    setCurrentData(deleteData)
    setTempData([])
  }, [currentData, tempData])

  const handleDeleteRecent = () => {
    const val = { ...currentData }
    checkedData.map((recent) => {
      val.folderContent?.map((x, index) => {
        if (recent === x.folderData) {
          val.folderContent?.splice(index, 1)
        }
        return 1
      })
      return 1
    })

    setCheckedData([])
    setRecentActionData([])
    setShowMenu(false)
    setCurrentData(val)
  }

  const handleBulkDownload = () => selectedDocuments.map((x) => dataDownload(x))

  const dataDownload = (val) => {
    const link = document.createElement('a')
    link.href = val
    link.download = val
    document.body.append(link)
    link.target = '_blank'
    link.click()
    link.remove()
  }
  return (
    <div>
      {!showMenu && (
        <div className={styles.headerText}>
          <div className={styles.breadcrumbs}>
            {breadcrumbs.length <= 1 ? (
              <h3>Folders</h3>
            ) : (
              <>
                <Breadcrumb separator=">">
                  {breadcrumbs.slice(0, -1).map((x, i) => {
                    return (
                      <p
                        onClick={() => onBreadCrumbsClick(i)}
                        className={styles.breadcrumbsTitle}
                        key={i}
                      >
                        <h4 style={{ color: '#9292A3' }}>
                          {x.title}{' '}
                          <span style={{ margin: '0 5px 0 5px' }}>{'>'}</span>{' '}
                        </h4>
                      </p>
                    )
                  })}
                  <p>
                    <h4 style={{ color: '#CFCFD7' }}>
                      {breadcrumbs[breadcrumbs.length - 1].title}
                    </h4>
                  </p>
                </Breadcrumb>
                <h4>{breadcrumbs[breadcrumbs.length - 1].title}</h4>
              </>
            )}
          </div>
          <div className={styles.rightSide}>
            {!isMobile ? (
              <Popover
                placement="bottomRight"
                content={<CreateContent />}
                trigger="click"
                visible={visibleCreatePopover}
              >
                <button
                  className={styles.btnCreate}
                  onClick={() => setVisibleCreatePopover((e) => !e)}
                  onBlur={() => setVisibleCreatePopover(() => false)}
                >
                  <PlusOutlined /> Create
                </button>
              </Popover>
            ) : (
              <>
                <button
                  className={styles.btnCreate}
                  onClick={() => setCreateFolderDrawer((e) => !e)}
                >
                  <PlusOutlined /> Create
                </button>
                <Drawer
                  placement={'bottom'}
                  closable={true}
                  onClose={() => setCreateFolderDrawer((e) => !e)}
                  visible={createFolderDrawer}
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
      )}
      {showMenu && checkedData.length > 0 && (
        <div>
          <div className={styles.headerText}>
            <button
              className={styles.selectButton}
              onClick={() => handleSelectAll()}
            >
              <b>
                <MinusOutlined />
              </b>
            </button>
            {!isMobile && (
              <div className={styles.rightSide}>
                <Button type="ghost">
                  <DownloadOutlined />
                  Download {`(${checkedData.length})`}
                </Button>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button type="ghost">
                    <EnterOutlined />
                    Move to {`(${checkedData.length})`}
                  </Button>
                </Dropdown>
                <Button className={styles.shareTextBtn} type="ghost">
                  <span>
                    <Share /> Share {`(${checkedData.length})`}
                  </span>
                </Button>
                <Button type="ghost" onClick={() => setDeleteFolderModal(true)}>
                  <DeleteOutlined />
                  Delete
                  {`(${checkedData.length})`}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {showMenu && selectedDocuments.length > 0 && (
        <div>
          <div className={styles.headerText}>
            <button
              className={styles.selectButton}
              onClick={() => handleSelectAllData()}
            >
              <b>
                <MinusOutlined />
              </b>
            </button>
            {!isMobile && (
              <div className={styles.rightSide}>
                <Button type="ghost" onClick={() => handleBulkDownload()}>
                  <DownloadOutlined />
                  Download {`(${selectedDocuments.length})`}
                </Button>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button type="ghost">
                    <EnterOutlined />
                    Move to {`(${selectedDocuments.length})`}
                  </Button>
                </Dropdown>
                <Button className={styles.shareTextBtn} type="ghost">
                  <span>
                    <Share /> Share {`(${selectedDocuments.length})`}
                  </span>
                </Button>
                <Button type="ghost" onClick={() => setDeleteFolderModal(true)}>
                  <DeleteOutlined />
                  Delete
                  {`(${selectedDocuments.length})`}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {data.folder.length === 0 && data.contentCount === 0 ? (
        <div className={styles.emptyDocument}>
          <img src={empty} alt={'empty'} />
          <div className={styles.emptyDocumentTitle}>
            <h1>Seems empty here</h1>
            <p>Upload your first file</p>
          </div>
          <div className={styles.emptyDocumentButton}>
            <Button type="primary">
              <PlusOutlined /> Create
            </Button>
          </div>
        </div>
      ) : (
        <FolderData
          data={{ ...currentData, ...folderContent }}
          onFolderClick={onDocumentFolderClick}
          listView={listView}
          setCheckedData={setCheckedData}
          checkedData={checkedData}
          setShowMenu={setShowMenu}
          setRecentData={setRecentData}
          setSelectedDocuments={setSelectedDocuments}
          selectedDocuments={selectedDocuments}
          setTempData={setTempData}
          tempData={tempData}
          handleDelete={handleDelete}
          setRecentActionData={setRecentActionData}
          recentActionData={recentActionData as []}
          setCurrentData={setCurrentData}
          onFolderRename={(id) => {
            const editFolder = currentData?.folder?.find((dt) => dt?.id === id)
            if (editFolder) {
              setEditFolderId(editFolder?.id)
              setFolderName(editFolder?.folderTitle)
              setCreateFolderModal((e) => !e)
            }
          }}
          onFolderDelete={(id) => {
            const delFolder = currentData?.folder?.find((dt) => dt?.id === id)
            if (delFolder) {
              setDeleteFolderId(delFolder?.id)
              setDeleteFolderModal((e) => !e)
            }
          }}
        />
      )}
      {isMobile && showMenu && (
        <div className={styles.bottomBar}>
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<DownloadOutlined />}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<EnterOutlined />}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<Share />}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<EditOutlined />}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<DeleteOutlined />}
            style={{ color: 'red' }}
          />
        </div>
      )}

      <BasicModal
        modalWidth={600}
        onCancel={() => {
          setFolderName('')
          setEditFolderId(null)
          setCreateFolderModal((e) => !e)
        }}
        onOk={() => {
          if (folderName) {
            if (editFolderId) {
              const editedFolder = data?.folder?.find(
                (el) => el?.id === editFolderId
              )
              onFolderUpdate?.({
                ...editedFolder,
                folderTitle: folderName,
              } as FolderProps)
            } else {
              if (singleDocumentMoveId) {
                const doc = folderContent?.find(
                  (el) => el?.id === singleDocumentMoveId
                )
                if (doc) onFolderCreate?.(folderName, [doc])
              } else {
                onFolderCreate?.(folderName, selectedDocuments)
              }
            }
          }
        }}
        title={editFolderId ? 'Edit Folder' : 'Create Folder'}
        visible={createFolderModal}
        newButtonText={editFolderId ? 'Update' : 'Create'}
        loading={folderCreateLoading || folderUpdateLoading}
      >
        <div className={styles.modalContent}>
          <label>Name</label>
          <Input
            autoFocus
            name="name"
            placeholder={'Create new folder'}
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
      </BasicModal>

      <Modal
        title={'Delete forever?'}
        onCancel={() => {
          setDeleteFolderId(null)
          setDeleteFolderModal((e) => !e)
        }}
        onOk={() => {
          const deleteFolder = currentData?.folder?.find(
            (el) => el?.id === deleteFolderId
          )
          if (deleteFolder) onFolderDelete?.(deleteFolder)
        }}
        visible={deleteFolderModal}
        className={styles.deleteModal}
        cancelText={'Cancel'}
        okText={'Delete forever'}
        confirmLoading={folderDeleteLoading}
      >
        <div className={styles.modalContent}>
          <p>
            {selectedDocuments.length > 1 ? selectedDocuments.length : 1}{' '}
            {`item${
              selectedDocuments.length > 1 ? 's' : ''
            } will be deleted forever and you won't be able to restore them.`}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default ClientDocuments
