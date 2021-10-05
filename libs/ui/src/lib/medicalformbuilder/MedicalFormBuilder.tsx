import { ControlOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import {
  defaultMedicaFormAdvanceSettingData,
  EmailMessageTemplateItem,
  MedicaFormAdvanceSettingData,
  MedicalFormItem,
  MedicalFormTypes,
  Notification,
  NotificationType,
  SmsMessageTemplateItem,
  UserListItem,
  UserGroupListItem,
  MacroItem,
  CompanyListItem,
  LabTestsListItem,
  InvProductsListItem,
  MedicalConditionsListItem,
} from '@pabau/ui'
import { Modal, Tabs } from 'antd'
import className from 'classnames'
import { cloneDeep } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MedicalFormAdvance from './MedicalFormAdvance'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormEdit from './MedicalFormEdit'
import MedicalFormInfo from './MedicalFormInfo'
import MedicalFormPreview from './MedicalFormPreview'
import MedicalFormSetting from './MedicalFormSetting'

const { TabPane } = Tabs
const defaultMedicalForm = {
  key: '',
  name: '',
  formType: 'Treatment form',
  serviceId: '',
  createdAt: '23/10/2020',
  version: {
    currentVersion: '3',
    history: {
      last_week: [
        {
          version: '3',
          updatedBy: 'William Brandham',
          date: 'January 22, 2:27 PM',
        },
        {
          version: '2',
          updatedBy: 'Meri Redjepi',
          date: 'January 22, 1:26 PM',
        },
        {
          version: '1',
          updatedBy: 'Meri Redjepi',
          date: 'January 22, 2:27 PM',
        },
      ],
    },
  },
  status: 'active',
  index: 0,
  formData: '',
  rules: [],
  advSetting: defaultMedicaFormAdvanceSettingData,
}

interface MedicalFormBuilderProps {
  previewData: string
  visible: boolean
  onHideFormBuilder: () => void
  onSaveForm?: (MedicalFormItem) => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  preFormName: string
  preFormType: string
  preFormServices: string
  create?: boolean
  currentForm?: MedicalFormItem
  smsMessageTemplateItems?: SmsMessageTemplateItem[]
  emailMessageTemplateItems?: EmailMessageTemplateItem[]
  userListItems?: UserListItem[]
  userGroupListItems?: UserGroupListItem[]
  labTestsListItems?: LabTestsListItem[]
  companyServiceListItems?: CompanyListItem[]
  medicalFormMacros?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
}

export const MedicalFormBuilder: FC<MedicalFormBuilderProps> = ({
  previewData = '',
  visible = false,
  onHideFormBuilder,
  onSaveForm,
  onHandleMacro,
  preFormName = '',
  preFormType = '',
  preFormServices = '',
  create = true,
  currentForm = null,
  smsMessageTemplateItems = [],
  emailMessageTemplateItems = [],
  userListItems = [],
  userGroupListItems = [],
  labTestsListItems = [],
  medicalFormMacros = [],
  companyServiceListItems = [],
  invProductsListItems = [],
  medicalConditionsListItems = [],
}) => {
  const { t } = useTranslation('common')
  const [formName, setFormName] = useState(preFormName)
  const [medicalFormType, setMedicalFormType] = useState(preFormType)
  const [medicalFormServices, setMedicalFormServices] = useState(
    preFormServices
  )
  const [formSaveLabel, setFormSaveLabel] = useState('')
  const [
    currentMedicalForm,
    setCurrentMedicalForm,
  ] = useState<MedicalFormItem>()
  const [visiblePreview, setVisiblePreview] = useState(false)
  const [activatePanel, setActivatePanel] = useState('1')
  const [clickedCreateForm, setClickedCreateForm] = useState(false)
  const [clickedPreviewForm, setClickedPreviewForm] = useState(false)
  const [formData, setFormData] = useState('')
  const [
    advSettingData,
    setAdvSettingData,
  ] = useState<MedicaFormAdvanceSettingData>(
    defaultMedicaFormAdvanceSettingData
  )
  const [draggedFormCnts, setDraggedFormCnts] = useState(0)
  const [draggedForms, setDraggedForms] = useState<MedicalFormTypes[]>([])
  const [disabledButton, setDisabledButton] = useState(true)

  useEffect(() => {
    setFormName(preFormName)
  }, [preFormName])

  useEffect(() => {
    setMedicalFormType(preFormType)
  }, [preFormType])

  useEffect(() => {
    setMedicalFormServices(preFormServices)
  }, [preFormServices])

  useEffect(() => {
    if (currentForm) {
      setCurrentMedicalForm(currentForm)
    }
  }, [currentForm])

  useEffect(() => {
    if (formName !== '' && draggedFormCnts > 0) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [formName, draggedFormCnts])

  const changeFormName = (formName) => {
    setFormName(formName)
    if (currentMedicalForm) currentMedicalForm.name = formName
    if (defaultMedicalForm) defaultMedicalForm.name = formName
  }

  const changeService = (services) => {
    if (currentMedicalForm) currentMedicalForm.serviceId = services.toString()
    if (defaultMedicalForm) defaultMedicalForm.serviceId = services.toString()
  }

  const triggerChangeForms = (forms) => {
    setDraggedFormCnts(forms.length)
    setDraggedForms(forms)
  }

  const changeFormType = (formType) => {
    if (currentMedicalForm) currentMedicalForm.formType = formType
    if (defaultMedicalForm) defaultMedicalForm.formType = formType
  }

  const changeFormSaveLabel = (label) => {
    setFormSaveLabel(label)
  }

  const changeTab = (key) => {
    setVisiblePreview(false)
    if (key === '2') {
      setVisiblePreview(true)
      clickPreviewFormBtn()
    } else {
      setActivatePanel(key)
    }
  }

  const closePreviewDialog = () => {
    setVisiblePreview(false)
    clearPreviewFormBtn()
  }

  const clickCreateFormBtn = () => {
    setClickedCreateForm(true)
  }

  const clearCreateFormBtn = () => {
    setClickedCreateForm(false)
  }

  const clickPreviewFormBtn = () => {
    setClickedPreviewForm(true)
  }

  const clearPreviewFormBtn = () => {
    setClickedPreviewForm(false)
  }

  const getFormData = (data) => {
    setFormData(data)
  }

  const showError = (errMessage) => {
    Notification(NotificationType.error, errMessage)
  }

  const handleSaveForm = (formData) => {
    console.log('formData', formData)
    clearCreateFormBtn()
    if (create) {
      if (defaultMedicalForm) {
        if (defaultMedicalForm.name === '') {
          showError(t('ui.medicalformbuilder.save.formname.error'))
          return
        }
        defaultMedicalForm.formData = formData
        defaultMedicalForm.advSetting = advSettingData
        onSaveForm?.(cloneDeep(defaultMedicalForm))
      }
    } else {
      if (currentMedicalForm) {
        if (currentMedicalForm.name === '') {
          showError(t('ui.medicalformbuilder.save.formname.error'))
          return
        }
        currentMedicalForm.formData = formData
        currentMedicalForm.advSetting = advSettingData
        onSaveForm?.(currentMedicalForm)
      }
    }
  }

  const handleSaveRules = (rules) => {
    if (create) {
      defaultMedicalForm.rules = rules
    } else {
      if (currentMedicalForm) {
        currentMedicalForm.rules = rules
      }
    }
  }

  const handleAdvSettings = (advSettings) => {
    setAdvSettingData(advSettings)
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={className(styles.fullScreenModal, 'fullScreenModal')}
    >
      <MedicalFormInfo
        formName={formName}
        hideFormBuilder={onHideFormBuilder}
      />
      <MedicalFormSetting
        clickCreateFormBtn={clickCreateFormBtn}
        create={create}
        disabledButton={disabledButton}
      />
      <Tabs
        activeKey={activatePanel}
        centered
        className={styles.medicalFormMainTab}
        onChange={changeTab}
      >
        <TabPane
          tab={
            <span className={styles.tabName}>
              &nbsp;&nbsp;
              <EditOutlined />
              {t('ui.medicalformbuilder.form.edit')} &nbsp;&nbsp;
            </span>
          }
          key="1"
        >
          <MedicalFormEdit
            previewData={previewData}
            changeFormName={changeFormName}
            changeService={changeService}
            changeFormType={changeFormType}
            clickedCreateForm={clickedCreateForm}
            clickedPreviewForm={clickedPreviewForm}
            clearCreateFormBtn={clearCreateFormBtn}
            companyServiceListItems={companyServiceListItems}
            getFormData={getFormData}
            onSaveForm={handleSaveForm}
            formName={formName}
            triggerChangeForms={triggerChangeForms}
            currentRules={
              create ? defaultMedicalForm?.rules : currentMedicalForm?.rules
            }
            medicalFormType={medicalFormType}
            medicalFormServices={medicalFormServices}
            labTestsListItems={labTestsListItems}
          />
          {visiblePreview === true && (
            <MedicalFormPreview
              visible={visiblePreview}
              closePreviewDialog={closePreviewDialog}
              formData={formData}
              formName={formName}
              formSaveLabel={formSaveLabel}
              onHandleMacro={onHandleMacro}
              medicalFormMacros={medicalFormMacros}
              userGroupListItems={userGroupListItems}
              invProductsListItems={invProductsListItems}
              medicalConditionsListItems={medicalConditionsListItems}
            />
          )}
        </TabPane>
        <TabPane
          tab={
            <span className={styles.tabName}>
              <EyeOutlined />
              {t('ui.medicalformbuilder.form.preview')}
            </span>
          }
          key="2"
        ></TabPane>
        <TabPane
          tab={
            <span className={styles.tabName}>
              <ControlOutlined />
              {t('ui.medicalformbuilder.form.advanced')}
            </span>
          }
          key="3"
        >
          <MedicalFormAdvance
            draggedForms={draggedForms}
            formSaveLabel={formSaveLabel}
            changeFormSaveLabel={changeFormSaveLabel}
            onSaveRules={handleSaveRules}
            currentRules={currentMedicalForm?.rules}
            smsMessageTemplateItems={smsMessageTemplateItems}
            emailMessageTemplateItems={emailMessageTemplateItems}
            userListItems={userListItems}
            onSaveAdvSettings={handleAdvSettings}
            currentAdvSettings={currentMedicalForm?.advSetting}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default MedicalFormBuilder
