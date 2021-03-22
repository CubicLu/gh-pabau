import { Radio } from 'antd'
import React, { FC } from 'react'

interface P {
  title: string
  value: string
  onChangeInputType: (value: string) => void
}

const typeOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Email', value: 'email' },
  { label: 'Number', value: 'number' },
  { label: 'Date', value: 'date' },
]

const SettingElementTypeOption: FC<P> = ({
  title,
  value,
  onChangeInputType,
}) => {
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
