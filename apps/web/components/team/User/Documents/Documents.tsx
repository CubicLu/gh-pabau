import React, { FC, useState, useEffect } from 'react'
import { UploadProps } from 'antd/es/upload'
import moment from 'moment'

import { Documents, Files, Folders, DocumentUploadModal } from '@pabau/ui'
import { userDetail } from '../../../../mocks/UserDetail'
import userImage from '../../../../assets/images/avatar.png'
import styles from '../UserDetail.module.less'
import { useTranslation } from 'react-i18next'

interface UploadCustomProps extends UploadProps {
  size: number
}

const Document: FC = () => {
  const { t } = useTranslation('common')
  const { documentsFolder, userDetailDocuments } = userDetail(t)
  const [folderData, setFolderData] = useState<Folders[]>(documentsFolder)
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const [folderOption, setFolderOption] = useState([])

  useEffect(() => {
    if (folderData.length > 0) {
      const folderNames = []
      folderData.map((thread) => {
        folderNames.push({ name: thread.name, value: thread.name })
        return thread
      })
      setFolderOption([...folderNames])
    }
  }, [folderData])

  const handleDelete = (file: Files) => {
    const folders: Folders[] = folderData.map((folder: Folders) => {
      folder.files = folder.files.filter((thread) => thread.key !== file.key)
      return folder
    })
    setFolderData([...folders])
  }

  const handleFileRename = (file: Files) => {
    const folders: Folders[] = folderData.map((folder: Folders) => {
      folder.files = folder.files.map((thread) => {
        if (thread.key === file.key) {
          thread = file
        }
        return thread
      })
      return folder
    })
    setFolderData([...folders])
  }

  const handleUpload = (
    fileList: UploadCustomProps[],
    folder: string,
    shared: boolean
  ) => {
    if (folder) {
      const newFolderData: Folders[] = folderData.map((thread) => {
        if (thread.name === folder) {
          fileList.map((files) => {
            const data = {
              key: Math.random().toString(36).substring(2, 7),
              name: files.name,
              status: shared ? 'Shared' : '',
              addedByDate: `Added ${moment(new Date()).format(
                'DD/MM/YYYY'
              )} by ${userDetailDocuments.name}`,
              size: `${(files.size * 0.000_001).toFixed(2)} MB`,
            }
            thread.files.push(data)
            return files
          })
        }
        return thread
      })
      setFolderData([...newFolderData])
    }
    setIsUpload(false)
  }

  const handleSortChange = (value) => {
    if (value === 'Name A-Z') {
      folderData.sort(compare)
      setFolderData([...folderData])
    }
  }

  const compare = (a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    }
    return 0
  }

  const handleAddFolder = (name: string) => {
    const newFolderData: Folders[] = folderData
    folderData.push({ name: name, files: [] })
    setFolderData([...newFolderData])
  }

  return (
    <div className={styles.documentWrapper}>
      <Documents
        headingLabel={'Documents'}
        folders={folderData}
        handleUpload={() => setIsUpload(true)}
        handleDelete={handleDelete}
        handleSortChange={handleSortChange}
        handleFileRename={handleFileRename}
        handleAddFolder={handleAddFolder}
      />
      <DocumentUploadModal
        title={'Upload Files'}
        visible={isUpload}
        avatarSrc={userImage}
        userName={userDetailDocuments.name}
        position={userDetailDocuments.position}
        folderOptions={folderOption}
        draggerProps={{ multiple: true, name: 'file' }}
        acceptFileType={'image/*,.pdf,.doc,.docx,.xml,application/msword'}
        onCancel={() => setIsUpload(false)}
        onUpload={handleUpload}
      />
    </div>
  )
}

export default Document
