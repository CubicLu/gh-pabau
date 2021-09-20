import { MailOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from '@pabau/ui'
import React, { FC } from 'react'

const EmailSendButton: FC<ButtonProps> = ({ disabled, ...props }) => {
  const handleBtnClick = async (e) => {
    await props.onClick?.(e)
    disabled = true
  }

  return (
    <Button {...props} onClick={handleBtnClick} disabled={disabled}>
      <MailOutlined /> {disabled ? 'Sent' : 'Email'}
    </Button>
  )
}

export default EmailSendButton
