import {
  Avatar,
  BasicModal,
  FormComponentBuilder,
  FullScreenReportModal,
  Stepper,
  StepperItem,
  TabMenu,
  MacroItem,
  UserGroupListItem,
  InvProductsListItem,
  MedicalConditionsListItem,
} from '@pabau/ui'
import { Divider, Tag } from 'antd'
import React, { FC } from 'react'
import styles from './MedicalFormPreview.module.less'

interface MedicalPreviewUserProps {
  name: string
  src: string
  date: string
  tags: Array<string>
}

export interface MedicalFormPreviewProps {
  user: MedicalPreviewUserProps
  desktopTemp: string
  formData?: string
  formName?: string
  formSaveLabel?: string
  appTemp: string
  step: number
  stepData: StepperItem[]
  visible: boolean
  closePreviewDialog?: () => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  medicalFormMacros?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
  userGroupListItems?: UserGroupListItem[]
}

export const MedicalFormPreview: FC<MedicalFormPreviewProps> = ({
  formData = '',
  formName = '',
  formSaveLabel = '',
  user,
  desktopTemp,
  appTemp,
  step,
  stepData,
  visible,
  closePreviewDialog,
  onHandleMacro,
  medicalFormMacros = [],
  invProductsListItems = [],
  medicalConditionsListItems = [],
  userGroupListItems = [],
}) => {
  const onCancel = () => {
    closePreviewDialog?.()
  }
  return (
    <div>
      {visible && (
        // <BasicModal
        //   wrapClassName={styles.tempPreviewContainer}
        //   title={formName === '' ? 'Template Preview' : formName + ' Preview'}
        //   visible={visible}
        //   newButtonText="Test As Client"
        //   width="50%"
        //   onCancel={onCancel}
        // >
        <div className={styles.tempPreviewTabMenuContainer}>
          <div className={styles.hello}>
            <FullScreenReportModal
              title={
                formName === '' ? 'Template Preview' : formName + ' Preview'
              }
              visible={true}
              onBackClick={onCancel}
            >
              <div className={styles.tempPreviewTabContainer}>
                {formData === '' ? (
                  <iframe title="Desktop" src={desktopTemp} />
                ) : (
                  <FormComponentBuilder
                    previewData={formData}
                    previewAttrs={[]}
                    formSaveLabel={formSaveLabel}
                    onHandleMacro={onHandleMacro}
                    medicalFormMacros={medicalFormMacros}
                    userGroupListItems={userGroupListItems}
                    invProductsListItems={invProductsListItems}
                    medicalConditionsListItems={medicalConditionsListItems}
                  />
                )}
              </div>
              {/* <div className={styles.tempPreviewTabContainer}>
                <div className={styles.tempAppPreviewHeader}>
                  <div>
                    <Avatar src={user.src} name={user.name} size={50} />
                    <div className={styles.userInfo}>
                      <p className={styles.previewUserName}>{user.name}</p>
                      <p className={styles.previewUserDate}>{user.date}</p>
                    </div>
                  </div>
                  <div>
                    {user?.tags?.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <Stepper datasource={stepData} step={step} />
                <Divider style={{ margin: 0 }} />
                <iframe title="App" src={appTemp} />
              </div> */}
            </FullScreenReportModal>
          </div>
        </div>
        // </BasicModal>
      )}
    </div>
  )
}

export default MedicalFormPreview
