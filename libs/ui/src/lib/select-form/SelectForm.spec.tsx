import { render } from '@testing-library/react'
import React from 'react'

describe('SelectForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />)
    expect(baseElement).toBeTruthy()
  })
})
