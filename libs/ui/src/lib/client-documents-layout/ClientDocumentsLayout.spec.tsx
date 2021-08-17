import { render } from '@testing-library/react'
import React from 'react'
import ClientDocumentsLayout from './ClientDocumentsLayout'

describe('ClientDocumentsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientDocumentsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
