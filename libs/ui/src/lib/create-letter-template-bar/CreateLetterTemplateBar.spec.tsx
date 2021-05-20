import React from 'react'
import { render } from '@testing-library/react'

import CreateLetterTemplateBar from './CreateLetterTemplateBar'

describe('CreateLetterTemplateBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CreateLetterTemplateBar
        onDelete={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
