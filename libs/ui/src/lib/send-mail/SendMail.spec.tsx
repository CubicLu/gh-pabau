import { render } from '@testing-library/react'
import React from 'react'
import SendMail from './SendMail'

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
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
