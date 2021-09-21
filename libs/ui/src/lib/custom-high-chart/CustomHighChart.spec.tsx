import { render } from '@testing-library/react'
import React from 'react'
import CustomHighChart from './CustomHighChart'
const option = {}
describe('CustomHighChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomHighChart options={option} />)
    expect(baseElement).toBeTruthy()
  })
})
