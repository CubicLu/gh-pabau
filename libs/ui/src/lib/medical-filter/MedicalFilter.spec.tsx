import { render } from '@testing-library/react'
import React from 'react'
import MedicalFilter, { MedicalFilterType } from './MedicalFilter'

const defaultFilter: MedicalFilterType = {
  language: 'English (UK)',
  status: 'active',
  formtype: {
    medicalHistory: false,
    consent: false,
    treatment: false,
    epaper: false,
    prescription: false,
    lab: false,
  },
}

describe('MedicalFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MedicalFilter filter={defaultFilter} onApply={(val) => val} />
    )
    expect(baseElement).toBeTruthy()
  })
})
