import {
  MedicalFormPreview as MedicalFormPreviewPanel,
  MacroItem,
  UserGroupListItem,
  LabTestsListItem,
  InvProductsListItem,
} from '@pabau/ui'
import React, { FC } from 'react'
import styles from './MedicalFormBuilder.module.less'

interface P {
  visible: boolean
  closePreviewDialog: () => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  formData: string
  formName: string
  formSaveLabel?: string
  medicalFormMacros?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  userGroupListItems?: UserGroupListItem[]
}
const MedicalFormPreview: FC<P> = ({
  visible,
  closePreviewDialog,
  onHandleMacro,
  formData = '',
  formName = '',
  formSaveLabel = '',
  medicalFormMacros = [],
  invProductsListItems = [],
  userGroupListItems = [],
}) => {
  return (
    <div className={styles.medicalFormEditPanel}>
      <MedicalFormPreviewPanel
        desktopTemp="https://fresha.com/"
        appTemp="https://fresha.com/"
        formData={formData}
        formName={formName}
        step={2}
        stepData={[]}
        visible={visible}
        formSaveLabel={formSaveLabel}
        user={{
          name: 'Sylvia Cole',
          date: 'December 24, 1992',
          src: '',
          tags: ['Botox'],
        }}
        closePreviewDialog={closePreviewDialog}
        onHandleMacro={onHandleMacro}
        medicalFormMacros={medicalFormMacros}
        userGroupListItems={userGroupListItems}
        invProductsListItems={invProductsListItems}
      />
    </div>
  )
}

export default MedicalFormPreview
