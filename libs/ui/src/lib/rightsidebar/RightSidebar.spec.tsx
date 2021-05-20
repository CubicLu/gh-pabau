import { render } from '@testing-library/react'
import React from 'react'
import RightSidebar from './RightSidebar'

describe('RightSidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RightSidebar
        selectedForm={{
          id: '',
          formType: '',
          formName: '',
          txtQuestion: '',
          txtQuestionWithTag: '',
          txtBlock: '',
          txtBlockWithTag: '',
          txtInputType: '',
          txtDefaults: '',
          txtDefaultsWithTag: '',
          txtLinkedField: '',
          arrItems: [],
          required: false,
        }}
        component={''}
        formType={''}
        display={false}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
