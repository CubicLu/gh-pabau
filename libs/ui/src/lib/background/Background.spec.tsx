import React from 'react'
import { render } from '@testing-library/react'

import Background from './Background'

describe('Background', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Background
        list={[
          {
            name: 'List element 1',
            color: 'red',
          },
        ]}
        defaultSelectedColor={''}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
