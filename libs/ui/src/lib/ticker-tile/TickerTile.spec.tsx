import { render } from '@testing-library/react'
import React from 'react'
import TickerTile from './TickerTile'

describe('TickerTile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TickerTile items={[]} speed={1000} title="medical history" />
    )
    expect(baseElement).toBeTruthy()
  })
})
