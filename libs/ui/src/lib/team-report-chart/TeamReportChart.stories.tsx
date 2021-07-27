import { TeamReportMeta } from '@pabau/ui'
import React, { useState } from 'react'
import { serviceGroups } from '../team-report-header/data'
import {
  employees,
  locations,
  meta,
  series,
  seriesData,
  ticks,
  yearsData,
} from './mock'
import TeamReportChartComponent, {
  TeamReportChartProps,
} from './TeamReportChart'

export default {
  component: TeamReportChartComponent,
  title: 'UI/Team Report Chart',
  parameters: {
    layout: 'fullscreen',
  },
}

const TeamReportChartTemplate = ({ ...args }: TeamReportChartProps) => {
  const [mockSeries, setMockSeries] = useState(args.series)
  const [mockMeta, setMockMeta] = useState(args.meta)
  const [mockTicks, setMockTicks] = useState(args.ticks)
  const mockChangeMeta = (newMeta: TeamReportMeta): void => {
    if (newMeta.rangeType !== mockMeta.rangeType) {
      // newMeta.endDate = yearsData[newMeta.rangeType][0]
    }
    setMockMeta(newMeta)

    // setMockYears(yearsData[newMeta.rangeType])

    setMockTicks(ticks[newMeta.rangeType])

    setMockSeries(
      seriesData
        .filter((serie) =>
          newMeta.services.find((item) => item.name === serie.name)
        )
        .map((serie) => {
          const service = newMeta.services.find(
            (item) => item.name === serie.name
          )
          return {
            ...serie,
            target: service?.showTarget ? serie.data[5] : undefined,
          }
        })
    )
  }

  return (
    <TeamReportChartComponent
      {...args}
      onChangeMeta={mockChangeMeta}
      series={mockSeries}
      meta={mockMeta}
      ticks={mockTicks}
    />
  )
}

export const TeamReportChartStory = TeamReportChartTemplate.bind({})
TeamReportChartStory.args = {
  ticks: ticks.monthly,
  years: yearsData.monthly,
  serviceGroups: serviceGroups,
  employees: employees,
  series: series,
  meta: meta,
  locations: locations,
}
