import React, { FC } from 'react'

import { Employees } from '@pabau/ui'

import GeneralLayout from '../GeneralLayout'

interface P {
  handleChange: (key: string, obj: PeopleConfig) => void
  peopleList: PeopleConfig
}

const PeopleSettings: FC<P> = ({
  handleChange,
  peopleList: { peopleList },
}) => {
  const renderContent = (): JSX.Element => {
    return <Employees employees={peopleList} />
  }
  return (
    <GeneralLayout
      title={'Participating in Performance'}
      description={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
      }
      bodyContent={renderContent()}
    />
  )
}

export default PeopleSettings
