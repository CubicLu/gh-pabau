import React from 'react'
import { render } from '@testing-library/react'

import Services from './Services'

const SubServiceData = [
  {
    key: '0',
    name: 'SubService data 1',
  },
]

const ServiceData = [
  {
    key: '0',
    service: 'Epic service',
    subServices: SubServiceData,
  },
]

describe('Services', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Services
        title={'Example title'}
        description={'Example description'}
        serviceData={ServiceData}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
