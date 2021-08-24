/* eslint-disable */
import { render } from '@testing-library/react'
import React from 'react'
import ShareReview from './ShareReview'

describe('ShareReview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareReview />)
    expect(baseElement).toBeTruthy()
  })
})
