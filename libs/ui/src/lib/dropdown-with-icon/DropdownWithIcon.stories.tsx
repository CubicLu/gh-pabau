import React from 'react'
import { notification } from 'antd'
import DropdownWithIcon from './DropdownWithIcon'
import EmployeeImg from './employee.png'

export default {
  component: DropdownWithIcon,
  title: 'Forms/DropdownWithIcon',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const params = {
  label: 'Options',
  value: 'Laura Sutton',
  tooltip: '',
  onSelected: (value) => {
    notification.open({ message: `Select ${value.label}` })
  },
  options: [
    {
      label: 'Laura Sutton',
      icon: EmployeeImg,
    },
    {
      label: 'John Doe',
      icon: EmployeeImg,
    },
  ],
}

const LanguageDropdownStory = ({ ...rest }) => <DropdownWithIcon {...params} />
export const Basic = LanguageDropdownStory.bind({})
Basic.args = params
