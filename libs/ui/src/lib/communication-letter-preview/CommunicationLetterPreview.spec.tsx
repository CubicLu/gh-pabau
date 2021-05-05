import React from 'react'
import { render } from '@testing-library/react'

import CommunicationLetterPreview from './CommunicationLetterPreview'

describe('CommunicationLetterPreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommunicationLetterPreview />)
    expect(baseElement).toBeTruthy()
  })
})
