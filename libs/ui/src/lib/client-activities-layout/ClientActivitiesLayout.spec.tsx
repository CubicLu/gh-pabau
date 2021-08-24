import { render } from '@testing-library/react'
import React from 'react'
import ClientActivitiesLayout from './ClientActivitiesLayout'

describe('ClientActivitiesLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientActivitiesLayout />)
    expect(baseElement).toBeTruthy()
  })
})
