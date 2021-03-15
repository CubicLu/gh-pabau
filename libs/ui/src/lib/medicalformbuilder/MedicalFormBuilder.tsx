import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { FC, useState } from 'react'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormEdit from './MedicalFormEdit'
import MedicalFormInfo from './MedicalFormInfo'
import { PreviewData } from './MedicalFormInterface'
import MedicalFormPreview from './MedicalFormPreview'
import MedicalFormSetting from './MedicalFormSetting'

const { TabPane } = Tabs

const MedicalFormBuilder: FC<PreviewData> = ({ previewData }) => {
  const [formName, setFormName] = useState('IPL Treatment Record (Clone)')
  const [visiblePreview, setVisiblePreview] = useState(false)
  const [activatePanel, setActivatePanel] = useState('1')
  const [clickedCreateForm, setClickedCreateForm] = useState(true)

  const changeFormName = (formName) => {
    setFormName(formName)
  }

  const changeTab = (key) => {
    setVisiblePreview(false)
    if (key === '2') {
      setVisiblePreview(true)
    }
    setActivatePanel('1')
  }

  const closePreviewDialog = () => {
    setVisiblePreview(false)
  }

  const clickCreateFormBtn = () => {
    setClickedCreateForm(!clickedCreateForm)
  }

  return (
    <>
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
              Edit &nbsp;&nbsp;
            </span>
          }
          key="1"
        >
          <MedicalFormEdit
            previewData={previewData}
            changeFormName={changeFormName}
            clickedCreateForm={clickedCreateForm}
            formName={'IPL Treatment Record (Clone)'}
          />
          {visiblePreview === true && (
            <MedicalFormPreview
              visible={visiblePreview}
              closePreviewDialog={closePreviewDialog}
            />
          )}
        </TabPane>
        <TabPane
          tab={
            <span className={styles.tabName}>
              <EyeOutlined />
              Preview
            </span>
          }
          key="2"
        ></TabPane>
      </Tabs>
    </>
  )
}

export default MedicalFormBuilder
