import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { InputProps } from 'antd/lib/input'
import React, { PropsWithChildren } from 'react'

interface PasscodeProps extends InputProps {
  text?: string
  onChange?(val): void
}

export function Passcode({
  text,
  onChange,
  ...props
}: PropsWithChildren<PasscodeProps>): JSX.Element {
  const { t } = useTranslation('common')

  const handleInputChange = (e) => {
    const { value } = e.target
    const reg = /^\d*(\d*)?$/
    if (!Number.isNaN(value) && reg.test(value)) {
      onChange?.(value)
    }
  }
  return (
    <Input.Password
      maxLength={4}
      placeholder={t('account.settings.security.passcode.label')}
      iconRender={(visible) =>
        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
      }
      value={text}
      onChange={handleInputChange}
      {...props}
    />
  )
}
export default Passcode
