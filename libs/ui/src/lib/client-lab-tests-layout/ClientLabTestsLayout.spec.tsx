import { render } from '@testing-library/react'
import React from 'react'
import ClientLabTestsLayout from './ClientLabTestsLayout'

describe('ClientLabTestsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientLabTestsLayout
        testList={[]}
        onViewReportClick={() => Promise.resolve(true)}
        onPrintClick={() => Promise.resolve(true)}
        onShareClick={() => Promise.resolve(true)}
        onDeleteClick={() => Promise.resolve(true)}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
