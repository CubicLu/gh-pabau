import React, { FC } from 'react'
import ClientDashboardLayout, {
  ClientDashboardLayoutProps,
} from './ClientDashboardLayout'

import userAvatar from '../../assets/images/users/austin.png'

export default {
  component: ClientDashboardLayout,
  title: 'UI/Client Dashboard Layout',
  parameters: {},
  args: {},
  argTypes: {},
}

const ClientDashboardLayoutStory: FC<ClientDashboardLayoutProps> = (args) => {
  return (
    <div style={{ width: '800px' }}>
      <ClientDashboardLayout {...args} />
    </div>
  )
}

export const Basic = ClientDashboardLayoutStory.bind({})
Basic.args = {
  nextAppointments: [
    {
      category: 'next appointment',
      title: 'Laser - Tattoo Removal with Laura Sutton',
      description: '21/07/2020 (Tue) @ 15:20 @ The London Skin and Hair Clinic',
      image: userAvatar,
    },
    {
      category: 'next appointment',
      title: 'Laser - Tattoo Removal with Laura Sutton',
      description: '21/07/2020 (Tue) @ 15:20 @ The London Skin and Hair Clinic',
      image: userAvatar,
    },
  ],
  medicalHistory: [
    {
      category: 'Medical history',
      descriptions: ['History of germ cell tumor ICD 10'],
      date: '21 Mar',
    },
    {
      category: 'Medical history',
      descriptions: ['History of germ cell tumor ICD 10'],
      date: '21 Mar',
    },
  ],
  medications: [
    {
      category: 'Medications',
      descriptions: [
        { name: 'Ibuprofen', amount: '10mg' },
        { name: 'Paracetomol', amount: '10mg' },
      ],
      date: '22 Mar',
    },
    {
      category: 'Medications',
      descriptions: [
        { name: 'Ibuprofen', amount: '10mg' },
        { name: 'Paracetomol', amount: '10mg' },
      ],
      date: '22 Mar',
    },
  ],
  products: [
    {
      category: 'Products',
      descriptions: ['Obagi Skin Cream'],
      date: '22 Mar',
    },
    {
      category: 'Products',
      descriptions: ['Obagi Skin Cream'],
      date: '21 Mar',
    },
    {
      category: 'Products',
      descriptions: ['Obagi Skin Cream'],
      date: '20 Mar',
    },
  ],
  tests: [
    {
      category: 'Tests',
      descriptions: ['Complete blood count'],
      tester: 'Dr Sam Smith',
      date: '15 Jan',
    },
    {
      category: 'Tests',
      descriptions: ['Complete blood count'],
      tester: 'Dr Sam Smith',
      date: '14 Jan',
    },
  ],
  alerts: ['Painkiller', 'Peanut'],
  conversation: {
    category: 'latest conversations',
    users: [
      {
        id: '1',
        name: 'Dominic Nguyen',
        type: 'Appointment consultation',
        avatarUrl: userAvatar,
        date: '2 Apr',
      },
      {
        id: '2',
        name: 'Tom Coleman',
        type: 'Appointment consultation',
        avatarUrl: userAvatar,
        date: '18 Mar',
      },
      {
        id: '3',
        name: 'Zoltan Olah',
        type: 'Appointment consultation',
        avatarUrl: userAvatar,
        date: '26 Mar',
      },
    ],
  },
}
