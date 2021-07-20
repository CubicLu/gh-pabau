import React from 'react'
import { CustomModal } from './CustomModal'

export default {
  component: CustomModal,
  title: 'Modals/customModal',
  argTypes: {
    onClick: { action: 'clicked' },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const story = ({ ...args }) => (
  <CustomModal {...args} datasource={args.datasource} config={args.config} />
)

export const defaultTool = story.bind({})
defaultTool.args = {}
