import React from 'react'
import { render } from '@testing-library/react'
import { MacroModal } from '@pabau/ui'

describe('MacroModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MacroModal />)
    expect(baseElement).toBeTruthy()
  })
})
