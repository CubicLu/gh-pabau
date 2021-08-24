import { render } from '@testing-library/react'
import React from 'react'
import ClientCommunicationsLayout from './ClientCommunicationsLayout'

describe('ClientCommunicationsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientCommunicationsLayout />)
    expect(baseElement).toBeTruthy()
  })
})
