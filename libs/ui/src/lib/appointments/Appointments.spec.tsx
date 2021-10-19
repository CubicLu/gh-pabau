import React from 'react'
import { render } from '@testing-library/react'

import Appointments from './Appointments'
import { appointmentData } from './mock'

describe('Appointments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Appointments
        appointments={appointmentData}
        date={'2021-10-22T12:10:28+05:30'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
