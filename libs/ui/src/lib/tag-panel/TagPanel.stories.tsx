import React from 'react'
import TagPanel, { TagPanelProps } from './TagPanel'

export default {
  component: TagPanel,
  title: 'UI/Tag Modal',
  args: {},
  argTypes: {},
}

const TagPanelStory = ({ ...args }: TagPanelProps) => {
  return <TagPanel {...args} />
}

export const Basic = TagPanelStory.bind({})
