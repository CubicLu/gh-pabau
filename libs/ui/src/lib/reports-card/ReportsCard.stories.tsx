import React, { useState, FC } from 'react'
import ReportsCard, { ReportsCardProps, report } from './ReportsCard'
import { Notification, NotificationType } from '../notification/Notification'
import { basics, FewReport, ManyReport } from './mock'

export default {
  component: ReportsCard,
  title: 'UI/ReportsCard',
  args: {
    catHeading: 'Staff',
    description:
      'Monitor your overall finances including sales, refunds, taxes, payments and more',
    graphDescription: 'Utilization by week',
    chartLabel: '%',
  },

  argTypes: {
    catHeading: {
      control: {
        type: 'text',
      },
    },

    description: {
      control: {
        type: 'text',
      },
    },

    graphDescription: {
      control: {
        type: 'text',
      },
    },

    chartLabel: {
      control: {
        type: 'text',
      },
    },
  },
}

const ReportsCardStory = ({ ...args }) => <ReportsCard {...args} />

export const Basic: FC<ReportsCardProps> = ({ ...args }) => {
  const [basicData, setBasicData] = useState<report[]>(basics.reports)
  return (
    <ReportsCard
      description={args.description}
      catHeading={args.catHeading}
      graphDescription={args.graphDescription}
      chartLabel={args.chartLabel}
      reports={basicData}
      graphData={basics.graphData}
      onReportFavourite={(id, isFav) => {
        const index = basicData.findIndex((x) => x.id === id)
        basicData[index].favourite = isFav
        setBasicData([...basicData])
        Notification(
          NotificationType.success,
          ` ${basicData[index].reportCode} - ${
            basicData[index].reportName
          } report has been ${isFav ? 'favourited' : 'unfavourited'}`
        )
      }}
    />
  )
}
export const FewReports: FC<ReportsCardProps> = ({ ...args }) => {
  const [fewData, setFewData] = useState<report[]>(FewReport.reports)
  return (
    <ReportsCard
      description={args.description}
      catHeading={FewReport.catHeading}
      graphDescription={FewReport.graphDescription}
      chartLabel={FewReport.chartLabel}
      reports={fewData}
      graphData={FewReport.graphData}
      onReportFavourite={(id, isFav) => {
        const index = fewData.findIndex((x) => x.id === id)
        fewData[index].favourite = isFav
        setFewData([...fewData])
        Notification(
          NotificationType.success,
          ` ${fewData[index].reportCode} - ${
            fewData[index].reportName
          } report has been ${isFav ? 'favourited' : 'unfavourited'}`
        )
      }}
    />
  )
}
export const ManyReports: FC<ReportsCardProps> = ({ ...args }) => {
  const [manyData, setManyData] = useState<report[]>(ManyReport.reports)
  return (
    <ReportsCard
      description={args.description}
      catHeading={ManyReport.catHeading}
      graphDescription={ManyReport.graphDescription}
      chartLabel={ManyReport.chartLabel}
      reports={manyData}
      graphData={ManyReport.graphData}
      onReportFavourite={(id, isFav) => {
        const index = manyData.findIndex((x) => x.id === id)
        manyData[index].favourite = isFav
        setManyData([...manyData])
        Notification(
          NotificationType.success,
          ` ${manyData[index].reportCode} - ${
            manyData[index].reportName
          } report has been ${isFav ? 'favourited' : 'unfavourited'}`
        )
      }}
    />
  )
}

export const Custom = ReportsCardStory.bind({})
Custom.args = {
  catHeading: 'Custom',
  graphDescription: 'Revenue by week',
  chartLabel: '0',
}
