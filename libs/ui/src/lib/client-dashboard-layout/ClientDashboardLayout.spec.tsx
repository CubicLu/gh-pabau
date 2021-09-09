import { render } from '@testing-library/react'
import React from 'react'
import ClientDashboardLayout from './ClientDashboardLayout'

describe('ClientDashboardLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientDashboardLayout
        nextAppointments={[]}
        medicalHistory={[]}
        medications={[]}
        products={[]}
        tests={[]}
        alerts={[]}
        conversation={{ category: '', users: [] }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
