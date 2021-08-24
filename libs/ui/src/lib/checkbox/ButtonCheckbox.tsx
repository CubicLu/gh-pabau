import { CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { PropsWithChildren } from 'react'
import styles from './Checkbox.module.less'

interface CheckboxProps {
  label?: string
  disabled?: boolean
  checked?: boolean
  icon?: JSX.Element
  onChange?: (val?: boolean) => void
  size?: SizeType
}

export function ButtonCheckbox({
  label,
  disabled,
  checked = true,
  icon,
  size = 'large',
  onChange,
}: PropsWithChildren<CheckboxProps>): JSX.Element {
  return (
    <div className={styles.buttonCheckbox}>
      <Button
        shape="round"
        onClick={() => {
          onChange?.(!checked)
        }}
        icon={checked === true ? icon || <CheckOutlined /> : icon || ''}
        className={checked === true ? styles.chkActive : styles.chkInActive}
        disabled={disabled}
        size={size}
      >
        <span>{label}</span>
      </Button>
    </div>
  )
}

export default ButtonCheckbox
