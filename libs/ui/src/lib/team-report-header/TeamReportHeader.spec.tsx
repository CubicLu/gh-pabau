import { render } from '@testing-library/react'
import React from 'react'
import { serviceGroups } from './data'
import { dateOptions, employees, locations, meta } from './mock'
import TeamReportHeader from './TeamReportHeader'

describe('TeamReportHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TeamReportHeader
        meta={meta}
        serviceGroups={serviceGroups}
        employees={employees}
        locations={locations}
        dateOptions={dateOptions}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
