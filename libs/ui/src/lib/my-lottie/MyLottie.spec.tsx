import React from 'react'
import { render } from '@testing-library/react'

import MyLottie from './MyLottie'

describe('MyLottie', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyLottie />)
    expect(baseElement).toBeTruthy()
  })
})
