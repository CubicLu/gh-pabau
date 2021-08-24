import React, { FC } from 'react'
import ClientCard, { ClientCardProps } from './ClientCard'
import { searchResults, notes, clientData } from './mock'

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
}
