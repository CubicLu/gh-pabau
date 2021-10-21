/* eslint-disable */
import React from 'react'
import JourneyCalendar from './JourneyCalendar'

export default {
  component: JourneyCalendar,
  title: 'UI/JourneyCalendar',
  args: {},
  argTypes: {},
}

const CalendarStory = ({ args }) => {
  return <JourneyCalendar {...args}/>
}

export const Basic = CalendarStory.bind({})
Basic.args = {
  setActiveDate: (val) => {
    console.log(val)
  },
  activeDate: 'Oct 21 2021'
}
