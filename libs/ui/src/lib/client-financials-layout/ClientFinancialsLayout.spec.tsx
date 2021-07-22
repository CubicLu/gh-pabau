import { render } from '@testing-library/react'
import React from 'react'
import ClientFinancialsLayout from './ClientFinancialsLayout'

describe('ClientFinancialsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientFinancialsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
