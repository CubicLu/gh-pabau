import { render } from '@testing-library/react'
import React from 'react'
import { ClientAppointments } from './ClientAppointments'

describe('ClientAppointmentsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientAppointments />)
    expect(baseElement).toBeTruthy()
  })
})
