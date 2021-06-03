import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Modal, Tabs } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormEdit from './MedicalFormEdit'
import MedicalFormInfo from './MedicalFormInfo'
import MedicalFormPreview from './MedicalFormPreview'
import MedicalFormSetting from './MedicalFormSetting'
import className from 'classnames'

const { TabPane } = Tabs

interface MedicalFormBuilderProps {
  previewData: string
  visible: boolean
  onCreate: () => void
  nameForm?: string
}

export const MedicalFormBuilder: FC<MedicalFormBuilderProps> = ({
  previewData,
  visible,
  onCreate,
  nameForm,
}) => {
  const { t } = useTranslation('common')
  const [formName, setFormName] = useState('IPL Treatment Record (Clone)')
  const [visiblePreview, setVisiblePreview] = useState(false)
  const [activatePanel, setActivatePanel] = useState('1')
  const [clickedCreateForm, setClickedCreateForm] = useState(false)
  const [clickedPreviewForm, setClickedPreviewForm] = useState(false)
  const [formData, setFormData] = useState('')

  const changeFormName = (formName) => {
    setFormName(formName)
  }

  const changeTab = (key) => {
    setVisiblePreview(false)
    if (key === '2') {
      setVisiblePreview(true)
      clickPreviewFormBtn()
    }
    setActivatePanel('1')
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

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={className(styles.fullScreenModal, 'fullScreenModal')}
    >
      <MedicalFormInfo formName={formName} />
      <MedicalFormSetting clickCreateFormBtn={clickCreateFormBtn} />
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
            previewData={'previewData'}
            changeFormName={changeFormName}
            clickedCreateForm={clickedCreateForm}
            clickedPreviewForm={clickedPreviewForm}
            clearCreateFormBtn={clearCreateFormBtn}
            getFormData={getFormData}
            formName={'IPL Treatment Record (Clone)'}
          />
          {visiblePreview === true && (
            <MedicalFormPreview
              visible={visiblePreview}
              closePreviewDialog={closePreviewDialog}
              formData={formData}
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
      </Tabs>
    </Modal>
  )
}

export default MedicalFormBuilder
