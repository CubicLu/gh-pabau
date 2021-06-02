import { MedicalFormPreview as MedicalFormPreviewPanel } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './MedicalFormBuilder.module.less'

interface P {
  visible: boolean
  closePreviewDialog: () => void
  formData: string
}
const MedicalFormPreview: FC<P> = ({
  visible,
  closePreviewDialog,
  formData = '',
}) => {
  return (
    <div className={styles.medicalFormEditPanel}>
      <MedicalFormPreviewPanel
        desktopTemp="https://fresha.com/"
        appTemp="https://fresha.com/"
        formData={formData}
        step={2}
        stepData={[]}
        visible={visible}
        user={{
          name: 'Sylvia Cole',
          date: 'December 24, 1992',
          src: '',
          tags: ['Botox'],
        }}
        closePreviewDialog={closePreviewDialog}
      />
    </div>
  )
}

export default MedicalFormPreview
