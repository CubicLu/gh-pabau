import React from 'react'
import AddPeopleModal from './AddPeopleModal'
import { staff } from '../../mocks/chat'

export default {
  component: AddPeopleModal,
  title: 'Chat/AddPeopleModal',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AddPeopleModalStory = ({ ...args }) => (
  <AddPeopleModal isAddModalVisible={true} members={staff} {...args} />
)

export const AddPeople = AddPeopleModalStory.bind({})
AddPeople.args = {
  isAddModalVisible: true,
  searchAddMember: [],
  selectedGroup: 'general',
  members: staff,
  searchMemberText: '',
}
