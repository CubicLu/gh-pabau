import { render } from '@testing-library/react'
import React from 'react'
import SendMail from './SendMail'

const Contract = [
  {
    name: 'Contract name',
    email: 'contract@email.com',
  },
]
const Sender = {
  name: 'Sender name',
  email: 'sender@email.com',
}

const Draft = {
  sendTo: Contract,
  ccList: Contract,
  bccList: Contract,
  subject: 'Example subject line',
  sender: Sender,
  medicalForm: 'Example medical form string',
  message: 'Example message draft',
  secured: false,
}

describe('SendMail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SendMail
        senderList={[]}
        medicalFormList={[]}
        onSave={(mail) => {
          return
        }}
        onSend={(mail) => {
          return
        }}
        onDiscardDraft={() => {
          return
        }}
        onSaveDraft={(mail) => {
          return
        }}
        draft={Draft}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
