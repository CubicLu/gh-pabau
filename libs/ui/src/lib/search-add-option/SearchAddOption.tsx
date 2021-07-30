import React, { FC } from 'react'
import { Select } from 'antd'
import styles from './SearchAddOption.module.less'
const { Option } = Select

export interface SearchAddOptionProps {
  label: string
  placeHolder: string
  options: Array<string | number>
  onChange
}

export const SearchAddOption: FC<SearchAddOptionProps> = ({
  label,
  placeHolder,
  options,
  onChange,
}) => {
  const handleChange = (value) => {
    onChange(value)
  }

  return (
    <div className={styles.searchAddOption}>
      <div className={styles.label}>{label}</div>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={[]}
        placeholder={placeHolder}
        onChange={handleChange}
      >
        {options?.length &&
          options.map((el, index) => (
            <Option key={`multiCheckBoxOption${index}`} value={el}>
              {el || ''}
            </Option>
          ))}
      </Select>
    </div>
  )
}

export default SearchAddOption
