import React from 'react'
import { MacroCreateModal } from './MacroCreateModal'
export default {
  component: MacroCreateModal,
  title: 'UI/Macro Create Modal',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const MacroCreateModalStory = ({ ...args }) => <MacroCreateModal {...args} />

export const Basic = MacroCreateModalStory.bind({})
Basic.args = {
  title: 'Create a macro',
}
