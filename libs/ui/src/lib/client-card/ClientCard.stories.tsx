import { Button } from '@pabau/ui'
import React, { FC, useState } from 'react'
import ClientCard, { ClientCardProps } from './ClientCard'
import { searchResults, notes, clientData } from './mock'

export default {
  component: ClientCard,
  title: 'UI/ClientCard',
}

export const ClientCardStory: FC<ClientCardProps> = ({ ...args }) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setVisible((e) => !e)}>
        Open client card
      </Button>
      <ClientCard
        {...args}
        clientData={clientData}
        notes={notes}
        searchResults={searchResults}
        medicalConditions={['Anxiety']}
        alerts={[]}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  )
}
