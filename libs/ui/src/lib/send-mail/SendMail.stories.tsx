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
        width: 'calc(100vw - 60px)',
        height: 'calc(100vh - 60px)',
        border: '1px solid var(--border-color-base)',
      }}
    >
      <SendMail
        {...args}
        receiverData=""
        client={{ id: '', name: '', email: '' }}
      />
    </div>
  )
}

export const Basic = SendMailStory.bind({})
Basic.args = {}
