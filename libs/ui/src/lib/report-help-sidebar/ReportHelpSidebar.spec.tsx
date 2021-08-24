import React from 'react'
import { render } from '@testing-library/react'

import ReportHelpSidebar from './ReportHelpSidebar'

describe('ReportHelpSidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ReportHelpSidebar serviceGroups={[]} visible />
    )
    expect(baseElement).toBeTruthy()
  })
})
