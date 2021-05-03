import React from 'react'
import { render } from '@testing-library/react'
import { bizTypes } from '../../assets/images/biz-types'
import BusinessTypes from './BusinessTypes'

describe('BusinessTypes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BusinessTypes List={bizTypes} />)
    expect(baseElement).toBeTruthy()
  })
})
