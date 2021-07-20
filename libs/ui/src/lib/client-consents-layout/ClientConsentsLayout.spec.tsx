import { render } from '@testing-library/react'
import React from 'react'
import ClientConsentsLayout from './ClientConsentsLayout'

describe('ClientConsentsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientConsentsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
