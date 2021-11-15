import { InputWithTags, MedicalFormTypes } from '@pabau/ui'
import { Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './Setting.module.less'

interface P {
  title: string
  desc: string
  value: string
  valueWithTag: string
  componentName: string
  selectedForm: MedicalFormTypes
  onChangeQuestion: (value: string) => void
}

const SettingElementQuestion: FC<P> = ({
  title,
  desc,
  value,
  valueWithTag,
  componentName,
  selectedForm,
  onChangeQuestion,
}) => {
  const [triggerChangeValue, setTriggerChangeValue] = useState(false)

  useEffect(() => {
    setTriggerChangeValue((triggerChangeValue) => !triggerChangeValue)
  }, [selectedForm])

  const onTextChange = (e) => {
    onChangeQuestion?.(e.target.value)
  }
  const onTextWithTagChange = (e) => {
    onChangeQuestion?.(e)
  }

  return (
    <>
      <h3 style={{ marginTop: '5px' }}>{title}</h3>
      {componentName === 'basic_signature' ||
      componentName === 'basic_shortanswer' ||
      componentName === 'basic_longanswer' ||
      componentName === 'basic_singlechoice' ||
      componentName === 'basic_slider' ||
      componentName === 'basic_multiplechoice' ? (
        <div className={styles.defaultField}>
          <InputWithTags
            placeholder={desc}
            onChange={onTextWithTagChange}
            value={value}
            valueWithTag={valueWithTag}
            triggerChangeValue={triggerChangeValue}
            disabledTags={['leads', 'opportunity']}
          />
        </div>
      ) : (
        <Input placeholder={desc} onChange={onTextChange} value={value} />
      )}
    </>
  )
}

export default SettingElementQuestion
