import React, { FC } from 'react'
import { StaffPerformanceReview } from '@pabau/ui'
import SettingsLayout from '../SettingsLayout'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'

interface P {
  handleChange: (key: string, config: ReviewScheduleConfig) => void
  date: ReviewScheduleConfig
}

const ReviewSettings: FC<P> = ({ handleChange, date: { date } }) => {
  const { t } = useTranslationI18()

  return (
    <SettingsLayout
      title={t('settings-performance-tab-header1')}
      description={t('settings-performance-tab-header-description')}
    >
      <StaffPerformanceReview reviewDate={date} isNote={true} />
    </SettingsLayout>
  )
}

export default ReviewSettings
