import React, { FC } from 'react'
import { notification } from 'antd'
import DropdownWithIcon from './DropdownWithIcon'
import EmployeeImg from './employee.png'
import CustomDropdown from './CustomDropDown'
import {
  UsergroupAddOutlined,
  LockOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

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

export const CustomDropdownStory: FC = () => {
  const data = [
    {
      id: 1,
      icon: <LockOutlined />,
      title: 'Restrict sharing',
      displayTitle: 'Restricted',
      description:
        'You will not be able to share any records with this 3rd party.',
    },
    {
      id: 2,
      icon: <UsergroupAddOutlined />,
      title: 'Sharing',
      displayTitle: 'Sharing',
      description:
        'You will not be able to share any records with this 3rd party.',
    },
    {
      id: 3,
      icon: <GlobalOutlined />,
      title: 'Remote access',
      displayTitle: 'Access',
      description:
        'This 3rd party will have access to login via Pabau connect to view this client',
      isShowPlus: true,
    },
  ]
  return <CustomDropdown data={data} />
}
