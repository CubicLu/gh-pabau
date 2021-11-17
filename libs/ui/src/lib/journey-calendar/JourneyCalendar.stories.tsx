/* eslint-disable */
import React, { useState } from 'react'
import JourneyCalendar from './JourneyCalendar'

export default {
  component: JourneyCalendar,
  title: 'UI/JourneyCalendar',
}

const JourneyCalendarStory = (args) => {
  const [activeDate, setActiveDate] = useState(new Date())
  return <JourneyCalendar {...args} activeDate={activeDate} setActiveDate={setActiveDate} />
}

export const Calendar = JourneyCalendarStory.bind({})
Calendar.args = {
  activeDate: new Date(),
  setActiveDate: (val) => console.log(val)
}
