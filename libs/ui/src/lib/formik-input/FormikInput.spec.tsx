/* eslint-disable */
import React from 'react'
import { render } from '@testing-library/react'

import FormikInput from './FormikInput'

describe('FormikInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormikInput name={'Example name'}/>)
    expect(baseElement).toBeTruthy()
  })
})
