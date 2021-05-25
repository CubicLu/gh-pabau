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

export const Basic = ClientDetailsStory.bind({})
Basic.args = {
  clientData: {
    avatar: userAvatar,
    isActive: true,
    cardOption: [],
    firstName: 'Bruno',
    lastName: 'Ballardin',
    labels: ['#coporate', '#new-patient', 'new client', '2 no shows'],
    onAccount: -540,
    outStanding: 540,
    patientID: '325',
    referredBy: 'Doctor Referral',
    dob: '1969-11-28',
    gender: 'Male',
    address: '68 Vassall Road, London, SW9 6HY',
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
}
