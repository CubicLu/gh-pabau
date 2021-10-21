import React from 'react'
import Appointments from './Appointments'
import clientImg from '../../assets/images/appointment-client.png'
import { appointmentData } from './mock'

export default {
  component: Appointments,
  title: 'Appointments',
  args: {
    date: '2021-10-22T12:10:28+05:30',
    appointments: [
      {
        time: '10:30',
        avatar: clientImg,
        clientName: 'Sylvia Cole',
        serviceName: 'Facial Reconstruction',
        checkingStatus: 'Not Checked-in',
        staffMember: 'Dr. Emilly Connor',
        paymentStatus: 'Paid',
        status: 'waiting',
      },
    ],
  },
  argTypes: {
    date: { control: { type: 'text' } },
    appointments: {
      control: { type: 'array' },
    },
  },
}

const AppointmentListStory = ({ appointments, date }) => (
  <Appointments date={date} appointments={appointments} />
)

export const AppointmentList = AppointmentListStory.bind({})
AppointmentList.args = {
  date: '2021-10-22T12:10:28+05:30',
  appointments: appointmentData,
}
