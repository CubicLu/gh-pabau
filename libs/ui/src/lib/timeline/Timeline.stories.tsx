import React, { FC } from 'react'
import TimelineComponent, { TimelineProps } from './Timeline'
import { eventsData } from './timeLineMock'

export default {
  component: TimelineComponent,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Client Card/Timeline',
  args: {
    isLoading: false,
    eventsData: [...eventsData],
    eventDateFormat: 'DD-MM-YYYY, h:mm a',
    clientDetail: {
      name: 'Martine Wade',
      createdAt: '27-09-2020, 7:00 pm',
    },
  },
  argsTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
}

export const TimelineStory: FC<TimelineProps> = ({
  eventsData,
  eventDateFormat,
  clientDetail,
  isLoading,
}) => {
  return (
    <TimelineComponent
      eventsData={eventsData}
      eventDateFormat={eventDateFormat}
      clientDetail={clientDetail}
      isLoading={isLoading}
    />
  )
}
