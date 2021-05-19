import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Tooltip } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ConsentSelected } from '../../assets/images/form-type/consent-selected.svg'
import { ReactComponent as Consent } from '../../assets/images/form-type/consent.svg'
import { ReactComponent as EPaperSelected } from '../../assets/images/form-type/file-pdf-selected.svg'
import { ReactComponent as EPaper } from '../../assets/images/form-type/file-pdf.svg'
import { ReactComponent as LabFormSelected } from '../../assets/images/form-type/lab-form-selected.svg'
import { ReactComponent as LabForm } from '../../assets/images/form-type/lab-form.svg'
import { ReactComponent as MedicalHistorySelected } from '../../assets/images/form-type/medical-history-selected.svg'
import { ReactComponent as MedicalHistory } from '../../assets/images/form-type/medical-history.svg'
import { ReactComponent as PresciptionSelected } from '../../assets/images/form-type/presciption-selected.svg'
import { ReactComponent as Presciption } from '../../assets/images/form-type/presciption.svg'
import { ReactComponent as TreatmentSelected } from '../../assets/images/form-type/treatment-selected.svg'
import { ReactComponent as Treatment } from '../../assets/images/form-type/treatment.svg'
import styles from './FormType.module.less'

const { confirm } = Modal

interface Setting {
  medicalHistory: boolean
  consent: boolean
  treatmentForm: boolean
  epaper: boolean
  presciption: boolean
  labForm: boolean
}
export interface FormTypeProps {
  isEditing?: () => boolean
  setting: Setting
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
  setting,
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
  const treatmentFormLabel = t('ui.medicalformbuilder.form.type.treatment')
  const treatmentFormDesc = t(
    'ui.medicalformbuilder.form.type.treatment.description'
  )
  const epaperLabel = t('ui.medicalformbuilder.form.type.epaper')
  const epaperDesc = t('ui.medicalformbuilder.form.type.epaper.description')
  const presciptionLabel = t('ui.medicalformbuilder.form.type.presciption')
  const presciptionDesc = t(
    'ui.medicalformbuilder.form.type.presciption.description'
  )
  const labFormLabel = t('ui.medicalformbuilder.form.type.lab')
  const labFormDesc = t('ui.medicalformbuilder.form.type.lab.description')

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
    for (const key of Object.keys(setting)) {
      typeInfo[key].selected = false
    }
    typeInfo[name].selected = newValue
    setFormTypesInfo({ ...typeInfo })
    onChangeSetting({
      medicalHistory: typeInfo.medicalHistory.selected,
      consent: typeInfo.consent.selected,
      treatmentForm: typeInfo.treatmentForm.selected,
      epaper: typeInfo.epaper.selected,
      presciption: typeInfo.presciption.selected,
      labForm: typeInfo.labForm.selected,
    })
  }

  const handleClickItem = (name) => {
    if (isEditing?.() === true) {
      showWarningMessage(name)
      return
    }
    goClickItem(name)
  }

  useEffect(() => {
    const defaultTypeInfos: FormTypeInfo = {
      medicalHistory: {
        label: medicalHistoryLabel,
        selected: false,
        desc: medicalHistoryDesc,
        icon: <MedicalHistory />,
        iconSelected: <MedicalHistorySelected />,
      },
      consent: {
        label: consentLabel,
        selected: false,
        desc: consentDesc,
        icon: <Consent />,
        iconSelected: <ConsentSelected />,
      },
      treatmentForm: {
        label: treatmentFormLabel,
        selected: false,
        desc: treatmentFormDesc,
        icon: <Treatment />,
        iconSelected: <TreatmentSelected />,
      },
      epaper: {
        label: epaperLabel,
        selected: false,
        desc: epaperDesc,
        icon: <EPaper />,
        iconSelected: <EPaperSelected />,
      },
      presciption: {
        label: presciptionLabel,
        selected: false,
        desc: presciptionDesc,
        icon: <Presciption />,
        iconSelected: <PresciptionSelected />,
      },
      labForm: {
        label: labFormLabel,
        selected: false,
        desc: labFormDesc,
        icon: <LabForm />,
        iconSelected: <LabFormSelected />,
      },
    }
    const typeInfo = { ...defaultTypeInfos }
    for (const key of Object.keys(setting)) {
      typeInfo[key].selected = setting[key]
    }
    setFormTypesInfo({ ...typeInfo })
  }, [
    setting,
    medicalHistoryLabel,
    medicalHistoryDesc,
    consentLabel,
    consentDesc,
    treatmentFormLabel,
    treatmentFormDesc,
    epaperLabel,
    epaperDesc,
    presciptionLabel,
    presciptionDesc,
    labFormLabel,
    labFormDesc,
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
