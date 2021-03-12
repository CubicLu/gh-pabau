import React from 'react'
import { render } from '@testing-library/react'

import CheckboxTree from './CheckboxTree'

describe('CheckboxTree', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxTree />)
    expect(baseElement).toBeTruthy()
  })
})
