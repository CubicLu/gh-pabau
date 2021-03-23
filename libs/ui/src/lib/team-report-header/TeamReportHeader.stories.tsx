import React, { useState } from 'react'
import TeamReportHeader, {
  TeamReportHeaderProps,
  TeamReportMeta,
} from './TeamReportHeader'
import { meta, employees, locations, yearsData } from './mock'
import { serviceGroups } from './data'

export default {
  component: TeamReportHeader,
  title: 'UI/Team Report Chart',
  parameters: {
    layout: 'fullscreen',
  },
}

const TeamReportHeaderTemplate = ({ ...args }: TeamReportHeaderProps) => {
  const [mockMeta, setMockMeta] = useState(args.meta)
  const [mockYears, setMockYears] = useState(args.years)
  const mockChangeMeta = (newMeta: TeamReportMeta): void => {
    if (newMeta.rangeType !== mockMeta.rangeType) {
      newMeta.year = yearsData[newMeta.rangeType][0]
    }
    setMockMeta(newMeta)

    setMockYears(yearsData[newMeta.rangeType])
  }

  return (
    <TeamReportHeader
      {...args}
      onChangeMeta={mockChangeMeta}
      meta={mockMeta}
      years={mockYears}
    />
  )
}

export const TeamReportHeaderStory = TeamReportHeaderTemplate.bind({})
TeamReportHeaderStory.args = {
  serviceGroups: serviceGroups,
  employees: employees,
  meta: meta,
  years: yearsData.monthly,
  locations: locations,
}
