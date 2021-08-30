import React, { FC, useState } from 'react'
import { Select, Form } from 'antd'
import { FormProps } from 'antd/lib/form'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import styles from './DropdownWithIcon.module.less'

export interface DropdownWithIconOption {
  label: string
  icon: string
}

export interface DropdownWithIconProps extends FormProps {
  label?: string
  tooltip?: string
  value?: DropdownWithIconOption
  size?: SizeType
  onSelected?(val): void
  options: DropdownWithIconOption[]
  disabled?: boolean
}

export const DropdownWithIcon: FC<DropdownWithIconProps> = ({
  label,
  tooltip,
  value,
  size = 'middle',
  onSelected,
  options,
  disabled = false,
  ...props
}) => {
  const [form] = Form.useForm()
  const [selected, setSelected] = useState(value ? value : options[0])
  const handleClickSelect = (e) => {
    let selectedItem = e.target.parentNode.getAttribute('item')
    if (selectedItem == null) return

    selectedItem = JSON.parse(selectedItem)
    setSelected(selectedItem)
    onSelected?.(selectedItem)
  }

  return (
    <div className={styles.dropdownContainerWithIcon}>
      <Form form={form} layout="vertical" {...props}>
        <Form.Item label={label ? label : ''} tooltip={tooltip ? tooltip : ''}>
          <Select
            value={selected.label}
            onClick={(e) => handleClickSelect(e)}
            size={size}
            disabled={disabled}
          >
            {options.map((opt, index) => (
              <Select.Option
                key={index}
                value={opt.label}
                item={JSON.stringify(opt)}
              >
                <img
                  alt={opt.label}
                  src={opt.icon}
                  style={{ width: '18px', marginBottom: '2px' }}
                />{' '}
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}
export default DropdownWithIcon
