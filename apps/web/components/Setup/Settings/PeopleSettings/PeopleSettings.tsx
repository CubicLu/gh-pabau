import React, { FC } from 'react'
import { Employees } from '@pabau/ui'
import GeneralLayout from '../GeneralLayout'
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
    <GeneralLayout
      title={t('settings-performance-people-header')}
      description={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
      }
    >
      <Employees employees={peopleList} />
    </GeneralLayout>
  )
}

export default PeopleSettings
