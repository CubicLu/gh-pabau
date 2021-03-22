import React, { FC } from 'react'
import { StaffPerformanceReview } from '@pabau/ui'
import GeneralLayout from '../GeneralLayout'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'

interface P {
  handleChange: (key: string, config: ReviewScheduleConfig) => void
  date: ReviewScheduleConfig
}

const ReviewSettings: FC<P> = ({ handleChange, date: { date } }) => {
  const { t } = useTranslationI18()
  return (
    <GeneralLayout
      title={t('settings-performance-tab-header1')}
      description={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
      }
    >
      <StaffPerformanceReview reviewDate={date} isNote={true} />
    </GeneralLayout>
  )
}

export default ReviewSettings
