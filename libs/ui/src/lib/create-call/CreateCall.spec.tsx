import { render } from '@testing-library/react'
import React from 'react'

describe('CreateCall', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />)
    expect(baseElement).toBeTruthy()
  })
})
