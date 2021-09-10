/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FormTypeButton } from '@pabau/ui'
import { Modal, Row } from 'antd'
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
import {
  ReactComponent as Prescription,
  ReactComponent as PrescriptionSelected,
} from '../../assets/images/form-type/prescription.svg'
import { ReactComponent as TreatmentSelected } from '../../assets/images/form-type/treatment-selected.svg'
import { ReactComponent as Treatment } from '../../assets/images/form-type/treatment.svg'
import styles from './FormTypePicker.module.less'

const { confirm } = Modal

export interface Setting {
  medicalHistory: boolean
  consent: boolean
  treatment: boolean
  epaper: boolean
  prescription: boolean
  lab: boolean
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

export const FormTypePicker: FC<FormTypeProps> = ({
  isEditing,
  setting,
  onChangeSetting,
}) => {
  // const aligns = [
  //   styles.formTypeStart,
  //   styles.formTypeCenter,
  //   styles.formTypeEnd,
  // ]

  const { t } = useTranslation('common')

  const defaultTypeInfos: FormTypeInfo = {
    medicalHistory: {
      label: t('setup.medical.forms.filter.formType.medicalHistory.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.medicalHistory.desc'),
      icon: <MedicalHistory />,
      iconSelected: <MedicalHistorySelected />,
    },
    consent: {
      label: t('setup.medical.forms.filter.formType.consent.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.consent.desc'),
      icon: <Consent />,
      iconSelected: <ConsentSelected />,
    },
    treatment: {
      label: t('setup.medical.forms.filter.formType.treatment.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.treatment.desc'),
      icon: <Treatment />,
      iconSelected: <TreatmentSelected />,
    },
    epaper: {
      label: t('setup.medical.forms.filter.formType.ePaper.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.ePaper.desc'),
      icon: <EPaper />,
      iconSelected: <EPaperSelected />,
    },
    prescription: {
      label: t('setup.medical.forms.filter.formType.prescription.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.prescription.desc'),
      icon: <Prescription />,
      iconSelected: <PrescriptionSelected />,
    },
    lab: {
      label: t('setup.medical.forms.filter.formType.lab.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.lab.desc'),
      icon: <Lab />,
      iconSelected: <LabSelected />,
    },
  }

  const [formTypeInfo, setFormTypesInfo] =
    useState<FormTypeInfo>(defaultTypeInfos)

  const showWarningMessage = (name) => {
    confirm({
      title: t('setup.medical.forms.filter.formType.warning.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('setup.medical.forms.filter.formType.warning.content'),
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
      treatment: typeInfo.treatment.selected,
      epaper: typeInfo.epaper.selected,
      prescription: typeInfo.prescription.selected,
      lab: typeInfo.lab.selected,
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
    const typeInfo = { ...defaultTypeInfos }
    for (const key of Object.keys(setting)) {
      typeInfo[key].selected = setting[key]
    }
    setFormTypesInfo({ ...typeInfo })
  }, [setting])

  return (
    <div className={styles.formTypeContainer}>
      <div className={styles.label}>Form Type</div>
      <Row>
        {Object.keys(formTypeInfo).map((key, index) => (
          <FormTypeButton
            key={''}
            key1={''}
            formTypeInfo={formTypeInfo}
            aligns={[]}
            handleClickItem={handleClickItem}
            index={index}
          />
        ))}
      </Row>
    </div>
  )
}

export default FormTypePicker
