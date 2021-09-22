import React, { FC } from 'react'
import ClientCard, { ClientCardProps } from './ClientCard'
import {
  searchResults,
  notes,
  clientData,
  communicationEventsData,
  ActivityEventsData,
} from './mock'

export default {
  component: ClientCard,
  title: 'UI/ClientCard',
}

const ClientCardStory: FC<ClientCardProps> = ({ ...args }) => (
  <ClientCard {...args} />
)
export const Basic = ClientCardStory.bind({})
Basic.args = {
  visible: true,
  onClose: () => {
    return
  },
  clientData: clientData,
  notes: notes,
  searchResults: searchResults,
  medicalConditions: ['Anxiety'],
  alerts: [],
  communicationTabProps: {
    eventsData: communicationEventsData,
    eventDateFormat: 'DD-MM-YYYY, h:mm a',
    isLoading: false,
  },
  activitiesTabProps: {
    isLoading: false,
    eventsData: ActivityEventsData,
    eventDateFormat: 'DD-MM-YYYY, h:mm a',
  },
}
