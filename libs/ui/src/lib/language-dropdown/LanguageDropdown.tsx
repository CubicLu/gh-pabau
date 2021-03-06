import { Form, Select } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { FormProps } from 'antd/lib/form'
import React, { FC, useEffect, useState } from 'react'
import { languageMenu } from '../../assets/images/lang-logos'
import styles from './LanguageDropdown.module.less'

export interface LanguageDropdownProps extends FormProps {
  label?: string
  tooltip?: string
  value?: string
  size?: SizeType
  onSelected?(val): void
  simple?: boolean
}

export const LanguageDropdown: FC<LanguageDropdownProps> = ({
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
    setSelected(text.substring(1, text.length))
    onSelected?.(text.substring(1, text.length))
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
          <Form.Item
            label={label ? label : ''}
            tooltip={tooltip ? tooltip : ''}
          >
            <Select
              value={selected}
              onClick={(e) => handleClickSelect(e)}
              size={size}
            >
              {languageMenu.map((lang, index) => (
                <Select.Option key={index} value={lang.label}>
                  <img
                    alt={lang.label}
                    src={lang.logo}
                    style={{ width: '18px', marginBottom: '2px' }}
                  />{' '}
                  {lang.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ) : (
        <Form.Item label={label ? label : ''} tooltip={tooltip ? tooltip : ''}>
          <Select
            value={selected}
            onClick={(e) => handleClickSelect(e)}
            size={size}
          >
            {languageMenu.map((lang, index) => (
              <Select.Option key={index} value={lang.label}>
                <img
                  alt={lang.label}
                  src={lang.logo}
                  style={{ width: '18px', marginBottom: '2px' }}
                />{' '}
                {lang.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </div>
  )
}
export default LanguageDropdown
