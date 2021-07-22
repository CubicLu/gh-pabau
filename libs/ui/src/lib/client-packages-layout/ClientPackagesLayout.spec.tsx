import { render } from '@testing-library/react'
import React from 'react'
import ClientPackagesLayout from './ClientPackagesLayout'

describe('ClientPackagesLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientPackagesLayout />)
    expect(baseElement).toBeTruthy()
  })
})
