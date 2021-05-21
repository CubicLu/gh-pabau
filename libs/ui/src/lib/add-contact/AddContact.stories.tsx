import React from 'react'
import userAvatar from '../../assets/images/users/austin.png'
import AddContact, { AddContactProps } from './AddContact'

export default {
  component: AddContact,
  title: 'UI/AddContact',
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AddContactStory = ({ ...args }: AddContactProps) => (
  <AddContact {...args} />
)

const sampleAppointments = [
  {
    title: 'Sample Appointment',
    firstName: 'Bruno',
    lastName: 'Ballardin',
    avatar: userAvatar,
    phone: '383299103',
  },
]

export const AddFamilyMember = AddContactStory.bind({})
AddFamilyMember.args = {
  contactType: 'family-member',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
  appointments: sampleAppointments,
}

export const AddEmergencyContact = AddContactStory.bind({})
AddEmergencyContact.args = {
  contactType: 'emergency-contact',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
  appointments: sampleAppointments,
}

export const AddNextOfKin = AddContactStory.bind({})
AddNextOfKin.args = {
  contactType: 'next-of-kin',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
  appointments: sampleAppointments,
}
