import React, { FC } from 'react'
import { ClientDocuments, ClientDocumentsProps } from '@pabau/ui'
import styles from './ClientDocumentsLayout.module.less'

export const ClientDocumentsLayout: FC<ClientDocumentsProps> = ({
  folderList = {
    folder: [],
    folderTitle: 'Folders',
    folderContent: [],
    contentCount: 0,
    id: 0,
  },
  folderDocuments = [],
  ...props
}) => {
  return (
    <div className={styles.clientLayout}>
      <ClientDocuments
        folderList={folderList}
        folderDocuments={folderDocuments}
        {...props}
      />
    </div>
  )
}

export default ClientDocumentsLayout
