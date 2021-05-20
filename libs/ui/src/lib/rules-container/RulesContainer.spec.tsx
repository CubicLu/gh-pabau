import React from 'react'
import { render } from '@testing-library/react'

import RulesContainer from './RulesContainer'

describe('RulesContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RulesContainer />)
    expect(baseElement).toBeTruthy()
  })
})
