import React from 'react'
import { render } from '@testing-library/react'

import PinScreen from './PinScreen'

describe('PinScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PinScreen />)
    expect(baseElement).toBeTruthy()
  })
})
