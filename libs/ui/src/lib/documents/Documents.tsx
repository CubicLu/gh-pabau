import React, { FC, useState } from 'react'
import styles from './Documents.module.less'
import { Button, Checkbox, Accordion, DotButton, BasicModal } from '@pabau/ui'
import FileIcon from './FileIcon.svg'
import {
  DeleteOutlined,
  FileOutlined,
  DownloadOutlined,
  FolderAddOutlined,
} from '@ant-design/icons'
import { Select, Input } from 'antd'
const { Option } = Select

export interface Files {
  key: string
  status: string
  name: string
  addedByDate: string
  size: string
}
export interface Folders {
  name: string
  files: Files[]
}

export interface DocumentsProps {
  headingLabel: string
  folders: Folders[]
  handleUpload: () => void
  handleDelete?: (file: Files) => void
  handleSortChange?: (value: string) => void
  handleFileRename?: (file: Files) => void
  handleAddFolder?: (name: string) => void
}

export const Documents: FC<DocumentsProps> = ({
  headingLabel,
  folders,
  handleUpload,
  handleDelete,
  handleSortChange,
  handleFileRename,
  handleAddFolder,
  ...rest
}) => {
  const [showRenameFileModal, setShowRenameFileModal] = useState<boolean>(false)
  const [fileRename, setFileRename] = useState<Files>()
  const [showAddFolderModal, setShowAddFolderModal] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>('')
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [fileDelete, setFileDelete] = useState<Files>()

  const handleOnChangeFileRename = (name: string) => {
    if (fileRename) {
      setFileRename({ ...fileRename, name: name })
    }
  }

  const handleSaveFileRename = () => {
    if (fileRename) {
      handleFileRename?.(fileRename)
    }
    handleCloseRenameModal()
  }

  const handleShowRenameModal = (file: Files) => {
    setShowRenameFileModal(true)
    setFileRename(file)
  }

  const handleCloseRenameModal = () => {
    setShowRenameFileModal(false)
  }

  const handleCloseAddFolderModal = () => {
    setShowAddFolderModal(false)
  }

  const handleSaveAddFolder = () => {
    handleAddFolder?.(folderName)
    handleCloseAddFolderModal()
  }

  const handleDeleteFile = () => {
    if (fileDelete) {
      handleDelete?.(fileDelete)
      setShowDeleteModal(false)
    }
  }

  return (
    <div className={styles.documentsMain}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h3>{headingLabel}</h3>
        </div>
        <div className={styles.control}>
          <div className={styles.sortBy}>
            <div className="label">Sort by</div>
            <div>
              <Select
                size="large"
                style={{ width: '100%' }}
                onChange={handleSortChange}
              >
                <Option value="Name A-Z">Name A-Z</Option>
              </Select>
            </div>
          </div>
          <div>
            <Button
              type="default"
              size="large"
              className={styles.addFolder}
              icon={<FolderAddOutlined />}
              onClick={() => setShowAddFolderModal(true)}
            />
          </div>
          <div>
            <Button
              type="default"
              size="large"
              className={styles.upload}
              icon={<DownloadOutlined />}
              onClick={handleUpload}
            >
              <div>Upload</div>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.seperator}></div>
      <div className={styles.content}>
        <div className={styles.folderPanel}>
          {folders &&
            folders.length > 0 &&
            folders.map((folder, index) => (
              <div key={`folder${index}`}>
                <Accordion
                  headerLabel={`${folder.name} (${folder.files.length})`}
                >
                  {folder.files.length > 0 &&
                    folder.files.map((file, ind) => (
                      <div
                        className={styles.subFolderDiv}
                        key={`file${ind * index}`}
                      >
                        <div className="detailsWithControls">
                          <div className="checkBoxDiv">
                            <Checkbox className="checkBox" />
                          </div>
                          <div className="details">
                            <div className="fileIcon">
                              <img src={FileIcon} alt="FileIcon" width="100%" />
                            </div>
                            <div className="fileDetails">
                              <div className="nameStatus">
                                <span className="name">{file.name}</span>
                                <div className="seperator"></div>
                                <span className="status">{file.status}</span>
                              </div>
                              <div className="dateSize">
                                <span className="date">{file.addedByDate}</span>
                                <div className="seperator"></div>
                                <span className="size">
                                  {typeof file.size !== undefined &&
                                    `(${file.size})`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="dottedMenu">
                          <div>
                            <DotButton
                              menuList={[
                                {
                                  key: 1,
                                  icon: <FileOutlined />,
                                  label: 'Rename',
                                  onClick: () => {
                                    handleShowRenameModal(file)
                                  },
                                },
                                {
                                  key: 2,
                                  icon: <DeleteOutlined />,
                                  label: 'Delete',
                                  onClick: () => {
                                    setShowDeleteModal(true)
                                    setFileDelete(file)
                                  },
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </Accordion>
              </div>
            ))}
        </div>
      </div>
      <BasicModal
        visible={showRenameFileModal}
        title={'Rename File'}
        onCancel={handleCloseRenameModal}
      >
        <div className={styles.documentModal}>
          <label className={styles.label}>File Name</label>
          <Input
            value={fileRename?.name}
            onChange={(e) => handleOnChangeFileRename(e.target.value)}
          />
          <div className={styles.modalButton}>
            <Button
              className={styles.btnCancel}
              size={'large'}
              onClick={handleCloseRenameModal}
            >
              Cancel
            </Button>
            <Button
              size={'large'}
              type={'primary'}
              onClick={handleSaveFileRename}
            >
              Rename
            </Button>
          </div>
        </div>
      </BasicModal>
      <BasicModal
        visible={showAddFolderModal}
        title={'Add Folder'}
        onCancel={handleCloseAddFolderModal}
      >
        <div className={styles.documentModal}>
          <label className={styles.label}>Folder Name</label>
          <Input onChange={(e) => setFolderName(e.target.value)} />
          <div className={styles.modalButton}>
            <Button
              className={styles.btnCancel}
              size={'large'}
              onClick={handleCloseAddFolderModal}
            >
              Cancel
            </Button>
            <Button
              size={'large'}
              type={'primary'}
              onClick={handleSaveAddFolder}
            >
              Add Folder
            </Button>
          </div>
        </div>
      </BasicModal>
      <BasicModal
        onCancel={() => setShowDeleteModal(false)}
        onOk={handleDeleteFile}
        visible={showDeleteModal}
        title={'Delete File'}
        newButtonText={'Yes, Delete'}
        isValidate={true}
      >
        <div className={styles.documentModal}>
          <span className={styles.message}>
            Are you sure you want to delete this file?
          </span>
        </div>
      </BasicModal>
    </div>
  )
}

export default Documents
