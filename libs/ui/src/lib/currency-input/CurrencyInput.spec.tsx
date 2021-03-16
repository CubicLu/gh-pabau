import React from 'react'
import { render } from '@testing-library/react'

import CurrencyInput from './CurrencyInput'

describe('CurrencyInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencyInput unit="$" />)
    expect(baseElement).toBeTruthy()
  })
})
