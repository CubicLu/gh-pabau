import React from 'react'
import AddThirdParty, { AddThirdPartyProps } from './AddThirdParty'

export default {
  component: AddThirdParty,
  title: 'UI/AddThirdParty',
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AddThirdPartyStory = ({ ...args }: AddThirdPartyProps) => (
  <AddThirdParty {...args} />
)

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

export const AddPractice = AddThirdPartyStory.bind({})
AddPractice.args = {
  thirdPartyType: 'practioner',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
  searchResults: searchResults,
}

export const AddCompany = AddThirdPartyStory.bind({})
AddCompany.args = {
  thirdPartyType: 'company',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
  searchResults: searchResults,
}

export const AddInsurnaceProvider = AddThirdPartyStory.bind({})
AddInsurnaceProvider.args = {
  thirdPartyType: 'insurance-provider',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
  searchResults: searchResults,
}
