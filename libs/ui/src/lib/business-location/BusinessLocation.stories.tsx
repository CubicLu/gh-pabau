import React from 'react'
import BusinessLocation, { BusinessLocationProps } from './BusinessLocation'

export default {
  component: BusinessLocation,
  title: 'Business Details/BusinessLocation',
  args: {},
  argTypes: {},
}

const BusinessLocationStory = ({ ...args }: BusinessLocationProps) => {
  return <BusinessLocation {...args} />
}

export const Basic = BusinessLocationStory.bind({})
Basic.args = {
  apiKey: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw',
}
