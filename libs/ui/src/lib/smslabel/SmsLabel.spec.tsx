import React from 'react'
import { render } from '@testing-library/react'

import SmsLabel from './SmsLabel'

describe('SmsLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SmsLabel status={'active'} />)
    expect(baseElement).toBeTruthy()
  })
})
