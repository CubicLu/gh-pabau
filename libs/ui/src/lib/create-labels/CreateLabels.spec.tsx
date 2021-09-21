import { render } from '@testing-library/react'
import React from 'react'
import CreateLabels from './CreateLabels'

describe('CreateLabels', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateLabels />)
    expect(baseElement).toBeTruthy()
  })
})
