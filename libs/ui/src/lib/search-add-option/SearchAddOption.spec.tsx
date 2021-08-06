import React from 'react'
import { render } from '@testing-library/react'

import SearchAddOption from './SearchAddOption'

describe('SearchAddOption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SearchAddOption
        onChange={() => true}
        options={[1, 2, 3]}
        label={'Example label'}
        placeHolder={'example placeholder'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
