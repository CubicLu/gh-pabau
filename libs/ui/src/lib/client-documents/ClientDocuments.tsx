import React, { FC, useState, useCallback } from 'react'
import styles from './ClientDocuments.module.less'
import { useMedia } from 'react-use'
import { Drawer, Popover, Breadcrumb, Menu, Dropdown, Modal } from 'antd'
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
import { Button, FormikInput, Notification, NotificationType } from '@pabau/ui'
import FolderData from './FolderData'
import { BasicModal } from '../modal/BasicModal'
import { ReactComponent as Share } from '../../assets/images/share-folder.svg'
import dayjs from 'dayjs'

interface OpenByProps {
  firstName: string
  lastName: string
}

export interface FolderContentProps {
  id: string
  folderData: string
  dateTime: string
  sharedWith?: OpenByProps[]
}

export interface folderProps {
  folder: folderProps[]
  id: string
  folderTitle: string
  folderContent?: FolderContentProps[]
}

export interface selectProps {
  folderData?: folderProps[]
  folderTitle?: string
}

export interface ClientDocumentsProps {
  folderList: folderProps
}

export const ClientDocuments: FC<ClientDocumentsProps> = ({ folderList }) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const [data, setData] = useState(folderList)
  const [currentData, setCurrentData] = useState(folderList)
  const [breadcrumbs, setBreadcrumbs] = useState([
    { title: 'Folders', index: -1 },
  ])
  const [createAlbumDrawer, setCreateAlbumDrawer] = useState(false)
  const [createFolder, setCreateFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [listView, setListView] = useState(false)
  const [checkedData, setCheckedData] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [recentData, setRecentData] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [selectFolderData, setSelectFolderData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [tempData, setTempData] = useState([])
  const [recentActionData, setRecentActionData] = useState([] as selectProps[])
  const [errorMessage, setErrorMessage] = useState('')
  const [visibleCreatePopover, setVisibleCreatePopover] = useState(false)

  const onFolderClick = useCallback(
    (index: number) => {
      let temp = [...breadcrumbs]
      temp = [
        ...temp,
        { title: currentData.folder[index].folderTitle, index: index },
      ]
      setBreadcrumbs(temp)
      setCurrentData(currentData.folder[index])
      setSelectFolderData([])
      setCheckedData([])
    },
    [breadcrumbs, currentData.folder]
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

  const createContent = (
    <div className={styles.createContent}>
      <div
        className={styles.contentItem}
        style={{ padding: '10px', cursor: 'pointer' }}
        onClick={() => {
          setCreateFolder(true)
          setVisibleCreatePopover((e) => !e)
        }}
      >
        <FolderOutlined /> Folder
      </div>
      <div
        className={styles.contentItem}
        style={{ padding: '10px', cursor: 'pointer' }}
      >
        <UploadOutlined /> File upload
      </div>
    </div>
  )
  const handleCreateAlbum = () => {
    const newFolder = { ...currentData }
    if (newFolderName !== '') {
      if (newFolderName.length > 30) {
        setErrorMessage('Folder max chars should be 30')
      } else {
        newFolder.folder.push({
          folder: [],
          id: newFolderName,
          folderTitle: newFolderName,
          folderContent: [],
        })
        setErrorMessage('')
        setCurrentData(newFolder)
        setCreateFolder(false)
        setNewFolderName('')
      }
    } else {
      setErrorMessage('Name is required')
    }
  }

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
      <Menu.Item key="New" onClick={() => setCreateFolder((e) => !e)}>
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
      if (selectFolderData.includes(val.folderData as never)) {
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
      `${selectFolderData.length} items has been moved from ${moveData.folderTitle} to ${x.folderTitle}`
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
      setSelectFolderData([])
    } else {
      setSelectAll(true)
      const x = []
      currentData.folderContent?.map((folderValue) => {
        return x.push(folderValue.folderData as never)
      })
      setSelectFolderData(x as never)
    }
  }

  const handlefolderDataDelete = () => {
    let deleteData = currentData
    const updateFolderContent = []
    deleteData.folderContent?.map((x) => {
      if (!selectFolderData.includes(x.folderData as never)) {
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
    setSelectFolderData([])
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

  const handleBulkDownload = () => selectFolderData.map((x) => dataDownload(x))

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
                content={createContent}
                trigger="click"
                visible={visibleCreatePopover}
              >
                <button
                  className={styles.btnCreate}
                  onClick={() => setVisibleCreatePopover((e) => !e)}
                >
                  <PlusOutlined /> Create
                </button>
              </Popover>
            ) : (
              <>
                <button
                  className={styles.btnCreate}
                  onClick={() => setCreateAlbumDrawer((e) => !e)}
                >
                  <PlusOutlined /> Create
                </button>
                <Drawer
                  placement={'bottom'}
                  closable={false}
                  onClose={() => setCreateAlbumDrawer((e) => !e)}
                  visible={createAlbumDrawer}
                  className={styles.createContentMobile}
                >
                  {createContent}
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
                <Button type="ghost">
                  <EditOutlined />
                  Rename {`(${checkedData.length})`}
                </Button>
                <Button type="ghost" onClick={() => setDeleteModal(true)}>
                  <DeleteOutlined />
                  Delete
                  {`(${checkedData.length})`}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {showMenu && selectFolderData.length > 0 && (
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
                  Download {`(${selectFolderData.length})`}
                </Button>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button type="ghost">
                    <EnterOutlined />
                    Move to {`(${selectFolderData.length})`}
                  </Button>
                </Dropdown>
                <Button className={styles.shareTextBtn} type="ghost">
                  <span>
                    <Share /> Share {`(${selectFolderData.length})`}
                  </span>
                </Button>
                <Button type="ghost">
                  <EditOutlined />
                  Rename {`(${selectFolderData.length})`}
                </Button>
                <Button type="ghost" onClick={() => setDeleteModal(true)}>
                  <DeleteOutlined />
                  Delete
                  {`(${selectFolderData.length})`}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {data.folder.length === 0 ? (
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
        <div>
          <FolderData
            data={currentData}
            onFolderClick={onFolderClick}
            listView={listView}
            setCheckedData={setCheckedData}
            checkedData={checkedData}
            setShowMenu={setShowMenu}
            setRecentData={setRecentData}
            setSelectFolderData={setSelectFolderData}
            selectFolderData={selectFolderData}
            setTempData={setTempData}
            tempData={tempData}
            handleDelete={handleDelete}
            setRecentActionData={setRecentActionData}
            recentActionData={recentActionData as []}
            setCurrentData={setCurrentData}
          />
        </div>
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
        onCancel={() => setCreateFolder((e) => !e)}
        onDelete={() => console.log()}
        onOk={() => {
          handleCreateAlbum()
        }}
        onSpecialBooleanClick={() => console.log()}
        title={'Create folder'}
        visible={createFolder}
        newButtonText={'Create'}
      >
        <div className={styles.modalContent}>
          <label>Name</label>
          <FormikInput
            name="name"
            placeholder={'Create new folder'}
            value={newFolderName}
            required={true}
            onChange={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setNewFolderName(e.target.value)
            }}
          />
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
      </BasicModal>
      <Modal
        title={'Delete forever ?'}
        onCancel={() => {
          setDeleteModal((e) => !e)
        }}
        onOk={() => {
          checkedData.length > 0
            ? handleDeleteRecent()
            : handlefolderDataDelete()
          setDeleteModal((e) => !e)
        }}
        visible={deleteModal}
        className={styles.deleteModal}
        cancelText={'Cancel'}
        okText={'Delete forever'}
      >
        <div className={styles.modalContent}>
          <p>
            {checkedData.length > 0
              ? checkedData.length
              : selectFolderData.length}{' '}
            {`items will be deleted forever and you won't be able to restore them.`}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default ClientDocuments
