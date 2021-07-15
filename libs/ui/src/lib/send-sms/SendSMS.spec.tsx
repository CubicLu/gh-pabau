import { render } from '@testing-library/react'
import React from 'react'
import SendSMS from './SendSMS'

describe('SendSMS', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SendSMS receiverData="" client={{ id: '', email: '', name: '' }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
