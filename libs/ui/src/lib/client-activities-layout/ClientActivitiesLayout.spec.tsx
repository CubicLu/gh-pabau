import { render } from '@testing-library/react'
import React from 'react'
import ClientActivitiesLayout from './ClientActivitiesLayout'

describe('ClientActivitiesLayout', () => {
  it('should render successfully', () => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    const { baseElement } = render(<ClientActivitiesLayout />)
    expect(baseElement).toBeTruthy()
  })
})
