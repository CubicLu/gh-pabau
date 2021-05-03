import React from 'react'
import BusinessTypes from './BusinessTypes'
import { bizTypes } from '../../assets/images/biz-types'

export default {
  component: BusinessTypes,
  title: 'Business Details/BusinessTypes',
  args: {},
  argTypes: {},
}

const BusinessTypesStory = ({ ...args }) => {
  return <BusinessTypes List={bizTypes} {...args} />
}

export const Basic = BusinessTypesStory.bind({})
Basic.args = {
  onSelected: (val) => {
    console.log(val)
  },
}
