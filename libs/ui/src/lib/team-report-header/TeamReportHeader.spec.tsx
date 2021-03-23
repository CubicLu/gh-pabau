import React from 'react'
import { render } from '@testing-library/react'
import { meta, employees, yearsData, locations } from './mock'
import { serviceGroups } from './data'

import TeamReportHeader from './TeamReportHeader'

describe('TeamReportHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TeamReportHeader
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
