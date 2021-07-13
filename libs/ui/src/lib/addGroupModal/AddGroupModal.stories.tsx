import React from 'react'
import AddGroupModal from './AddGroupModal'
import { staff as groupData } from '../../mocks/chat'
import Linda from '../../assets/images/users/linda.png'

export default {
  component: AddGroupModal,
  title: 'Chat/AddGroupModal',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AddGroupModalStory = ({ ...args }) => (
  <AddGroupModal groupData={groupData} isGroupModalVisible={true} {...args} />
)

export const AddGroupMember = AddGroupModalStory.bind({})
AddGroupMember.args = {
  memberModalTitle: 'General',
  groupData: groupData,
  selectedGroup: 'general',
  isGroupModalVisible: true,
  searchMemberText: 'Li',
  searchMember: [
    {
      userName: 'Linda Starck',
      profileURL: Linda,
    },
  ],
}
