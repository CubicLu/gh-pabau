import React, { FC } from 'react'
import ClientAppointmentsLayout from './ClientAppointmentsLayout'

export default {
  component: ClientAppointmentsLayout,
  title: 'Client Card/AppointmentsTab',
}

const ClientAppointmentsLayoutStory: FC = ({ ...args }) => (
  <ClientAppointmentsLayout {...args} />
)
export const AppointmentsTab = ClientAppointmentsLayoutStory.bind({})
AppointmentsTab.args = {}
