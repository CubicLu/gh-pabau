import React from 'react'
import { render } from '@testing-library/react'

import { NotificationDrawer } from '@pabau/ui'

describe('NotificationDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationDrawer />)
    expect(baseElement).toBeTruthy()
  })
})
