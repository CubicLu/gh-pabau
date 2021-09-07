import React from 'react'
import { render } from '@testing-library/react'
import { MacroCreateModal } from './MacroCreateModal'

describe('MacroCreateModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MacroCreateModal />)
    expect(baseElement).toBeTruthy()
  })
})
