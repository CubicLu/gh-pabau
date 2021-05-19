import React from 'react'
import { MergeTagModal } from '@pabau/ui'
import { tagList } from './data'
export default {
  component: MergeTagModal,
  title: 'UI/Merge Tag Modal',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const MergeTagModalStory = ({ ...args }) => <MergeTagModal {...args} />

export const Basic = MergeTagModalStory.bind({})
Basic.args = {
  title: 'Add a Personalization',
  tagModuleItems: tagList,
}
