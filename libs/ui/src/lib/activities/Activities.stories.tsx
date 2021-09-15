import React, { FC } from 'react'
import ActivitiesComponent, { ActivitiesProps } from './Activities'
import { eventsData } from './ActivitiesMock'

export default {
  component: ActivitiesComponent,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Client Card/Activities',
  args: {
    isLoading: false,
    eventsData: [...eventsData],
    eventDateFormat: 'DD-MM-YYYY, h:mm a',
  },
  argsTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
}

export const ActivitiesStory: FC<ActivitiesProps> = ({
  eventsData,
  eventDateFormat,
  isLoading,
}) => {
  return (
    <ActivitiesComponent
      eventsData={eventsData}
      eventDateFormat={eventDateFormat}
      isLoading={isLoading}
    />
  )
}
