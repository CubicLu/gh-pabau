/* eslint-disable */
import React from 'react'
import PinScreen from './PinScreen'

export default {
  component: PinScreen,
  title: 'UI/PinScreen',
}

const PinScreenStory = (args) => {
  return <PinScreen {...args} />
}

export const Pin = PinScreenStory.bind({})
Pin.args = {

}
