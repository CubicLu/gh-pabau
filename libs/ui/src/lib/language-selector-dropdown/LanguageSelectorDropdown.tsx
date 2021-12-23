import styles from './LanguageSelectorDropdown.module.less'
import { FormProps } from 'antd/lib/form'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Form, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { languageMenu } from '../../assets/images/lang-logos'

export interface LanguageSelectorDropdownProps extends FormProps {
  label?: string
  tooltip?: string
  value?: string
  size?: SizeType
  simple?: boolean
  onSelected?(value: string): void
}

export const LanguageSelectorDropdown: FC<LanguageSelectorDropdownProps> = ({
  label,
  tooltip,
  value,
  size = 'middle',
  onSelected,
  simple = false,
  ...props
}) => {
  const [form] = Form.useForm()
  const [selected, setSelected] = useState('English (UK)')
  const handleClickSelect = (e) => {
    const text = e.target.textContent
    setSelected(text.substring(text))
    onSelected?.(text.substring(text))
  }
  useEffect(() => {
    if (value) {
      setSelected(value)
    } else {
      setSelected('English (UK)')
    }
  }, [value, label, tooltip])
  return (
    <div className={styles.languageDropdownContainer}>
      {!simple ? (
        <Form form={form} layout="vertical" {...props}>
          <Form.Item label={label || ''} tooltip={tooltip || ''}>
            <Select
              value={selected}
              onClick={(e) => handleClickSelect(e)}
              size={size}
            >
              {languageMenu.map((lang, index) => (
                <Select.Option key={index} value={lang.label}>
                  {lang.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ) : (
        <Form.Item label={label || ''} tooltip={tooltip || ''}>
          <Select
            value={selected}
            onClick={(e) => handleClickSelect(e)}
            size={size}
          >
            {languageMenu.map((lang, index) => (
              <Select.Option key={index} value={lang.label}>
                {lang.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </div>
  )
}
export default LanguageSelectorDropdown
