import React from 'react'
import { render } from '@testing-library/react'

import AddQuestion from './AddQuestion'

describe('AddQuestion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddQuestion
        onQuestionBankAddButton={(questions) => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
