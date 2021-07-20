import { render } from '@testing-library/react'
import React from 'react'
import ClientTreatmentNotesLayout from './ClientTreatmentNotesLayout'

describe('ClientTreatmentNotesLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientTreatmentNotesLayout />)
    expect(baseElement).toBeTruthy()
  })
})
