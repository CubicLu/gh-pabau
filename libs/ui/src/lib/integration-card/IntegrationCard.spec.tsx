import { render } from '@testing-library/react'
import React from 'react'

import { IntegrationCard } from './IntegrationCard'

describe('IntegrationCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntegrationCard />)
    expect(baseElement).toBeTruthy()
  })
})
