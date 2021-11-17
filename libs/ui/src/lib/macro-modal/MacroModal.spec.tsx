import React from 'react'
import { render } from '@testing-library/react'
import { MacroModal } from './MacroModal'

describe('MacroModal', () => {
  it('should render successfully', () => {
    const props = {
      title: 'Add a Macro',
      preMacroItems: [],
      visible: false,
    }
    const { baseElement } = render(<MacroModal {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
