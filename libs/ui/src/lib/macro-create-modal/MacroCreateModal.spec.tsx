import React from 'react'
import { render } from '@testing-library/react'
import { MacroCreateModal } from '@pabau/ui'

describe('MacroCreateModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MacroCreateModal />)
    expect(baseElement).toBeTruthy()
  })
})
