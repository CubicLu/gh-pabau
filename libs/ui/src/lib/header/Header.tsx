import React, { FC, useCallback, useState } from 'react'
import { Dropdown, Layout, Menu } from 'antd'
import {
  BellOutlined,
  CalendarOutlined,
  MailOutlined,
  PlusCircleFilled,
  PoundOutlined,
  SettingOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { Logo } from '../logo/Logo'
import styles from './Header.module.less'
import { Button, Dropdown as AvatarDropDown } from '@pabau/ui'
import { Search } from './search/search'
import PabauNotification from './notification/notification'
import PabauMessages from './messages/messages'

const AntHeader = Layout.Header

interface P {
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
}

const items = [
  {
    name: 'Contact',
    icon: <UserOutlined />,
  },
  {
    name: 'Lead',
    icon: <SmileOutlined />,
  },
  {
    name: 'Appointment',
    icon: <CalendarOutlined />,
  },
  {
    name: 'Invoice',
    icon: <PoundOutlined />,
  },
]

export const Header: FC<P> = ({ searchRender, ...props }) => {
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(false)
  const [openMessageDrawer, setMessageDrawer] = useState<boolean>(false)
  const handleMenuClick = useCallback(() => alert('Not yet done'), [])
  const overlay = (
    <Menu onClick={handleMenuClick}>
      {items.map(({ name, icon }) => (
        <Menu.Item key={name} icon={icon}>
          {name}
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <AntHeader
      className={styles.pabauHeader}
      style={{
        backgroundColor: 'white',
        height: '80px',
        top: 0,
        zIndex: 2,
        border: '1px solid #ECEDF0',
      }}
    >
      <div
        style={{
          paddingLeft: '30px',
          paddingRight: '30px',
          height: '100%',
          display: 'flex',
          placeItems: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo />

        <div style={{ width: '360px' }}>{searchRender ? searchRender(<Search />) : <Search />}</div>
        <div className={styles.headerAlign}>
          <SettingOutlined className={styles.headerIcon} />
          <BellOutlined
            className={styles.headerIcon}
            onClick={() => setNotificationDrawer((e) => !e)}
          />
          <MailOutlined className={styles.headerIcon} onClick={() => setMessageDrawer((e) => !e)} />

          <div>
            <Dropdown overlay={overlay}>
              <Button type="default" className={styles.createBtnStyle}>
                <PlusCircleFilled /> Create
              </Button>
            </Dropdown>
          </div>
          <AvatarDropDown />
        </div>
        {openNotificationDrawer && (
          <PabauNotification
            openDrawer={openNotificationDrawer}
            closeDrawer={() => setNotificationDrawer((e) => !e)}
          />
        )}
        {openMessageDrawer && (
          <PabauMessages
            openDrawer={openMessageDrawer}
            closeDrawer={() => setMessageDrawer((e) => !e)}
          />
        )}
      </div>
    </AntHeader>
  )
}

export default Header
