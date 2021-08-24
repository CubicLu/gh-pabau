import { render } from '@testing-library/react'
import React from 'react'
import ClientGiftVoucherLayout from './ClientGiftVoucherLayout'

describe('ClientGiftVoucherLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientGiftVoucherLayout />)
    expect(baseElement).toBeTruthy()
  })
})
