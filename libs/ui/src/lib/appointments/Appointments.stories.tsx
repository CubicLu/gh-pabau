import React from 'react'
import Appointments from './Appointments'
import clientImg from '../../assets/images/appointment-client.png'

export default {
  component: Appointments,
  title: 'Appointments',
  args: {
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
  argTypes: {},
}

const AppointmentListStory = ({ ...args }) => <Appointments {...args} />

export const AppointmentList = AppointmentListStory.bind({})
AppointmentList.args = {
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
    {
      time: '10:30',
      avatar: clientImg,
      clientName: 'Sylvia Cole',
      serviceName: 'Facial Reconstruction',
      checkingStatus: 'Not Checed-in',
      staffMember: 'Dr. Emilly Connor',
      paymentStatus: 'Paid',
      status: 'In Progress',
    },
    {
      time: '10:30',
      avatar: clientImg,
      clientName: 'Sylvia Cole',
      serviceName: 'Facial Reconstruction',
      checkingStatus: 'Not Checed-in',
      staffMember: 'Dr. Emilly Connor',
      paymentStatus: 'Paid',
      status: 'Arrived',
    },
    {
      time: '10:30',
      avatar: clientImg,
      clientName: 'Sylvia Cole',
      serviceName: 'Facial Reconstruction',
      checkingStatus: 'Not Checed-in',
      staffMember: 'Dr. Emilly Connor',
      paymentStatus: 'Paid',
      status: 'Completed',
    },
  ],
}
