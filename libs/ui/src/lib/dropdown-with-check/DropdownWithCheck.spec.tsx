import React from 'react'
import { render } from '@testing-library/react'

import DropdownWithCheck from './DropdownWithCheck'

describe('DropdownWithCheck', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DropdownWithCheck />)
    expect(baseElement).toBeTruthy()
  })
})
