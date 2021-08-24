import { render } from '@testing-library/react'
import React from 'react'
import ClientAppointmentsLayout from './ClientAppointmentsLayout'

describe('ClientAppointmentsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientAppointmentsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
