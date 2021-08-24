import React from 'react'
import BusinessDetails from './BusinessDetails'

export default {
  component: BusinessDetails,
  title: 'UI/Details',
  args: {},
  argTypes: {},
}

const DetailsStory = ({ args }) => {
  return <BusinessDetails {...args} />
}

export const Basic = DetailsStory.bind({})
Basic.args = {
  onSave: (val) => {
    console.log(val)
  },
}
