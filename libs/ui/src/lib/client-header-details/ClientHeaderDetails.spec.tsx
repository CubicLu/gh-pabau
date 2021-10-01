import React from 'react'
import { render } from '@testing-library/react'

import ClientHeaderDetails from './ClientHeaderDetails'

describe('ClientHeaderDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientHeaderDetails />)
    expect(baseElement).toBeTruthy()
  })
})
