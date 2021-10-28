import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Tooltip } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ConsentSelected } from '../../assets/images/form-type/consent-selected.svg'
import { ReactComponent as Consent } from '../../assets/images/form-type/consent.svg'
import { ReactComponent as EPaperSelected } from '../../assets/images/form-type/file-pdf-selected.svg'
import { ReactComponent as EPaper } from '../../assets/images/form-type/file-pdf.svg'
import { ReactComponent as LabSelected } from '../../assets/images/form-type/lab-form-selected.svg'
import { ReactComponent as Lab } from '../../assets/images/form-type/lab-form.svg'
import { ReactComponent as MedicalHistorySelected } from '../../assets/images/form-type/medical-history-selected.svg'
import { ReactComponent as MedicalHistory } from '../../assets/images/form-type/medical-history.svg'
import { ReactComponent as PrescriptionSelected } from '../../assets/images/form-type/prescription-selected.svg'
import { ReactComponent as Prescription } from '../../assets/images/form-type/prescription.svg'
import { ReactComponent as TreatmentSelected } from '../../assets/images/form-type/treatment-selected.svg'
import { ReactComponent as Treatment } from '../../assets/images/form-type/treatment.svg'
import styles from './FormType.module.less'

const { confirm } = Modal

interface Setting {
  medicalHistory: boolean
  consent: boolean
  treatment: boolean
  epaper: boolean
  prescription: boolean
  lab: boolean
}

export interface FormTypeProps {
  isEditing?: () => boolean
  medicalFormType: string
  onChangeSetting: (val: Setting) => void
}

interface FormTypeInfo {
  [key: string]: {
    label: string
    selected: boolean
    desc: string
    icon: ReactNode
    iconSelected: ReactNode
  }
}

export const FormType: FC<FormTypeProps> = ({
  isEditing,
  medicalFormType = '',
  onChangeSetting,
}) => {
  const { t } = useTranslation('common')

  const medicalHistoryLabel = t(
    'ui.medicalformbuilder.form.type.medicalhistory'
  )
  const medicalHistoryDesc = t(
    'ui.medicalformbuilder.form.type.medicalhistory.description'
  )
  const consentLabel = t('ui.medicalformbuilder.form.type.consent')
  const consentDesc = t('ui.medicalformbuilder.form.type.consent.description')
  const treatmentLabel = t('ui.medicalformbuilder.form.type.treatment')
  const treatmentDesc = t(
    'ui.medicalformbuilder.form.type.treatment.description'
  )
  const epaperLabel = t('ui.medicalformbuilder.form.type.epaper')
  const epaperDesc = t('ui.medicalformbuilder.form.type.epaper.description')
  const prescriptionLabel = t('ui.medicalformbuilder.form.type.prescription')
  const prescriptionDesc = t(
    'ui.medicalformbuilder.form.type.prescription.description'
  )
  const labLabel = t('ui.medicalformbuilder.form.type.lab')
  const labDesc = t('ui.medicalformbuilder.form.type.lab.description')

  const aligns = [
    styles.formTypeStart,
    styles.formTypeCenter,
    styles.formTypeEnd,
  ]
  const [formTypeInfo, setFormTypesInfo] = useState<FormTypeInfo>({})
  const showWarningMessage = (name) => {
    confirm({
      title: t('ui.medicalformbuilder.form.message.warning'),
      icon: <ExclamationCircleOutlined />,
      content: t('ui.medicalformbuilder.form.message.warning.change.message'),
      onOk() {
        goClickItem(name)
      },
      onCancel() {
        console.log('cancel')
      },
    })
  }

  const goClickItem = (name) => {
    const typeInfo = { ...formTypeInfo }
    const newValue = !typeInfo[name].selected
    for (const key of Object.keys(typeInfo)) {
      typeInfo[key].selected = false
    }
    typeInfo[name].selected = newValue
    setFormTypesInfo({ ...typeInfo })
    onChangeSetting({
      medicalHistory: typeInfo.medicalHistory.selected,
      consent: typeInfo.consent.selected,
      treatment: typeInfo.treatment.selected,
      epaper: typeInfo.epaper.selected,
      prescription: typeInfo.prescription.selected,
      lab: typeInfo.lab.selected,
    })
  }

  const handleClickItem = (name) => {
    const typeInfo = { ...formTypeInfo }
    if (typeInfo[name].selected === true) return

    if (isEditing?.() === true) {
      showWarningMessage(name)
      return
    }
    goClickItem(name)
  }

  useEffect(() => {
    const formTypeInfo: FormTypeInfo = {
      medicalHistory: {
        label: medicalHistoryLabel,
        selected: medicalFormType === 'questionnaire' ? true : false,
        desc: medicalHistoryDesc,
        icon: <MedicalHistory />,
        iconSelected: <MedicalHistorySelected />,
      },
      consent: {
        label: consentLabel,
        selected: medicalFormType === 'consent' ? true : false,
        desc: consentDesc,
        icon: <Consent />,
        iconSelected: <ConsentSelected />,
      },
      treatment: {
        label: treatmentLabel,
        selected: medicalFormType === 'treatment' ? true : false,
        desc: treatmentDesc,
        icon: <Treatment />,
        iconSelected: <TreatmentSelected />,
      },
      epaper: {
        label: epaperLabel,
        selected: medicalFormType === 'epaper' ? true : false,
        desc: epaperDesc,
        icon: <EPaper />,
        iconSelected: <EPaperSelected />,
      },
      prescription: {
        label: prescriptionLabel,
        selected: medicalFormType === 'prescription' ? true : false,
        desc: prescriptionDesc,
        icon: <Prescription />,
        iconSelected: <PrescriptionSelected />,
      },
      lab: {
        label: labLabel,
        selected: medicalFormType === 'lab' ? true : false,
        desc: labDesc,
        icon: <Lab />,
        iconSelected: <LabSelected />,
      },
    }
    setFormTypesInfo(formTypeInfo)
  }, [
    medicalFormType,
    medicalHistoryLabel,
    medicalHistoryDesc,
    consentLabel,
    consentDesc,
    treatmentLabel,
    treatmentDesc,
    epaperLabel,
    epaperDesc,
    prescriptionLabel,
    prescriptionDesc,
    labLabel,
    labDesc,
  ])

  return (
    <div className={styles.formTypeContainer}>
      <div className={styles.label}>{t('ui.medicalformbuilder.form.type')}</div>
      <Row>
        {Object.keys(formTypeInfo).map((key, index) => (
          <Col key={key} span={8} className={aligns[index % 3]}>
            <div className={styles.formTypeDiv}>
              {formTypeInfo[key].selected && (
                <CheckCircleFilled className={styles.formTypeChecked} />
              )}
              <Tooltip placement="topLeft" title={formTypeInfo[key].desc}>
                <div
                  className={
                    formTypeInfo[key].selected ? styles.formTypeSelected : ''
                  }
                >
                  <Button
                    className={styles.formTypeButton}
                    onClick={() => handleClickItem(key)}
                  >
                    {formTypeInfo[key].selected
                      ? formTypeInfo[key].iconSelected
                      : formTypeInfo[key].icon}
                  </Button>
                  <p className={styles.formTypeLabel}>
                    {formTypeInfo[key].label}
                  </p>
                </div>
              </Tooltip>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default FormType
