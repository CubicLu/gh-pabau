import React, { useState } from 'react'
import TeamReportChartComponent, {
  TeamReportChartProps,
} from './TeamReportChart'
import {
  ticks,
  series,
  seriesData,
  meta,
  employees,
  locations,
  yearsData,
} from './mock'
import { TeamReportMeta } from '@pabau/ui'
import { serviceGroups } from '../team-report-header/data'

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
  const [mockYears, setMockYears] = useState(args.years)
  const mockChangeMeta = (newMeta: TeamReportMeta): void => {
    if (newMeta.rangeType !== mockMeta.rangeType) {
      newMeta.year = yearsData[newMeta.rangeType][0]
    }
    setMockMeta(newMeta)

    setMockYears(yearsData[newMeta.rangeType])

    setMockTicks(ticks[newMeta.rangeType])

    setMockSeries(
      seriesData
        .filter((serie) =>
          newMeta.services.find((item) => item.name === serie.serviceName)
        )
        .map((serie) => {
          const service = newMeta.services.find(
            (item) => item.name === serie.serviceName
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
      years={mockYears}
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
