import { render } from '@testing-library/react'
import React from 'react'
import CustomHighChart from './CustomHighChart'

describe('CustomHighChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomHighChart />)
    expect(baseElement).toBeTruthy()
  })
})
