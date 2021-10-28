import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { Button, ButtonTypes, OptionType, LabTestsListItem } from '@pabau/ui'
import { Checkbox, Input, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './Setting.module.less'

const { Option } = Select

interface P {
  onChange: (addedItems) => void
  paramItems: OptionType[]
  options?: LabTestsListItem[]
}

const SettingElementMultiSelect: FC<P> = ({
  onChange,
  paramItems,
  options = [],
}) => {
  const [items, setItems] = useState<number[]>([])
  useEffect(() => {
    console.log('paramItems', paramItems)
    setItems(paramItems.map((paramItem) => paramItem.id))
  }, [paramItems])

  const handleOptions = (value) => {
    const tempItems = options
      .filter((option) => value.includes(option.id))
      .map((item) => {
        return { id: item.id, name: item.name, editing: false }
      })
    setItems(tempItems.map((tempItem) => tempItem.id))
    onChange?.(tempItems)
  }

  return (
    <>
      <p style={{ marginTop: '20px' }}>Lab Tests</p>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        // placeholder={label}
        value={items}
        onChange={handleOptions}
      >
        {options?.length &&
          options.map((el, index) => (
            <Option key={`multiCheckBoxOption${index}`} value={el.id}>
              {el.name}
            </Option>
          ))}
      </Select>
    </>
  )
}

export default SettingElementMultiSelect
