import React from 'react'
import { render } from '@testing-library/react'

import ReviewWrite from './ReviewWrite'

const questions = [
  {
    key: 0,
    question: 'How epic are we?',
    rating: 10,
  },
]
describe('ReviewWrite', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ReviewWrite
        title={'Example title'}
        reviews={questions}
        subtitle={'Example sub title'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
