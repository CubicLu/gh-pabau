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
      <SendMail
        {...args}
        draft={{
          sendTo: [],
          ccList: [],
          bccList: [],
          secured: false,
          sender: { name: '', email: '' },
          subject: '',
          message: '',
          medicalForm: '',
        }}
        senderList={[
          {
            name: 'The London Skin and Hair Clinic',
            email: 'doctor@LSAH.co.uk',
          },
        ]}
        medicalFormList={[]}
        onSend={(mail) => {
          console.log('Send mail >>>')
        }}
        onSave={(mail) => {
          console.log('Save mail >>>')
        }}
        onDiscardDraft={() => {
          console.log('Discard draft >>>')
        }}
        onSaveDraft={(draft) => {
          console.log('Save Draft')
        }}
      />
    </div>
  )
}

export const Basic = SendMailStory.bind({})
Basic.args = {}
