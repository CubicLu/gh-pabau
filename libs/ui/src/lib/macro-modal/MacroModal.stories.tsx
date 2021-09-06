import React from 'react'
import { MacroModal } from '@pabau/ui'
import { tagList } from './data'
export default {
  component: MacroModal,
  title: 'UI/Macro Modal',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const MacroModalStory = ({ ...args }) => <MacroModal {...args} />

export const Basic = MacroModalStory.bind({})
Basic.args = {
  title: 'Add a Macro',
  tagModuleItems: tagList,
}
