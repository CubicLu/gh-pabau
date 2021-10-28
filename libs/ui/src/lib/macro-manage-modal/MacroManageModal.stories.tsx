import React from 'react'
import { MacroManageModal } from './MacroManageModal'
export default {
  component: MacroManageModal,
  title: 'UI/Macro Manage Modal',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const MacroMangeModalStory = ({ ...args }) => <MacroManageModal {...args} />

export const Basic = MacroMangeModalStory.bind({})
Basic.args = {
  title: 'Manage macros',
}
