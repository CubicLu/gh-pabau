import React from 'react'
import TimeInput from './TimeInput'
import { TimePicker, DatePicker } from './TimePicker'

export default {
  component: TimeInput,
  title: 'Basics/TimeInput',
  args: { label: 'Pabau' },
  argTypes: {
    label: { control: { type: 'text' } },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const TimeInputStory = ({ ...args }) => (
  <TimeInput {...args}>{args.label}</TimeInput>
)

export const Basic = TimeInputStory.bind({})
Basic.args = {
  label: 'Start Time',
}

const TimePickerStory = ({ ...args }) => <TimePicker {...args} />
export const BasicTimePicker = TimePickerStory.bind({})
Basic.args = {
  label: 'Start Time',
}

const DatePickerStory = ({ ...args }) => <DatePicker {...args} />
export const BasicDatePicker = DatePickerStory.bind({})
Basic.args = {
  label: 'Date',
  placeholder: 'hello',
}
