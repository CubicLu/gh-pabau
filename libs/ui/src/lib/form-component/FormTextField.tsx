import { DatePicker, Input, InputNumber } from 'antd'
import React, { FC, useState } from 'react'
import styles from './FormComponent.module.less'

interface P {
  title: string
  desc: string
  placeHolder: string
  defaultValue: string
  txtInputType: string
  required: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormTextField: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  txtInputType = '',
  required = false,
  onChangeTextValue,
}) => {
  const [text, setText] = useState(defaultValue)

  const onTextChange = (e) => {
    setText?.(e.target.value)
    onChangeTextValue?.(e.target.value)
  }

  const onNumberChange = (e) => {
    setText?.(e)
    onChangeTextValue?.(e)
  }

  function onDateChange(date, dateString) {
    onChangeTextValue?.(dateString)
  }

  return (
    <div className={`${styles.formTextField} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}
      <div className={styles.textFieldValue}>
        {(txtInputType === '' ||
          txtInputType === 'email' ||
          txtInputType === 'text') && (
          <Input
            placeholder={placeHolder}
            onChange={onTextChange}
            value={text}
          />
        )}
        {txtInputType === 'number' && (
          <InputNumber
            placeholder={placeHolder}
            onChange={onNumberChange}
            value={Number(text)}
          />
        )}
        {txtInputType === 'date' && (
          <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
        )}
      </div>
    </div>
  )
}

export default FormTextField
