import { OptionType } from '@pabau/ui'
import { Checkbox } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './FormComponent.module.less'

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  onChangeArrValue?: (value: string[]) => void
  values?: number[] | string[]
}

export const FormCheckBox: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeArrValue,
  values = [],
}) => {
  const [items, setItems] = useState<OptionType[]>([])
  const [addedItems, setaddedItems] = useState<string[]>([])

  useEffect(() => {
    setItems(paramItems)
  }, [paramItems])

  useEffect(() => {
    setaddedItems(values?.map((el) => el?.toString()))
  }, [values])

  const onChange = (e) => {
    let tempItems: string[] = []
    if (e.target.checked === true) {
      tempItems = [...addedItems, e.target.value.toString()]
    } else {
      tempItems = [...addedItems]
      const index = tempItems.indexOf(e.target.value.toString())
      if (index !== -1) {
        tempItems.splice(index, 1)
      }
    }
    setaddedItems(tempItems)
    onChangeArrValue?.(tempItems)
  }

  return (
    <div className={`${styles.formCheckBox} ${styles.formComponet}`}>
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
        <div className={styles.checkBoxOptions}>
          {items.map((item, index) => (
            <div key={index} className={styles.checkboxDiv}>
              <Checkbox
                value={item.id}
                className={`${styles.checkbox}`}
                onChange={onChange}
                checked={
                  addedItems?.includes(item.id?.toString()) ? true : false
                }
              >
                <span>{item.name}</span>
              </Checkbox>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FormCheckBox
