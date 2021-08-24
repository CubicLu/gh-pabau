import React from 'react'
import { Logo } from '@pabau/ui'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  FlagOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

const { Sider } = Layout
const { SubMenu } = Menu

const Sidebar = () => {
  return (
    <Sider collapsible={false}>
      <Logo
        style={{ height: '60px', padding: '10px', backgroundColor: '#001628' }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        style={{ height: '100%' }}
        mode="inline"
      >
        <Menu.Item key="1" icon={<DesktopOutlined />}>
          <Link href={'/'}>Company Manager</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FlagOutlined />}>
          <Link href={'/feature-flags'}>Feature Flags</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
          <Menu.Item key="3">Option 1</Menu.Item>
          <Menu.Item key="4">Option 2</Menu.Item>
          <Menu.Item key="5">Option 3</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Option 1</Menu.Item>
          <Menu.Item key="8">Option 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default Sidebar
