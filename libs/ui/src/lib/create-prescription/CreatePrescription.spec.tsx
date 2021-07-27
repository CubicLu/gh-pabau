import { render } from '@testing-library/react'
import React from 'react'
import CreatePrescription from './CreatePrescription'

describe('CreatePrescription', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CreatePrescription
        receiverData=""
        client={{ id: '', email: '', name: '' }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
