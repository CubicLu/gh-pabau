import React from 'react'
import { render } from '@testing-library/react'

import FontIcon from './FontIcon'

describe('FontIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FontIcon
        onIconSelected={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
