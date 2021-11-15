import { MedicalFormTypes, LabTestsListItem } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import SettingElement from '../medicalform/SettingElement'
import styles from './RightSidebar.module.less'

interface P {
  selectedForm: MedicalFormTypes
  component: string
  formType: string
  display: boolean
  handlingFormSetting?: (componentID?: string) => void
  handlingDeleteForm?: (componentID?: string) => void
  handlingSaveForm?: (form: MedicalFormTypes) => void
  labTestsListItems?: LabTestsListItem[]
}

export const RightSidebar: FC<P> = ({
  selectedForm,
  component,
  formType,
  display,
  handlingFormSetting,
  handlingDeleteForm,
  handlingSaveForm,
  labTestsListItems,
}) => {
  const [isVisible, setIsVisible] = useState(display)

  useEffect(() => {
    setIsVisible(display)
  }, [display])

  const showStyle = {
    right: '0px',
  }
  const hideStyle = {
    right: '-100%',
  }
  const handleSave = (form) => {
    handlingSaveForm?.(form)
    setIsVisible(false)
    handlingFormSetting?.('')
  }
  const handleDelete = () => {
    setIsVisible(false)
    handlingDeleteForm?.(selectedForm?.id)
  }

  return (
    <div className={styles.sidebarMain}>
      <div
        className={styles.componentDiv}
        style={isVisible ? showStyle : hideStyle}
      >
        <SettingElement
          type={formType}
          component={component}
          selectedForm={selectedForm}
          handleSave={handleSave}
          handleDelete={handleDelete}
          labTestsListItems={labTestsListItems}
        />
      </div>
    </div>
  )
}

export default RightSidebar
