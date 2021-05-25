import React from 'react'
import SendMail from './SendMail'

export default {
  component: SendMail,
  title: 'Client Card/Send Mail',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const SendMailStory = ({ ...args }) => {
  return (
    <div
      style={{
        width: '752px',
        height: '824px',
        border: '1px solid var(--border-color-base)',
      }}
    >
      <SendMail {...args} id="" clientId="" />
    </div>
  )
}

export const Basic = SendMailStory.bind({})
Basic.args = {}
