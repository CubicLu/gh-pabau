import { Input } from 'antd'
import React, { FC, useState } from 'react'
import styles from './FormComponent.module.less'

const { TextArea } = Input

interface P {
  title: string
  desc: string
  placeHolder: string
  defaultValue: string
  required: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormTextArea: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  required = false,
  onChangeTextValue,
}) => {
  const [text, setText] = useState(defaultValue)

  const onTextChange = (e) => {
    setText?.(e.target.value)
    onChangeTextValue?.(e.target.value)
  }
  return (
    <div className={`${styles.formTextArea} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}
      <div className={styles.formTextAreaValue}>
        <TextArea
          placeholder={placeHolder}
          onChange={onTextChange}
          value={text}
          rows={4}
        />
      </div>
    </div>
  )
}

export default FormTextArea
