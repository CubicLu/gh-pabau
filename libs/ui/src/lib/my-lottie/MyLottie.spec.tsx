import React from 'react'
import { render } from '@testing-library/react'

import MyLottie from './MyLottie'

describe('MyLottie', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MyLottie options={{ animationData: [] }} height={500} width={500} />
    )
    expect(baseElement).toBeTruthy()
  })
})
