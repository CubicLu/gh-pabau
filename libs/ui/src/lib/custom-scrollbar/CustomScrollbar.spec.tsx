import React from 'react'
import { render } from '@testing-library/react'

import CustomScrollbar from './CustomScrollbar'

describe('CustomScrollbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomScrollbar />)
    expect(baseElement).toBeTruthy()
  })
})
