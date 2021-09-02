import React from 'react'
import { Button } from 'antd'
import CreateLabels, { CreateLabelsProps } from './CreateLabels'

export default {
  component: CreateLabels,
  title: 'UI/CreateLabels',
  args: {},
  argTypes: {},
}

const CreateLabelsStory = ({ ...args }: CreateLabelsProps) => (
  <CreateLabels {...args}>
    <Button>Create Labels</Button>
  </CreateLabels>
)

export const Default = CreateLabelsStory.bind({})
Default.args = {}
