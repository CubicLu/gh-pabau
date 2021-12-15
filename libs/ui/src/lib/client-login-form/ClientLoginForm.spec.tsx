import { render } from '@testing-library/react'
import React from 'react'
import ClientLoginForm from './ClientLoginForm'

describe('ClientLoginForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientLoginForm />)
    expect(baseElement).toBeTruthy()
  })
})
