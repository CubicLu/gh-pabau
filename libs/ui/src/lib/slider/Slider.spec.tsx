import React from 'react'
import { render } from '@testing-library/react'

import Slider from './Slider'

describe('Slider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Slider title={'Example title'} value={1} calculatedValue={'1'} />
    )
    expect(baseElement).toBeTruthy()
  })
})
