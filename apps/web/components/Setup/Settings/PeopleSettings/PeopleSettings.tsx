import React, { FC } from 'react'
import { Employees } from '@pabau/ui'
import SettingsLayout from '../SettingsLayout'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'

interface P {
  handleChange: (key: string, config: PeopleConfig) => void
  peopleList: PeopleConfig
}

const PeopleSettings: FC<P> = ({
  handleChange,
  peopleList: { peopleList },
}) => {
  const { t } = useTranslationI18()
  return (
    <SettingsLayout
      title={t('settings-performance-people-header')}
      description={t('settings-performance-tab-header-description')}
    >
      <Employees employees={peopleList} />
    </SettingsLayout>
  )
}

export default PeopleSettings
