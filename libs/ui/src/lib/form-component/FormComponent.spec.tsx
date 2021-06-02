import { render } from '@testing-library/react'
import React from 'react'
import FormComponent from './FormComponent'

describe('FormComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormComponent />)
    expect(baseElement).toBeTruthy()
  })
})
