import React from 'react'
import { render } from '@testing-library/react'
import { ticks, series, meta, employees, locations, yearsData } from './mock'
import { serviceGroups } from '../team-report-header/data'

import TeamReportChart from './TeamReportChart'

describe('TeamReportChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TeamReportChart
        ticks={ticks.monthly}
        series={series}
        meta={meta}
        serviceGroups={serviceGroups}
        employees={employees}
        years={yearsData.monthly}
        locations={locations}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
