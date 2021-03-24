import React from 'react'
import { render } from '@testing-library/react'

import Layout from './Layout'

describe('Layout', () => {
  test.skip('should render successfully', () => {
    const { baseElement } = render(<Layout />)
    expect(baseElement).toBeTruthy()
  })
})
