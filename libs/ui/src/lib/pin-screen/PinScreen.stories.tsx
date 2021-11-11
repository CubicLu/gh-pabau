/* eslint-disable */
import React from 'react'
import PinScreen from './PinScreen'

export default {
  component: PinScreen,
  title: 'UI/PinScreen',
  args: {
    pin: '1122',
    onSubmit: (result) => result
  }
}

const PinScreenStory = (args) => {
  return <PinScreen {...args} />
}

export const Pin = PinScreenStory.bind({})
Pin.args = {
  onSubmit: (result) => result
}
