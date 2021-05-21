import React from 'react'
import { render } from '@testing-library/react'
import StickyPopout from './StickyPopout'

describe('StickyPopout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StickyPopout />)
    expect(baseElement).toBeTruthy()
  })
})
