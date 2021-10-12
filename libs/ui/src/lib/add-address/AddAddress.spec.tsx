import React from 'react'
import { render } from '@testing-library/react'

import AddAddress from './AddAddress'

describe('AddAddress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddAddress
        visible={true}
        title={''}
        values={{
          street: '',
          city: '',
          county: '',
          postCode: '',
          country: '',
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
