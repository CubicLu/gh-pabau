import React from 'react'
import { render } from '@testing-library/react'

import LocationList from './LocationList'
import { locationData } from './mock'

describe('LocationList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LocationList description="description" locationData={locationData} />
    )
    expect(baseElement).toBeTruthy()
  })
})
