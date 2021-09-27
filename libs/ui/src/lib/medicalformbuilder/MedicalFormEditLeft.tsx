import {
  defaultSelectedFormInfos,
  MedicalForms,
  SelectedForms,
  CompanyListItem,
} from '@pabau/ui'
import { Collapse } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormComponentMedicalHistory from './MedicalFormComponentMedicalHistory'
import MedicalFormComponentPanel from './MedicalFormComponentPanel'
import MedicalFormGeneralPanel from './MedicalFormGeneralPanel'
import MedicalFormUploadButtons from './MedicalFormUploadButtons'

const { Panel } = Collapse

interface P {
  refreshDraggedForms: () => void
  isEditing: () => boolean
  medicalForms: MedicalForms[]
  changeFormName: (formName: string) => void
  changeService: (services: Array<string | number>) => void
  changeFormType: (formType: string) => void
  formName: string
  medicalFormType: string
  medicalFormServices: string
  changeLayout: (noRight: boolean) => void
  runPreviewPdf: () => void
  handlingClickLeft: (componentName: string) => void
  companyServiceListItems: CompanyListItem[]
}

const MedicalFormEditLeft: FC<P> = ({ ...props }) => {
  const { t } = useTranslation('common')
  const {
    refreshDraggedForms,
    isEditing,
    medicalForms,
    changeFormName,
    changeService,
    changeFormType,
    formName,
    medicalFormType = '',
    medicalFormServices = '',
    changeLayout,
    runPreviewPdf,
    handlingClickLeft,
    companyServiceListItems = [],
  } = props

  const [selectedFormTypes, setSelectedFormTypes] = useState<SelectedForms>(
    defaultSelectedFormInfos
  )
  const [componentClass, setComponentClass] = useState(
    styles.medicalFormEditLeftPanelCollapseComponentExpend
  )
  const [openPanel, setOpenPanel] = useState<string[]>(['1'])
  const [isEpaper, setIsEpaper] = useState(false)

  const isSelectedFormType = (setting) => {
    const selectedFormType = Object.entries(setting)
      .map(([key, value]) => {
        if (value === true) {
          changeFormType?.(key)
          return true
        }
        return false
      })
      .filter((item) => item)
    return selectedFormType.length === 0 ? false : true
  }

  const onSelectFormType = (setting) => {
    refreshDraggedForms?.()
    setSelectedFormTypes(setting)
    setIsEpaper(setting.epaper)
    changeLayout?.(!setting.epaper)
    if (isSelectedFormType(setting) && setting.epaper === false) {
      setOpenPanel(['2'])
      setComponentClass(styles.medicalFormEditLeftPanelCollapseComponentExpend)
    } else {
      setOpenPanel(['1'])
      setComponentClass(
        styles.medicalFormEditLeftPanelCollapseComponentCollapse
      )
    }
  }

  const callback = (key) => {
    if (isSelectedFormType(selectedFormTypes)) {
      setOpenPanel(key)
    } else {
      setOpenPanel(['1'])
    }
  }

  const onPreviewPdf = () => {
    runPreviewPdf?.()
  }

  useEffect(() => {
    if (openPanel.length === 2)
      setComponentClass(
        styles.medicalFormEditLeftPanelCollapseComponentCollapse
      )
    else
      setComponentClass(styles.medicalFormEditLeftPanelCollapseComponentExpend)
  }, [openPanel])

  useEffect(() => {
    const setting = {
      medicalHistory: false,
      consent: false,
      treatment: false,
      epaper: false,
      prescription: false,
      lab: false,
    }
    if (medicalFormType !== '') {
      switch (medicalFormType) {
        case 'questionnaire':
          setting.medicalHistory = true
          break
        case 'consent':
          setting.consent = true
          break
        case 'treatment':
          setting.treatment = true
          break
        case 'prescription':
          setting.prescription = true
          break
        case 'lab':
          setting.lab = true
          break
        case 'epaper':
          setting.epaper = true
          break
      }
    }
    setSelectedFormTypes(setting)
    setIsEpaper(setting.epaper)
    if (medicalFormType !== '' && setting.epaper === false) {
      setOpenPanel(['2'])
      setComponentClass(styles.medicalFormEditLeftPanelCollapseComponentExpend)
    } else {
      setOpenPanel(['1'])
      setComponentClass(
        styles.medicalFormEditLeftPanelCollapseComponentCollapse
      )
    }
  }, [medicalFormType])

  return (
    <div className={styles.medicalFormEditLeftPanel}>
      <Collapse
        expandIconPosition="right"
        className={styles.medicalFormEditLeftPanelCollapse}
        activeKey={openPanel}
        onChange={callback}
      >
        <Panel
          header={t('ui.medicalformbuilder.left.tab.general')}
          key="1"
          className={styles.medicalFormEditLeftPanelCollapseGeneral}
        >
          <MedicalFormGeneralPanel
            isEditing={isEditing}
            onSelectFormType={onSelectFormType}
            changeFormName={changeFormName}
            changeService={changeService}
            formName={formName}
            medicalFormType={medicalFormType}
            medicalFormServices={medicalFormServices}
            companyServiceListItems={companyServiceListItems}
          />
          {isEpaper && <MedicalFormUploadButtons onPreviewPdf={onPreviewPdf} />}
        </Panel>
        {isEpaper === false && (
          <Panel
            header={t('ui.medicalformbuilder.left.tab.components')}
            key="2"
            className={componentClass}
          >
            {selectedFormTypes.medicalHistory === true && (
              <MedicalFormComponentMedicalHistory />
            )}
            <MedicalFormComponentPanel
              selectedFormTypes={selectedFormTypes}
              medicalForms={medicalForms}
              handlingClickLeft={handlingClickLeft}
            />
          </Panel>
        )}
      </Collapse>
    </div>
  )
}

export default MedicalFormEditLeft
