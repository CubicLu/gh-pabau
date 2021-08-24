import React, { useState } from 'react'
import { serviceGroups } from './data'
import { employees, locations, meta } from './mock'
import TeamReportHeader, {
  TeamReportHeaderProps,
  TeamReportMeta,
} from './TeamReportHeader'

export default {
  component: TeamReportHeader,
  title: 'UI/Team Report Chart',
  parameters: {
    layout: 'fullscreen',
  },
}

const TeamReportHeaderTemplate = ({ ...args }: TeamReportHeaderProps) => {
  const [mockMeta, setMockMeta] = useState(args.meta)
  const [mockYears] = useState(args.dateOptions)
  const mockChangeMeta = (newMeta: TeamReportMeta): void => {
    if (newMeta.rangeType !== mockMeta.rangeType) {
      // newMeta.endDate = yearsData[newMeta.rangeType][0]
    }
    setMockMeta(newMeta)

    // setMockYears(yearsData[newMeta.rangeType])
  }

  return (
    <TeamReportHeader
      {...args}
      onChangeMeta={mockChangeMeta}
      meta={mockMeta}
      dateOptions={mockYears}
    />
  )
}

export const TeamReportHeaderStory = TeamReportHeaderTemplate.bind({})
TeamReportHeaderStory.args = {
  serviceGroups: serviceGroups,
  employees: employees,
  meta: meta,
  locations: locations,
}
