import React from 'react'
import { render } from '@testing-library/react'

import QuestionBank from './QuestionBank'

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
describe('QuestionBank', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QuestionBank
        options={options}
        questions={questions}
        onClick={() => {
          return true
        }}
        onChecked={() => {
          return true
        }}
        onSelect={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
