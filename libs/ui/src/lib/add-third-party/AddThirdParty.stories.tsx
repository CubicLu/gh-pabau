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
}

export const AppCompany = AddThirdPartyStory.bind({})
AppCompany.args = {
  thirdPartyType: 'company',
  visible: true,
  onAddRelationship: (val) => {
    return
  },
  onClose: () => {
    return
  },
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
}
