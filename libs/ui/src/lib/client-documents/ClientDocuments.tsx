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
} from '@ant-design/icons'
import { ReactComponent as ListIcon } from '../../assets/images/icons/list.svg'
import { ReactComponent as GridIcon } from '../../assets/images/icons/grid.svg'
import { ReactComponent as ImageFolder } from '../../assets/images/image-album.svg'
import empty from '../../assets/images/empty-doc.png'
import {
  Button,
  BasicModal,
  CamUploaderModal as FileUploadModal,
  UploadingImageProps as UploadingFilesProps,
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
  dateTime: number
  folderData: string
  documentName?: string
  sharedWith?: OpenByProps[]
}

export interface FolderProps {
  folder: FolderProps[]
  id: number
  folderTitle: string
  contentCount: number
  modifiedDate?: string
  folderContent: FolderContentProps[]
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
  paginateData: {
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

  uploadingDocs: UploadingFilesProps[]
  setUploadingDocs: (data: UploadingFilesProps[]) => void
  onDocUpload?: (data: UploadingFilesProps) => void
  onDocRemove?: (imageId: number[]) => void
  onUploadCancel?: (data: UploadingFilesProps) => void
  docsDeleteLoading?: boolean
  singleDocDelLoading?: boolean
  onDocumentsMove?: (folder, documents) => void
  onRenameFile?: (file: number, name: string) => void
  renameFileLoading?: boolean
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

  uploadingDocs,
  setUploadingDocs,
  onDocUpload,
  onDocRemove,
  onUploadCancel,
  docsDeleteLoading,
  singleDocDelLoading,
  onDocumentsMove,
  onRenameFile,
  renameFileLoading,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [data, setData] = useState(folderList)
  const [currentData, setCurrentData] = useState(folderList)
  const [folderContent, setFolderContent] = useState(folderDocuments)
  const [singleDocumentMoveId, setSingleDocumentMoveId] = useState<number>()
  const [breadcrumbs, setBreadcrumbs] = useState([
    { title: 'Folders', index: -1 },
  ])
  const [folderMenuDrawer, setFolderMenuDrawer] = useState(false)
  const [createFolderDrawer, setCreateFolderDrawer] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [createFolderModal, setCreateFolderModal] = useState(false)
  const [editFolderId, setEditFolderId] = useState<number | null>(null)
  const [deleteFolderId, setDeleteFolderId] = useState<number | null>(null)
  const [deleteFolderModal, setDeleteFolderModal] = useState(false)

  const [listView, setListView] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState<
    FolderContentProps[]
  >([])
  const [documentDeleteModal, setDocumentDeleteModal] = useState(false)
  const [visibleCreatePopover, setVisibleCreatePopover] = useState(false)

  const [uploadModal, setUploadModal] = useState(false)

  useEffect(() => {
    setFolderContent(folderDocuments)
    setShowMenu(false)
    setSelectedDocuments([])
    setDocumentDeleteModal(false)
  }, [folderDocuments])

  useEffect(() => {
    setData(folderList)
    setFolderName('')
    setEditFolderId(null)
    setDeleteFolderId(null)
    setCreateFolderModal(false)
    setDeleteFolderModal(false)
    setFolderMenuDrawer(() => false)
    setCreateFolderDrawer(() => false)
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
      setCurrentData({ ...currentData.folder[index], folderContent: [] })
      onFolderClick?.(currentData.folder[index]?.id)
      setSelectedDocuments([])
    },
    [breadcrumbs, currentData.folder, onFolderClick]
  )

  const onBreadCrumbsClick = (index) => {
    let newData = { ...data }
    const wantData = breadcrumbs.slice(1, index + 1)
    let tempData = { ...newData }

    for (const x of wantData) {
      tempData = { ...tempData.folder[x.index], folderContent: [] }
    }
    newData = index ? tempData : newData
    setCurrentData({ ...newData, folderContent: [] })
    onFolderClick?.(newData?.id)
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
        onClick={() => setUploadModal((e) => !e)}
      >
        <UploadOutlined /> File Upload
      </div>
    </div>
  )

  const FolderDropdownMenu = () => {
    const filtered: { id: number; name: string }[] = []
    const iterateToFolders = (folders) => {
      for (const el of folders) {
        if (el?.id !== currentData?.id) {
          filtered.push({
            id: el?.id,
            name: el?.folderTitle,
          })
          if (el?.folder?.length) iterateToFolders(el?.folder)
        }
      }
    }
    iterateToFolders(data?.folder)
    if (currentData?.id !== 0) {
      filtered.unshift({ id: 0, name: 'Uncategorized' })
    }

    return (
      <Menu className={styles.menuItemList}>
        {filtered?.map((folder) => (
          <Menu.Item
            key={folder.id.toString()}
            onClick={() =>
              onDocumentsMove?.(
                folder.id,
                selectedDocuments?.map((el) => el?.id)
              )
            }
          >
            <ImageFolder />
            <div>{folder.name}</div>
          </Menu.Item>
        ))}
        <Menu.Item
          key="New"
          onClick={() => {
            setSingleDocumentMoveId(0)
            setCreateFolderModal((e) => !e)
          }}
        >
          <PlusOutlined />
          <div>New folder</div>
        </Menu.Item>
      </Menu>
    )
  }

  const handleSelectAllData = () => {
    setShowMenu(false)
    setSelectedDocuments([])
  }

  const handleDocumentsDelete = () => {
    if (selectedDocuments?.length > 0) {
      const deleteDocs = selectedDocuments?.map((el) => el?.id || 0)
      onDocRemove?.(deleteDocs)
    }
  }

  const handleBulkDownload = () => {
    for (const doc of selectedDocuments) {
      dataDownload(doc?.folderData)
    }
  }

  const dataDownload = (url: string) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.addEventListener('load', function () {
      const urlCreator = window.URL || window.webkitURL
      const imageUrl = urlCreator.createObjectURL(this.response)
      const tag = document.createElement('a')
      tag.href = imageUrl
      tag.download = url
      document.body.append(tag)
      tag.click()
      tag.remove()
    })
    xhr.send()
  }

