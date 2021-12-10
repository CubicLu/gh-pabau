import { Form, Input as AntInput } from 'antd'
import { FormProps, Rule } from 'antd/lib/form'
import React, { PropsWithChildren, useEffect, useState, ReactNode } from 'react'
import styles from './Input.module.less'

export enum ButtonSize {
  small = 'small',
  middle = 'middle',
  large = 'large',
}
export interface CheckBoxProps extends FormProps {
  label?: string | JSX.Element
  text?: string
  size?: ButtonSize
  disabled?: boolean
  placeHolderText?: string
  reqiredMsg?: string
  type?: string
  tooltip?: string
  suffix?: ReactNode
  onChange?(val): void
  maxLength?: number
}

export function Input({
  text,
  label,
  size,
  disabled,
  placeHolderText,
  requiredMark = false,
  reqiredMsg,
  type,
  tooltip,
  suffix,
  maxLength,
  onChange,
  ...props
}: PropsWithChildren<CheckBoxProps>): JSX.Element {
  const [form] = Form.useForm()
  const [rules, setRules] = useState<Rule[]>([])
  const handleInputChange = (e) => {
    onChange?.(e.target.value)
  }

  useEffect(() => {
    let items: Rule[] = []
    if (requiredMark) {
      items = [
        ...items,
        {
          required: true,
          message: reqiredMsg ? reqiredMsg : '',
        },
      ]
    }
    if (type === 'email') {
      items = [
        ...items,
        {
          type: 'email',
          message: 'Please enter valid email!',
        },
      ]
    }
    setRules(items)
  }, [requiredMark, reqiredMsg, type])

  return (
    <div className={styles.inputContainer}>
      <Form
        {...props}
        form={form}
        requiredMark={requiredMark}
        layout="vertical"
        initialValues={{ 'input-item': text }} // Use initialValues when using form
      >
        <Form.Item
          label={label ? label : ''}
          tooltip={tooltip ? tooltip : ''}
          name="input-item"
          rules={rules}
        >
          <AntInput
            className="input-style"
            placeholder={placeHolderText}
            value={text}
            // defaultValue={text}
            size={size}
            suffix={suffix}
            disabled={disabled}
            onChange={(e) => handleInputChange(e)}
            maxLength={maxLength}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Input
