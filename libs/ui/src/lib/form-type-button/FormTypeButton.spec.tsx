import { render } from '@testing-library/react'
import React from 'react'
import FormTypeButton from './FormTypeButton'

describe('FormTypeButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormTypeButton
        handleClickItem={(val) => val}
        key1={''}
        formTypeInfo={{}}
        aligns={[]}
        index={1}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
