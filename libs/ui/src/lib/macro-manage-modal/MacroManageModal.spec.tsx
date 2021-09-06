import React from 'react'
import { render } from '@testing-library/react'
import { MacroManageModal } from '@pabau/ui'

describe('MacroManageModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MacroManageModal macroItems={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
