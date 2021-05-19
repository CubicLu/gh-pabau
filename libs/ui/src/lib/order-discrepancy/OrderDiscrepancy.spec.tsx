import React from 'react'
import { render } from '@testing-library/react'

import OrderDiscrepancy from './OrderDiscrepancy'

const WordAsProp = 1

describe('OrderDiscrepancy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <OrderDiscrepancy number={1} word={WordAsProp} />
    )
    expect(baseElement).toBeTruthy()
  })
})
