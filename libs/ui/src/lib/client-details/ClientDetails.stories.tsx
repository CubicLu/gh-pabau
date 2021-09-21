import React, { FC } from 'react'
import ClientDetails, { ClientDetailsProps } from './ClientDetails'
import userAvatar from '../../assets/images/users/austin.png'

export default {
  component: ClientDetails,
  title: 'UI/ClientDetails',
  args: {},
  argTypes: {},
}

const ClientDetailsStory: FC<ClientDetailsProps> = ({ ...args }) => {
  return (
    <div
      style={{
        width: '408px',
        padding: '1rem',
        backgroundColor: '#e5e5e5',
      }}
    >
      <ClientDetails {...args} />
    </div>
  )
}

const searchResults = [
  {
    name: 'Deddington Health Centre',
    postCode: 'OX15 0TQ',
    city: 'Deddington',
    street: 'Banbury',
    country: 'United Kingdom',
    phone: '+44 (0) 1869338611',
  },
  {
    name: 'Deddington Lorem Health Centre',
    postCode: 'OX15 4TN',
    city: 'Deddington',
    street: 'Banbury',
    country: 'United Kingdom',
    phone: '+44 (0) 1869338611',
  },
]

const sampleAppointments = [
  {
    id: '1',
    firstName: 'Bruno',
    lastName: 'Ballardin',
    avatarUrl: userAvatar,
    mobile: '383299103',
    email: 'bruno.barllardin@sample.io',
  },
]

export const Basic = ClientDetailsStory.bind({})
Basic.args = {
  clientData: {
    avatar: userAvatar,
    isActive: true,
    cardOption: [],
    firstName: 'Bruno',
    lastName: 'Ballardin',
    labels: [
      { label: '#coporate', color: '#1a89d0', count: 0 },
      { label: '#new-patient', color: '#1bba2a', count: 0 },
      { label: 'new client', color: '#467a34', count: 0 },
      { label: '2 no shows', color: '#6892bf', count: 0 },
    ],
    onAccount: -540,
    outStanding: 540,
    patientID: '325',
    referredBy: 'Doctor Referral',
    dob: '1969-11-28',
    gender: 'Male',
    address: '',
    phone: '383299103',
    email: 'bruno.ballardin@outlook.com',
    regDate: '2021-01-01',
    relationships: [
      {
        type: 'company',
        company: 'Deddington Health Centre',
        address: 'Earls Lane , Deddington, Banbury, Oxfordshire OX15 0TQ',
        phone: '+44 (0) 1869338611',
      },
    ],
    defaultPayer: 'Self paid',
    discount: '',
    pricelist: '',
    membershipNumber: 'BL-4444-0000-2222',
    allocatedAuthorisations: '',
  },
  searchResults: searchResults,
  appointments: sampleAppointments,
}
