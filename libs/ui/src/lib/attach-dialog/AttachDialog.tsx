import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { Image, Upload } from 'antd'
import { UploadProps } from 'antd/es/upload'
import { BasicModal as Modal, Button, PhotoGallery } from '@pabau/ui'
import { ReactComponent as CloudUpload } from '../../assets/images/attach-dialog/cloud-upload.svg'
import imageGallery from '../../assets/images/attach-dialog/image-gallery.png'
import styles from './AttachDialog.module.less'

const { Dragger } = Upload

export interface AttachDialogProps {
  title?: string
  visible: boolean
  onClose: () => void
  onAttached: (images: string[], fileList: UploadProps[]) => void
}

const AttachDialogComponent: FC<AttachDialogProps> = ({
  title,
  visible,
  onClose,
  onAttached,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [openImageGallery, setOpenImageGallery] = useState(false)

  const handleFileOnChange = (info) => {
    const { status } = info.file
    if (status !== 'uploading') {
      onAttached([], info?.fileList)
    }
  }

  const handleAttachImages = (selected) => {
    onAttached(selected, [])
    setOpenImageGallery(false)
  }

  return (
    <Modal
      title={title || t('ui.attachdlg.title')}
      visible={visible}
      centered
      footer={false}
      width={isMobile ? 320 : 655}
      onCancel={() => onClose()}
    >
      <div className={styles.attachDlgContainer}>
        <div className={styles.openImageGalleryContainer}>
          <Image
            src={imageGallery}
            width={isMobile ? 160 : 175}
            height={isMobile ? 160 : 175}
            preview={false}
          />
          <Button type="primary" onClick={() => setOpenImageGallery(true)}>
            {t('ui.attachdlg.photogallery')}
          </Button>
        </div>
        <div className={styles.fileUploaderContainer}>
          <Dragger
            multiple={true}
            name="file"
            onChange={handleFileOnChange}
            className={styles.dropBox}
          >
            <CloudUpload />
            <Button type="primary" className={styles.chooseFileButton}>
              {t('ui.attachdlg.uploadfiles')}
            </Button>
          </Dragger>
        </div>
        {openImageGallery && (
          <PhotoGallery
            visible={openImageGallery}
            onClose={() => setOpenImageGallery(false)}
            onAttached={(selected) => handleAttachImages(selected)}
          />
        )}
      </div>
    </Modal>
  )
}

export const AttachDialog: FC<AttachDialogProps> = (props) => {
  const { visible } = props
  return visible ? <AttachDialogComponent {...props} /> : <div />
}

export default AttachDialog
