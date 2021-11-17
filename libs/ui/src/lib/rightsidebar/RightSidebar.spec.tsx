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
          signData: '',
          arrItems: [],
          txtValue: '',
          arrValue: [],
          required: false,
          attrName: '',
          attrValue: '',
          attrId: 0,
        }}
        component={''}
        formType={''}
        display={false}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
