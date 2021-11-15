import React, { FC, useState, useEffect } from 'react'
import { Select } from 'antd'
import styles from './AddSuggestion.module.less'
import { CompanyListItem } from '@pabau/ui'
const { Option } = Select

export interface AddSuggestionProps {
  label: string
  defaultSelected: Array<string | number>
  options: CompanyListItem[]
  onChange: (value: Array<string | number>) => void
}

export const AddSuggestion: FC<AddSuggestionProps> = ({
  label,
  defaultSelected = [],
  options = [],
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultSelected)

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])

  const handleChange = (value) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <div className={styles.addSuggestion}>
      <div className={styles.label}>{label}</div>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={label}
        value={selected}
        onChange={handleChange}
      >
        {options?.length &&
          options.map((el, index) => (
            <Option key={`multiCheckBoxOption${index}`} value={el.id}>
              {el.name}
            </Option>
          ))}
      </Select>
    </div>
  )
}

export default AddSuggestion
