import { render } from '@testing-library/react'
import React from 'react'
import PaymentMethods from './PaymentMethods'

describe('PaymentMethods', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PaymentMethods
        methods={[]}
        onChange={(methods) => {
          return
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
