import React from 'react'
import { render } from '@testing-library/react'

import Securitytools from './Securitytools'

const ItemInfo = [
  {
    id: '0',
    title: 'Example Item Info Title',
    name: 'Example Item Info Name',
    imgSrc: 'example img src',
    isActive: true,
    modalType: 1,
  },
]

describe('Securitytools', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Securitytools
        title={'Example title'}
        datasource={ItemInfo}
        onItemClick={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
