import { render } from '@testing-library/react'
import React from 'react'
import ClientLabTestsLayout from './ClientLabTestsLayout'

describe('ClientLabTestsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientLabTestsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
