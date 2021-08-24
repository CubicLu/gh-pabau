import React from 'react'
import { render } from '@testing-library/react'
import { chartData } from './mock'

import CircleGraph from './CircleGraph'

describe('CircleGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CircleGraph chartData={chartData} />)
    expect(baseElement).toBeTruthy()
  })
})
