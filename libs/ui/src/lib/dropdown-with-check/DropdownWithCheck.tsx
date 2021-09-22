import React, { FC, ReactNode, useState } from 'react'
import { Select } from 'antd'
import { SelectProps, SelectValue, LabeledValue } from 'antd/lib/select'
import { CheckOutlined } from '@ant-design/icons'
import styles from './DropdownWithCheck.module.less'

interface DropdownItemType {
  key: string
  label: string
}
export interface DropdownWithCheckProps extends SelectProps<SelectValue> {
  value?: string
  dropdownItems?: DropdownItemType[]
  placeHolderText?: string
  onSelected?: (value: string | number | LabeledValue) => void
  optionLabelProp?: string
  menuItemSelectedIcon?: ReactNode
}

export const DropdownWithCheck: FC<DropdownWithCheckProps> = ({
  value,
  dropdownItems = [],
  placeHolderText = '',
  size = 'middle',
  onSelected,
  optionLabelProp = 'value',
  menuItemSelectedIcon = <CheckOutlined />,
  ...props
}) => {
  return (
    <Select
      value={value === '' ? undefined : value}
      onSelect={(item) => onSelected?.(item)}
      size={size}
      defaultValue={value === '' ? undefined : value}
      placeholder={placeHolderText}
      optionLabelProp={optionLabelProp}
      menuItemSelectedIcon={menuItemSelectedIcon}
      {...props}
      dropdownClassName={styles.dropdownWithCheck}
    >
      {dropdownItems?.map((item) => (
        <Select.Option key={item.key} value={item.key} >
          {item.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default DropdownWithCheck
