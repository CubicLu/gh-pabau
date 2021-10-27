import React from 'react'
import { render } from '@testing-library/react'

import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Breadcrumb items={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
