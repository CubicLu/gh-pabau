import React from 'react'
import { render } from '@testing-library/react'
import { data } from './mock'

import RadioButton from './RadioButton'

describe('RadioButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RadioButton Items={data} group={'Group Name'} />
    )
    expect(baseElement).toBeTruthy()
  })
})
