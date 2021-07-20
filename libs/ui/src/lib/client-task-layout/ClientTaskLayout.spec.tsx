import { render } from '@testing-library/react'
import React from 'react'
import ClientTaskLayout from './ClientTaskLayout'

describe('ClientTaskLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientTaskLayout />)
    expect(baseElement).toBeTruthy()
  })
})
