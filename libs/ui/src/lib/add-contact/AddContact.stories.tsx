import React, { useState } from 'react'
import { Button } from '@pabau/ui'
import AddContact from './AddContact'

export default {
  component: AddContact,
  title: 'UI/AddContact',
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const sampleAppointments = [
  {
    id: '1',
    firstName: 'Bruno',
    lastName: 'Ballardin',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
    mobile: '383299103',
    email: 'bruno.barllardin@sample.io',
  },
]

const AddContactStory = ({ contactType }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#fff' }}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add New Contact
      </Button>
      <AddContact
        contactType={contactType}
        visible={visible}
        onClose={() => setVisible(false)}
        onAddRelationship={(val) => {
          return
        }}
        appointments={sampleAppointments}
      />
    </div>
  )
}

export const AddFamilyMember = AddContactStory.bind({})
AddFamilyMember.args = {
  contactType: 'family-member',
}

export const AddEmergencyContact = AddContactStory.bind({})
AddEmergencyContact.args = {
  contactType: 'emergency-contact',
}

export const AddNextOfKin = AddContactStory.bind({})
AddNextOfKin.args = {
  contactType: 'next-of-kin',
}
