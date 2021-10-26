import React from 'react'
import { render } from '@testing-library/react'

import JourneyCalendar from './JourneyCalendar'

describe('JourneyCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <JourneyCalendar
        setActiveDate={(val) => {
          console.log(val)
        }}
        activeDate="Oct 21 2021"
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
