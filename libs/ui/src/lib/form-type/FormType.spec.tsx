import { render } from '@testing-library/react'
import React from 'react'
import FormType from './FormType'

const setting = {
  medicalHistory: false,
  consent: false,
  treatment: false,
  epaper: false,
  prescription: false,
  lab: false,
}

describe('FormType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormType setting={setting} onChangeSetting={(val) => val} />
    )
    expect(baseElement).toBeTruthy()
  })
})
