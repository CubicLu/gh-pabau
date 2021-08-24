import { render } from '@testing-library/react'
import React from 'react'
import SendMail from './SendMail'

describe('SendMail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SendMail client={{ id: '', name: '', email: '' }} receiverData={''} />
    )
    expect(baseElement).toBeTruthy()
  })
})
