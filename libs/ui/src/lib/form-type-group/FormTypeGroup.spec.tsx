import React from 'react'
import { render } from '@testing-library/react'

import FormTypeGroup from './FormTypeGroup'

describe('FormTypeGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormTypeGroup />)
    expect(baseElement).toBeTruthy()
  })
})
