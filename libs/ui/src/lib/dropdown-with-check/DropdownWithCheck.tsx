import React, { FC, ReactNode, useState } from 'react'
import { Select, Tag } from 'antd'
import { SelectProps, SelectValue, LabeledValue } from 'antd/lib/select'
import { CheckOutlined } from '@ant-design/icons'
import styles from './DropdownWithCheck.module.less'

interface DropdownItemType {
  key: string
  label: string
  disable?: boolean
  tag?: string
}
export interface DropdownWithCheckProps extends SelectProps<SelectValue> {
  value?: string
  dropdownItems?: DropdownItemType[]
  placeHolderText?: string
  onSelected?: (value: number | LabeledValue) => void
  menuItemSelectedIcon?: ReactNode
}

export const DropdownWithCheck: FC<DropdownWithCheckProps> = ({
  value,
  dropdownItems = [],
  placeHolderText = '',
  size = 'middle',
  onSelected,
  menuItemSelectedIcon = <CheckOutlined />,
  ...props
}) => {
  return (
    <Select
      value={value === '' ? undefined : value}
      onSelect={(item) => onSelected?.(item as number | LabeledValue)}
      size={size}
      defaultValue={value === '' ? undefined : value}
      placeholder={placeHolderText}
      menuItemSelectedIcon={menuItemSelectedIcon}
      {...props}
      dropdownClassName={styles.dropdownWithCheck}
    >
      {dropdownItems?.map((item) => (
        <Select.Option key={item.key} value={item.key} disabled={item.disable}>
          {item.label} {item.tag && <Tag color="#c4c4c6">{item.tag}</Tag>}
        </Select.Option>
      ))}
    </Select>
  )
}

export default DropdownWithCheck
