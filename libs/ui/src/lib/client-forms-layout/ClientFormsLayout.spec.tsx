import { render } from '@testing-library/react'
import React from 'react'
import ClientFormsLayout from './ClientFormsLayout'

describe('ClientFormsLayout', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
  })
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientFormsLayout
        formFilterButtons={[]}
        forms={[]}
        setFormFilterButtons={() => false}
        onFilterClick={() => Promise.resolve(true)}
        onShareCick={() => Promise.resolve(true)}
        onVersionClick={() => Promise.resolve(true)}
        onEditClick={() => Promise.resolve(true)}
        onPinClick={() => Promise.resolve(true)}
        onDeleteClick={() => Promise.resolve(true)}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
