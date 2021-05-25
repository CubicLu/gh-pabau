import React from 'react'
import SendSMS, { SendSMSProps } from './SendSMS'

export default {
  component: SendSMS,
  title: 'Client Card/Send SMS',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const SendSMSStory = ({ ...args }: SendSMSProps) => {
  return (
    <div style={{ width: '460px', height: 'calc(100vh - 76px)' }}>
      <SendSMS {...args} id="" clientId="" />
    </div>
  )
}

export const Basic = SendSMSStory.bind({})
