import { render } from '@testing-library/react'
import React from 'react'
import ClientLoyaltyLayout from './ClientLoyaltyLayout'

describe('ClientLoyaltyLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientLoyaltyLayout />)
    expect(baseElement).toBeTruthy()
  })
})
