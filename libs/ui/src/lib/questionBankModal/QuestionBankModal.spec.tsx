import React from 'react'
import { render } from '@testing-library/react'

import QuestionBankModal from './QuestionBankModal'

const questions = [
  {
    key: 0,
    question: 'Example question 1',
    showDropdown: false,
    checked: true,
  },
]
const options = [
  {
    key: '0',
    value: 'example option 1',
  },
]

describe('QuestionBankModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QuestionBankModal
        questions={questions}
        options={options}
        title={'Example title'}
        visible={true}
        onAdd={(questions) => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
