import { UserOutlined } from '@ant-design/icons'
import { Input, Tooltip } from 'antd'
import React, { PropsWithChildren } from 'react'
import styles from './Input.module.less'

interface InputWithHelperProps {
  help: string
  value: string
  onChangeValue: (e: string) => void
}

export function InputWithHelper({
  help,
  value,
  onChangeValue,
}: PropsWithChildren<InputWithHelperProps>): JSX.Element {
  const onChange = (e) => {
    onChangeValue(e.target.value)
  }

  return (
    <Input
      onChange={(e) => onChange(e)}
      className={styles.optionInput}
      value={value}
      suffix={
        <Tooltip title={help} placement="topRight">
          <UserOutlined />
        </Tooltip>
      }
    />
  )
}

export default InputWithHelper
