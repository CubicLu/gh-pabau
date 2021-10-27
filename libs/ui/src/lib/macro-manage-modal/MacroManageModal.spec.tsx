import { render } from '@testing-library/react'
import React from 'react'
import { MacroManageModal } from './MacroManageModal'

describe('MacroManageModal', () => {
  it('should render successfully', () => {
    const props = {
      title: 'Manage macros',
      visible: false,
      macroItems: [],
    }
    const { baseElement } = render(<MacroManageModal {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
