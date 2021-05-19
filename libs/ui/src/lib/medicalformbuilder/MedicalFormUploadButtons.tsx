import { FilePdfOutlined, PictureOutlined } from '@ant-design/icons'
import { Button, ButtonTypes } from '@pabau/ui'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'

interface P {
  onPreviewPdf: () => void
}

const MedicalFormUploadButtons: FC<P> = ({ onPreviewPdf }) => {
  const { t } = useTranslation('common')
  const previewPdf = () => {
    onPreviewPdf?.()
  }

  return (
    <div className={styles.medicalFormUploadButtons}>
      <div className={styles.buttonPanel}>
        <Button
          type={ButtonTypes.primary}
          className={styles.buttons}
          onClick={previewPdf}
        >
          <FilePdfOutlined /> {t('ui.medicalformbuilder.form.uploadpdf')}
        </Button>
      </div>
      <div className={styles.buttonPanel}>
        <Button
          type={ButtonTypes.default}
          className={styles.buttons}
          onClick={previewPdf}
        >
          <PictureOutlined /> {t('ui.medicalformbuilder.form.uploadimage')}
        </Button>
      </div>
    </div>
  )
}

export default MedicalFormUploadButtons
