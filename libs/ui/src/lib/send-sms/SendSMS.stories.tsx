import React, { useState } from 'react'
import SendSMS, { SendSMSProps, SMSItem } from './SendSMS'

export default {
  component: SendSMS,
  title: 'Client Card/Send SMS',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const SendSMSStory = ({ ...args }: SendSMSProps) => {
  const [items, setItems] = useState<SMSItem[]>([
    {
      direction: 'from',
      content: 'Random message from client',
      date: new Date().toString(),
    },
  ])
  const handleSendItem = (item: SMSItem) => {
    setItems([...items, item])
  }
  const templateList = [
    {
      id: 1,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 2,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 3,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 4,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 5,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 6,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 7,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 8,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 9,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
    {
      id: 10,
      message:
        'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
      name: 'Appointment Reminder',
    },
  ]
  return (
    <div style={{ width: '460px', height: 'calc(100vh - 76px)' }}>
      <SendSMS
        {...args}
        items={items}
        templateList={templateList}
        onSend={(item) => handleSendItem(item)}
      />
    </div>
  )
}
export const Basic = SendSMSStory.bind({})
