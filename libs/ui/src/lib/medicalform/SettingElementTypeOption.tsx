import { Radio } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface P {
  title: string
  value: string
  componentName: string
  onChangeInputType: (value: string) => void
}

const SettingElementTypeOption: FC<P> = ({
  title,
  value,
  componentName,
  onChangeInputType,
}) => {
  const { t } = useTranslation('common')
  const [optionValue, setOptionValue] = useState(
    componentName === 'basic_signature' && value === '' ? 'client' : value
  )

  const typeOptions = [
    {
      label: t('ui.medicalform.setting.advanced.inputtype.text'),
      value: 'text',
    },
    {
      label: t('ui.medicalform.setting.advanced.inputtype.email'),
      value: 'email',
    },
    {
      label: t('ui.medicalform.setting.advanced.inputtype.number'),
      value: 'number',
    },
    {
      label: t('ui.medicalform.setting.advanced.inputtype.date'),
      value: 'date',
    },
  ]

  const signatureOptions = [
    {
      label: t('ui.medicalform.setting.advanced.signatrue.client'),
      value: 'client',
    },
    {
      label: t('ui.medicalform.setting.advanced.signatrue.employee'),
      value: 'employee',
    },
    {
      label: t('ui.medicalform.setting.advanced.signatrue.prescriber'),
      value: 'prescriber',
    },
  ]

  const onInputTypeChange = (e) => {
    onChangeInputType?.(e.target.value)
    setOptionValue(e.target.value)
  }
  return (
    <>
      <h3 style={{ marginTop: '20px' }}>{title}</h3>
      <Radio.Group
        options={
          componentName === 'basic_signature' ? signatureOptions : typeOptions
        }
        value={optionValue}
        onChange={onInputTypeChange}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  )
}

export default SettingElementTypeOption
