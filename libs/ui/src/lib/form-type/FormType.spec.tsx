import { render } from '@testing-library/react'
import React from 'react'
import FormType from './FormType'

describe('FormType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormType medicalFormType={''} onChangeSetting={(val) => val} />
    )
    expect(baseElement).toBeTruthy()
  })
})
