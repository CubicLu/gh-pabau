import React from 'react'
import AddRelationship, { AddRelationshipProps } from './AddRelationship'

export default {
  component: AddRelationship,
  title: 'UI/AddRelationship',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AddRelationshipStory = ({ ...args }: AddRelationshipProps) => (
  <AddRelationship {...args} />
)

export const AddRelationshipModal = AddRelationshipStory.bind({})
AddRelationshipModal.args = {
  title: 'Add Relationship',
  visible: true,
  onOpenAddModal: (relationshipType: string) => {
    return
  },
  onClose: () => {
    return
  },
}