  const drop = (ev) => {
    ev.preventDefault()
    if (ev.dataTransfer.getData('documentId')) {
      const draggedDocId = Number(ev.dataTransfer.getData('documentId'))
      const tarFolderId = Number(ev.target.id.replace('tar', ''))
      onDocumentsMove?.(tarFolderId, [draggedDocId])
    }
    if (ev.dataTransfer.getData('folderId')) {
      // This block will be used when folder can be dragged and dropped in other albums
      const tarFolderId = Number(ev.target.id.replace('tar', ''))
      const draggedFolder = Number(ev.dataTransfer.getData('folderId'))
      document
        ?.querySelector(`#${ev.target.id}`)
        ?.classList.remove('dropEffect')
    }
  }

  const allowDrop = (ev) => {
    ev.preventDefault()
    document?.querySelector(`#${ev.target.id}`)?.classList.add('dropEffect')
  }

  const dragDocument = (ev) => {
    const draggedDoc = folderContent?.find(
      (el) => el?.id === Number(ev?.target?.id)
    )

    if (draggedDoc) {
      ev.dataTransfer.setData('documentId', ev?.target?.id)
      const img = new Image()
      img.src = draggedDoc?.folderData

      const moveItemName = draggedDoc?.folderData?.split('/') || []
      const ghostEle = document.createElement('div')
      ghostEle.id = 'draGhost'
      ghostEle.innerHTML = draggedDoc?.documentName
        ? draggedDoc?.documentName
        : moveItemName[moveItemName.length - 1]
      ghostEle.style.opacity = '1'
      ghostEle.style.height = '45px'
      ghostEle.style.color = 'white'
      ghostEle.style.border = 'none'
      ghostEle.style.display = 'flex'
      ghostEle.style.padding = '0px 20px'
      ghostEle.style.textAlign = 'center'
      ghostEle.style.position = 'absolute'
      ghostEle.style.width = 'fit-content'
      ghostEle.style.alignItems = 'center'
      ghostEle.style.justifyContent = 'center'
      ghostEle.style.borderRadius = '5px'
      ghostEle.style.backgroundColor = 'var(--primary-color)'
      document.body.append(ghostEle)
      ev.dataTransfer.setDragImage(ghostEle, 10, 10)
    }
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
              <button
                className={styles.btnCreate}
                onClick={() => setCreateFolderDrawer((e) => !e)}
              >
                <PlusOutlined /> Create
              </button>
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
      {showMenu && selectedDocuments?.length > 0 && (
        <div>
          <div className={styles.headerText}>
            <button
              className={styles.selectButton}
              onClick={() => handleSelectAllData()}
            >
              <MinusOutlined />
            </button>
            {!isMobile && (
              <div className={styles.rightSide}>
                <Button type="ghost" onClick={() => handleBulkDownload()}>
                  <DownloadOutlined />
                  Download {`(${selectedDocuments.length})`}
                </Button>
                <Dropdown
                  overlay={<FolderDropdownMenu />}
                  placement="bottomRight"
                >
                  <Button type="ghost" className={styles.folderDropdownBtn}>
                    <EnterOutlined />
                    Move to {`(${selectedDocuments.length})`}
                  </Button>
                </Dropdown>
                <Button className={styles.shareTextBtn} type="ghost">
                  <span>
                    <Share /> Share {`(${selectedDocuments.length})`}
                  </span>
                </Button>
                <Button
                  type="ghost"
                  onClick={() => setDocumentDeleteModal(true)}
                >
                  <DeleteOutlined />
                  Delete {`(${selectedDocuments.length})`}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {currentData.folder.length === 0 && currentData.contentCount === 0 ? (
        <div className={styles.emptyDocument}>
          <img src={empty} alt={'empty'} />
          <div className={styles.emptyDocumentTitle}>
            <h1>Seems empty here</h1>
            <p>Upload your first file</p>
          </div>
          <div className={styles.emptyDocumentButton}>
            <Button
              type="primary"
              className={styles.btnCreate}
              onClick={() => setUploadModal((e) => !e)}
            >
              Create
            </Button>
          </div>
        </div>
      ) : (
        <FolderData
          data={{ ...currentData, folderContent: folderContent }}
          allFolders={data?.folder}
          onFolderClick={onDocumentFolderClick}
          listView={listView}
          setShowMenu={setShowMenu}
          setSelectedDocuments={setSelectedDocuments}
          selectedDocuments={selectedDocuments}
          paginateData={paginateData}
          loading={loading}
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
          onDocumentDelete={(docId: number) => {
            if (docId !== 0) {
              onDocRemove?.([docId])
            } else if (selectedDocuments?.length > 0) {
              const deleteImages = selectedDocuments?.map((el) => el?.id || 0)
              onDocRemove?.(deleteImages)
            }
          }}
          singleDocDelLoading={singleDocDelLoading}
          onSingleDocumentMove={(folder, document, isCreateFolder) => {
            if (document) {
              if ((folder || folder === 0) && !isCreateFolder) {
                onDocumentsMove?.(folder, [document])
              }
              if (!folder && isCreateFolder) {
                setFolderName('')
                setSingleDocumentMoveId(document)
                setCreateFolderModal(() => true)
              }
            } else if (
              selectedDocuments?.length > 0 &&
              (folder || folder === 0)
            ) {
              if ((folder || folder === 0) && !isCreateFolder) {
                onDocumentsMove?.(
                  folder,
                  selectedDocuments?.map((el) => el?.id)
                )
              }
              if (!folder && isCreateFolder) {
                setFolderName('')
                setCreateFolderModal(() => true)
              }
            }
          }}
          drop={drop}
          allowDrop={allowDrop}
          dragDocument={dragDocument}
          onRenameFile={onRenameFile}
          renameFileLoading={renameFileLoading}
        />
      )}
      {isMobile && showMenu && selectedDocuments?.length > 0 && (
        <div className={styles.bottomBar}>
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<DownloadOutlined />}
            onClick={() => handleBulkDownload()}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<EnterOutlined />}
            onClick={() => setFolderMenuDrawer(() => true)}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<Share />}
          />
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<DeleteOutlined />}
            style={{ color: 'red' }}
            onClick={() => setDocumentDeleteModal(() => true)}
          />
          <div className={styles.folderDropdownBtn}>
            <Drawer
              placement={'bottom'}
              closable={true}
              onClose={() => setFolderMenuDrawer((e) => !e)}
              visible={folderMenuDrawer}
              className={styles.createContentMobile}
            >
              <FolderDropdownMenu />
            </Drawer>
          </div>
        </div>
      )}

      <Drawer
        placement={'bottom'}
        closable={true}
        onClose={() => setCreateFolderDrawer((e) => !e)}
        visible={createFolderDrawer}
        className={styles.createContentMobile}
      >
        <CreateContent />
      </Drawer>

      <FileUploadModal
        albumId={currentData?.id || 0}
        uploadingImages={uploadingDocs}
        visible={uploadModal}
        setUploadingImages={setUploadingDocs}
        onClose={(done?: boolean) => {
          setUploadModal((e) => !e)
          if (done) {
            setUploadingDocs?.([])
          }
        }}
        uploadImage={onDocUpload}
        removeImage={(fileId: number) => onDocRemove?.([fileId])}
        onCancelUpload={onUploadCancel}
        modalTitle="Upload Documents"
        descSubTitle="Images or Document files are acceptable"
        acceptFiles={['image/*', '.doc', '.docx', '.ppt', '.txt', '.pdf']}
      />

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
            {`1 item  will be deleted forever and you won't be able to restore them.`}
          </p>
        </div>
      </Modal>

      <Modal
        centered={true}
        onCancel={() => {
          setDocumentDeleteModal(() => false)
        }}
        onOk={handleDocumentsDelete}
        visible={documentDeleteModal}
        title={t('galley.list.view.delete.modal.title')}
        cancelText={t('common-label-cancel')}
        okText={t('galley.list.view.delete.ok.button')}
        confirmLoading={docsDeleteLoading}
      >
        <div>
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
