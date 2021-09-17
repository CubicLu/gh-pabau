import React, { FC } from 'react'
import InlineEdit, { InlineEditDataTypes, InlineEditProps } from './InlineEdit'

export default {
  component: InlineEdit,
  title: 'UI/InlineEdit',
  args: {},
  argTypes: {},
}

const InlineEditStory: FC<InlineEditProps> = ({ ...args }) => {
  return (
    <div
      style={{
        width: '408px',
        padding: '1rem',
        backgroundColor: '#e5e5e5',
      }}
    >
      <InlineEdit {...args} />
    </div>
  )
}

export const Basic = InlineEditStory.bind({})
Basic.args = {
  fieldName: 'Name',
  type: InlineEditDataTypes.text,
  initialValue: 'Inline Edit Component',
}

export const NumberEdit = InlineEditStory.bind({})
NumberEdit.args = {
  fieldName: 'Number',
  type: InlineEditDataTypes.number,
  initialValue: '1234567890',
}

export const EmailEdit = InlineEditStory.bind({})
EmailEdit.args = {
  fieldName: 'Email',
  type: InlineEditDataTypes.email,
  initialValue: 'pabau@pabau.com',
}

export const PhoneNumberEdit = InlineEditStory.bind({})
PhoneNumberEdit.args = {
  fieldName: 'Phone Number',
  type: InlineEditDataTypes.phone,
  initialValue: '+44 879 696 059',
}

export const DateEdit = InlineEditStory.bind({})
DateEdit.args = {
  fieldName: 'Date',
  type: InlineEditDataTypes.date,
  initialValue: '1 October 2021 10:00',
}
