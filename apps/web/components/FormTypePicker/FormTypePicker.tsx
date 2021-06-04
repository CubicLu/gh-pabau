/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Row } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
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
import { useTranslation } from 'react-i18next'
import styles from './FormTypePicker.module.less'
import { FormTypeButton } from '@pabau/ui'

const { confirm } = Modal

export interface Setting {
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
    treatmentForm: {
      label: t('setup.medical.forms.filter.formType.treatmentForm.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.treatmentForm.desc'),
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
    presciption: {
      label: t('setup.medical.forms.filter.formType.presciption.label'),

      selected: false,
      desc: t('setup.medical.forms.filter.formType.presciption.desc'),

      icon: <Presciption />,
      iconSelected: <PresciptionSelected />,
    },
    labForm: {
      label: t('setup.medical.forms.filter.formType.labForm.label'),
      selected: false,
      desc: t('setup.medical.forms.filter.formType.labForm.desc'),
      icon: <LabForm />,
      iconSelected: <LabFormSelected />,
    },
  }

  const [formTypeInfo, setFormTypesInfo] = useState<FormTypeInfo>(
    defaultTypeInfos
  )

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
