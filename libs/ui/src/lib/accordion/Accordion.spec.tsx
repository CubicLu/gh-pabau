import React from 'react'
import { render } from '@testing-library/react'

import Accordion from './Accordion'

describe('Accordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Accordion headerLabel={'Example header label'} />
    )
    expect(baseElement).toBeTruthy()
  })
})
