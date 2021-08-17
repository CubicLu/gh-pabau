import { render } from '@testing-library/react'
import React from 'react'
import ClientMedicalHistoryLayout from './ClientMedicalHistoryLayout'

describe('ClientMedicalHistoryLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientMedicalHistoryLayout />)
    expect(baseElement).toBeTruthy()
  })
})
