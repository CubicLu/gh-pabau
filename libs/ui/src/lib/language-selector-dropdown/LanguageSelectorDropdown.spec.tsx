import React from 'react'
import { render } from '@testing-library/react'

import LanguageSelectorDropdown from './LanguageSelectorDropdown'

describe('LanguageSelectorDropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LanguageSelectorDropdown />)
    expect(baseElement).toBeTruthy()
  })
})
