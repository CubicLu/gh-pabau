import { CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { PropsWithChildren, useState } from 'react'
import styles from './Checkbox.module.less'

interface CheckboxProps {
  label?: string
  disabled?: boolean
  size?: SizeType
  onChange?: () => void
}

export function ButtonCheckbox({
  label,
  disabled,
  size = 'large',
  onChange,
}: PropsWithChildren<CheckboxProps>): JSX.Element {
  const [activate, setActivate] = useState(true)
  return (
    <div className={styles.buttonCheckbox}>
      <Button
        shape="round"
        onClick={() => setActivate((activate) => !activate)}
        icon={activate === true ? <CheckOutlined /> : ''}
        className={activate === true ? styles.chkActive : styles.chkInActive}
        disabled={disabled}
        size={size}
      >
        <span>{label}</span>
      </Button>
    </div>
  )
}

export default ButtonCheckbox
