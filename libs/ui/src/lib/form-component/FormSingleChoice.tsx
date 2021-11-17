import { OptionType } from '@pabau/ui'
import { Radio } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './FormComponent.module.less'

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormSingleChoice: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeTextValue,
}) => {
  const [items, setItems] = useState<OptionType[]>([])
  const [optionVal, setOptionVal] = useState(-1)

  useEffect(() => {
    setItems(paramItems)
  }, [paramItems])

  const onChange = (e) => {
    setOptionVal(e.target.value)
    onChangeTextValue?.(e.target.value)
  }

  return (
    <div
      className={
        items.length === 2 &&
        (items[0].name.toUpperCase() === 'NO' ||
          items[0].name.toUpperCase() === 'YES') &&
        (items[1].name.toUpperCase() === 'YES' ||
          items[1].name.toUpperCase() === 'NO')
          ? `${styles.formSingleChoice} ${styles.formComponet}`
          : `${styles.formSingleChoiceYesNo} ${styles.formComponet}`
      }
    >
      {title.length > 0 && (
        <div
          className={
            items.length === 2 &&
            (items[0].name.toUpperCase() === 'NO' ||
              items[0].name.toUpperCase() === 'YES') &&
            (items[1].name.toUpperCase() === 'YES' ||
              items[1].name.toUpperCase() === 'NO')
              ? styles.formSingleChoiceTitle
              : styles.formComponentTitle
          }
        >
          {title}
          {required && (
            <span
              className={
                items.length === 2 &&
                (items[0].name.toUpperCase() === 'NO' ||
                  items[0].name.toUpperCase() === 'YES') &&
                (items[1].name.toUpperCase() === 'YES' ||
                  items[1].name.toUpperCase() === 'NO')
                  ? styles.formSingleChoiceRequiredMark
                  : styles.formRequiredMark
              }
            >
              *
            </span>
          )}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      {items.length > 0 && (
        <div
          className={
            items.length === 2 &&
            (items[0].name.toUpperCase() === 'NO' ||
              items[0].name.toUpperCase() === 'YES') &&
            (items[1].name.toUpperCase() === 'YES' ||
              items[1].name.toUpperCase() === 'NO')
              ? styles.formSingleOptionsYesNo
              : styles.formSingleOptions
          }
        >
          <Radio.Group size="small" onChange={onChange} value={optionVal}>
            {items.map((item, index) => (
              <div key={index} className={styles.radioDiv}>
                <Radio value={item.id}>
                  <span>{item.name}</span>
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      )}
    </div>
  )
}

export default FormSingleChoice
