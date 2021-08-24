import React from 'react'
import { render } from '@testing-library/react'

import CommunicationTemplatePreview from './CommunicationTemplatePreview'

describe('CommunicationTemplatePreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CommunicationTemplatePreview sms={'example sms string'} />
    )
    expect(baseElement).toBeTruthy()
  })
})
