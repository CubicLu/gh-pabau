import React, { FC } from 'react'
import DropdownOptionsTree from './DropdownOptionsTree'
import {
  HeartOutlined,
  WalletOutlined,
  TagOutlined,
  CodeSandboxOutlined,
  CarryOutOutlined,
} from '@ant-design/icons'

export default {
  component: DropdownOptionsTree,
  title: 'Forms/DropdownOptionsTree',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const params = {
  btnContent: <span>Show Items</span>,
  dropDownTitle: 'Items',
  options: [
    {
      key: 'service',
      title: 'Service',
      icon: <HeartOutlined />,
      childrens: [
        {
          title: 'Seasonal Offers',
          key: 'Seasonal Offers',
          childrens: [
            {
              title: '4 ml contour service',
              key: '4 ml contour service',
            },
            {
              title: '2 ml contour service',
              key: '2 ml contour service',
            },
            {
              title: '1 ml filler service',
              key: '1 ml filler service',
            },
          ],
        },
        {
          title: 'Special Offers (12)',
          key: 'Special Offers',
          childrens: [
            {
              title: '4 ml contour offer',
              key: '4 ml contour offer',
            },
          ],
        },
      ],
    },
    {
      key: 'product',
      title: 'Product',
      icon: <CarryOutOutlined />,
    },
    {
      key: 'package',
      title: 'Package',
      icon: <CodeSandboxOutlined />,
    },
    {
      key: 'gift_voucher',
      title: 'Gift Voucher',
      icon: <TagOutlined />,
    },
    {
      key: 'account_balance',
      title: 'Account Balance',
      icon: <WalletOutlined />,
    },
  ],
  onItemSelect: (e) => console.log('onItemSelect', e),
}

const LanguageDropdownStory = ({ ...rest }) => (
  <DropdownOptionsTree {...params} />
)
export const Basic = LanguageDropdownStory.bind({})
Basic.args = params

export const CustomDropdownStory: FC = () => {
  return <DropdownOptionsTree {...params} />
}
