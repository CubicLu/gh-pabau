import React from 'react'
import { render } from '@testing-library/react'

import TagPanel from './TagPanel'

describe('TagPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TagPanel />)
    expect(baseElement).toBeTruthy()
  })
})
