import React, { FC } from 'react'

import ClientCreateComponent, { ClientCreateProps } from './ClientCreate'

export default {
  component: ClientCreateComponent,
  title: 'UI/ClientCreate',
}

const ClientCreateStory: FC<ClientCreateProps> = ({ modalVisible }) => {
  return <ClientCreate modalVisible={modalVisible} />
}

export const ClientCreate = ClientCreateStory.bind({})
