import { render } from '@testing-library/react'
import React from 'react'
import ClientVaccineHistoryLayout from './ClientVaccineHistoryLayout'

describe('ClientVaccineHistoryLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientVaccineHistoryLayout />)
    expect(baseElement).toBeTruthy()
  })
})
