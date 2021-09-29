import * as React from 'react'
import { ClientAppointments } from './ClientAppointments'

export default {
  component: ClientAppointments,
  title: 'Client Card/AppointmentsTab',
}

const ClientAppointmentsLayoutStory = (args) => <ClientAppointments {...args} />

export const AppointmentsTab = ClientAppointmentsLayoutStory.bind({})
AppointmentsTab.args = {}
