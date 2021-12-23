import React from 'react'
import { render } from '@testing-library/react'

import CloseButton from './CloseButton'

describe('CloseButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CloseButton />)
    expect(baseElement).toBeTruthy()
  })
})
