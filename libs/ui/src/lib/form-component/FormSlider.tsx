import { OptionType, SliderCustom } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import styles from './FormComponent.module.less'

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormSlider: FC<P> = ({
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
    setOptionVal(e.id)
    onChangeTextValue?.(e.id)
  }

  return (
    <div className={`${styles.formSlider} ${styles.formComponet}`}>
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
        <div className={styles.formSliderOptions}>
          <SliderCustom
            data={items?.map((item) => {
              return {
                id: item.id,
                name: item.name,
              }
            })}
            handleChange={onChange}
            value={optionVal}
          />
        </div>
      )}
    </div>
  )
}

export default FormSlider
