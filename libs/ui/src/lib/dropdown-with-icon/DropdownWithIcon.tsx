import React, { FC, useState } from 'react'
import { Select, Form, Tooltip } from 'antd'
import { FormProps } from 'antd/lib/form'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import styles from './DropdownWithIcon.module.less'
import EmployeeImg from './employee.png'
import { getImage } from './../../helper/uploaders/UploadHelpers'

export interface DropdownWithIconOption {
  id?: string | number
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
  profileError?: boolean
}

export const DropdownWithIcon: FC<DropdownWithIconProps> = ({
  label,
  tooltip,
  value,
  size = 'middle',
  onSelected,
  options,
  disabled = false,
  profileError = false,
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

  const content = () => {
    return (
      <>
        {profileError === true && (
          <div className={styles.dropdownPictureError}></div>
        )}
        <Select
          value={selected.label}
          onClick={(e) => handleClickSelect(e)}
          size={size}
          disabled={disabled}
        >
          {options.map((opt, index) => {
            const img = opt.icon ? getImage(opt.icon) : EmployeeImg
            return (
              <Select.Option
                key={index}
                value={opt.label}
                item={JSON.stringify(opt)}
              >
                <img
                  alt={opt.label}
                  src={img}
                  style={{
                    width: '18px',
                    marginBottom: '2px',
                    borderRadius: '50%',
                  }}
                />{' '}
                {opt.label}
              </Select.Option>
            )
          })}
        </Select>
      </>
    )
  }

  return (
    <div className={styles.dropdownContainerWithIcon}>
      <Form form={form} layout="vertical" {...props}>
        <Form.Item label={label ? label : ''} tooltip={tooltip ? tooltip : ''}>
          {profileError ? (
            <Tooltip
              placement="bottom"
              title={"This employee can't perform this service"}
            >
              {content()}
            </Tooltip>
          ) : (
            content()
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
export default DropdownWithIcon
