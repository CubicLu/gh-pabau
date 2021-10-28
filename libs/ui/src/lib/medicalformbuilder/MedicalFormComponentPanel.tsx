import { MedicalForms, SelectedForms } from '@pabau/ui'
import { Tabs } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormLeftSidebarBasicPanels from './MedicalFormLeftSidebarBasicPanels'
import MedicalFormLeftSidebarCustomPanels from './MedicalFormLeftSidebarCustomPanels'

const { TabPane } = Tabs

interface P {
  selectedFormTypes: SelectedForms
  medicalForms: MedicalForms[]
  handlingClickLeft: (componentName: string) => void
}

interface HideForm {
  [key: string]: string[]
}

const hideFormInfos: HideForm = {
  medicalHistory: [
    'basic_labtests',
    'basic_vaccinehistory',
    'basic_snomed',
    'basic_vaccinescheduler',
    'basic_traveldestination',
    'basic_drugs',
  ],
  consent: [
    'basic_vaccinescheduler',
    'basic_vaccinehistory',
    'basic_traveldestination',
    'basic_labtests',
  ],
  treatment: [],
  epaper: [],
  prescription: [
    'basic_labtests',
    'basic_vaccinehistory',
    'basic_vaccinescheduler',
    'basic_traveldestination',
    'basic_conditions',
    'basic_drawing',
    'basic_staticimage',
    'basic_photo',
  ],
  lab: [
    'basic_drugs',
    'basic_conditions',
    'basic_vaccinehistory',
    'basic_vaccinescheduler',
    'basic_traveldestination',
    'basic_drawing',
    'basic_staticimage',
    'basic_photo',
  ],
}

const MedicalFormComponentPanel: FC<P> = ({ ...props }) => {
  const { t } = useTranslation('common')
  const { selectedFormTypes, medicalForms, handlingClickLeft } = props
  const hideForms: string[] = []

  const checkedFormTypes = Object.entries(selectedFormTypes)
    .filter(([key, value]) => value === true)
    .map((item) => hideFormInfos[item[0]])

  checkedFormTypes.map((itemFormTypes) =>
    itemFormTypes.map((itemFormType) => hideForms.push(itemFormType))
  )

  const basicMedicalForms = medicalForms.filter(
    (item) =>
      item.formType === 'basic' && hideForms.indexOf(item.formName) === -1
  )

  const customMedicalForms = medicalForms.filter(
    (item) => item.formType === 'custom'
  )

  return (
    <div className={styles.MedicalFormComponentPanel}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane
          tab={
            <span className={styles.tabName}>
              {t('ui.medicalformbuilder.medicalcomponent.basic')}
            </span>
          }
          key="1"
        >
          <MedicalFormLeftSidebarBasicPanels
            medicalForms={basicMedicalForms}
            handlingClickLeft={handlingClickLeft}
          />
        </TabPane>
        <TabPane
          tab={
            <span className={styles.tabName}>
              {t('ui.medicalformbuilder.medicalcomponent.custom')}
            </span>
          }
          key="2"
        >
          <MedicalFormLeftSidebarCustomPanels
            medicalForms={customMedicalForms}
            handlingClickLeft={handlingClickLeft}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MedicalFormComponentPanel
