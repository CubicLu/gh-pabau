import React from 'react'
import { render } from '@testing-library/react'

import NewsLetterTile from './NewsletterTile'

describe('NewsLetterTile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <NewsLetterTile clicked={1} opened={1} totalSent={1} />
    )
    expect(baseElement).toBeTruthy()
  })
})
