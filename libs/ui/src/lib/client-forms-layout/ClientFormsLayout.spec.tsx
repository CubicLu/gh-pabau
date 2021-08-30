import { render } from '@testing-library/react'
import React from 'react'
import ClientFormsLayout from './ClientFormsLayout'

describe('ClientFormsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientFormsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
