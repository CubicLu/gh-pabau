import { render } from '@testing-library/react'
import React from 'react'
import { ClientDashboardLayout } from './ClientDashboardLayout'

describe('ClientDashboardLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientDashboardLayout />)
    expect(baseElement).toBeTruthy()
  })
})
