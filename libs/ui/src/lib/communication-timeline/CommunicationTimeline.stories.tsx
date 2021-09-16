import React, { FC } from 'react'
import CommunicationTimeline, {
  CommunicationTimelineProps,
} from './CommunicationTimeline'
import { eventsData } from './CommunicationMock'

export default {
  component: CommunicationTimeline,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Client Card/Communication Timeline',
  args: {
    isLoading: false,
    eventsData: [...eventsData],
    eventDateFormat: 'DD-MM-YYYY, h:mm a',
  },
  argsTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
}

export const CommunicationTimelineStory: FC<CommunicationTimelineProps> = ({
  eventsData,
  eventDateFormat,
  isLoading,
}) => {
  return (
    <CommunicationTimeline
      eventsData={eventsData}
      eventDateFormat={eventDateFormat}
      isLoading={isLoading}
    />
  )
}
