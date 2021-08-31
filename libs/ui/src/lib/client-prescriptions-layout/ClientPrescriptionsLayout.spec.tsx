import { render } from '@testing-library/react'
import React from 'react'
import ClientPrescriptionsLayout from './ClientPrescriptionsLayout'

describe('ClientPrescriptionsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientPrescriptionsLayout
        prescriptions={[]}
        onPreviewClick={() => Promise.resolve(true)}
        onPrintClick={() => Promise.resolve(true)}
        onShareClick={() => Promise.resolve(true)}
        onEditClick={() => Promise.resolve(true)}
        onRepeatClick={() => Promise.resolve(true)}
        onDeleteClick={() => Promise.resolve(true)}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
