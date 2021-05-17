import { Radio } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface P {
  title: string
  value: string
  onChangeInputType: (value: string) => void
}

const SettingElementTypeOption: FC<P> = ({
  title,
  value,
  onChangeInputType,
}) => {
  const { t } = useTranslation('common')
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

  const onInputTypeChange = (e) => {
    onChangeInputType?.(e.target.value)
  }
  return (
    <>
      <h3 style={{ marginTop: '20px' }}>{title}</h3>
      <Radio.Group
        options={typeOptions}
        value={value}
        onChange={onInputTypeChange}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  )
}

export default SettingElementTypeOption
