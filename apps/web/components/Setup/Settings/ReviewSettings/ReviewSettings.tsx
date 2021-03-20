import React, { FC } from 'react'

import { StaffPerformanceReview } from '@pabau/ui'

import GeneralLayout from '../GeneralLayout'

interface P {
  handleChange: (key: string, obj: ReviewScheduleConfig) => void
  date: ReviewScheduleConfig
}

const ReviewSettings: FC<P> = ({ handleChange, date: { date } }) => {
  const renderContent = (): JSX.Element => {
    return (
      <div>
        <StaffPerformanceReview reviewDate={date} isNote={true} />
      </div>
    )
  }
  return (
    <GeneralLayout
      title={'Review Schedule'}
      description={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
      }
      bodyContent={renderContent()}
    />
  )
}

export default ReviewSettings
