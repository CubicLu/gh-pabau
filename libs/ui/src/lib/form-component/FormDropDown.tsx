import { OptionType } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './FormComponent.module.less'
const { Option } = Select

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  onChangeTextValue?: (value: string) => void
  value?: number | string
}

export const FormDropDown: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeTextValue,
  value,
}) => {
  const [items, setItems] = useState<OptionType[]>([])
  const [selected, setSelected] = useState<number>(0)

  useEffect(() => {
    setItems(paramItems)
  }, [paramItems])

  useEffect(() => {
    if (Number(value) === 0 || value) {
      setSelected(Number(value))
    }
  }, [value])

  const onChange = (e) => {
    setSelected(e)
    onChangeTextValue?.(e.toString())
  }

  return (
    <div className={`${styles.formDropDown} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      {items.length > 0 && (
        <div className={styles.formDropDownOptions}>
          <Select
            size="large"
            style={{ width: '100%', marginTop: '10px' }}
            onChange={onChange}
            value={selected}
          >
            {items.map((item, index) => (
              <Option key={index} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  )
}

export default FormDropDown
