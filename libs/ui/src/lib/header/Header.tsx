import React, { FC, useState, MouseEvent } from 'react'
import { Badge, Col, Layout, Row } from 'antd'
import { BellOutlined, MailOutlined } from '@ant-design/icons'
import styles from './Header.module.less'
import {
  Dropdown as AvatarDropDown,
  QuickCreate,
  NotificationDrawer,
  Logo,
} from '@pabau/ui'
import { Search } from './search/Search'
import PabauMessages from './messages/Messages'
import classNames from 'classnames'

const AntHeader = Layout.Header

interface Notification {
  id: string
  notificationTime: Date
  notificationType: string
  notificationTypeIcon?: string
  title: string
  desc: string
  read: number[]
  users: number[]
  link: string
}

interface UserProps {
  user: number
  company: number
  fullName: string
}

interface P {
  notifications?: Notification[]
  user?: UserProps
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  onCreateChannel?: (
    name: string,
    description: string,
    isPrivate: boolean
  ) => void
  onMessageType?: (e: MouseEvent<HTMLElement>) => void
}

export const Header: FC<P> = ({
  notifications,
  user,
  searchRender,
  onCreateChannel,
  onMessageType,
  ...rest
}) => {
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [openMessageDrawer, setMessageDrawer] = useState<boolean>(false)

  return (
    <>
      <AntHeader
        className={classNames(styles.pabauHeader, styles.mobileViewNone)}
      >
        <div
          style={{
            paddingLeft: '30px',
            paddingRight: '30px',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Row>
            <Col md={6} lg={8}>
              <Logo />
            </Col>
            <Col md={8} lg={8} className={styles.headerSearchCenter}>
              <div style={{ width: '400px' }}>
                {searchRender ? searchRender(<Search />) : <Search />}
              </div>
            </Col>
            <Col md={10} lg={8} className={styles.headerIconEnd}>
              <div className={styles.headerAlign}>
                <Badge
                  count={notifications?.length}
                  className={styles.badgeCircle}
                >
                  <BellOutlined
                    className={styles.headerIcon}
                    onClick={() => setNotificationDrawer((e) => !e)}
                  />
                </Badge>
                <Badge count={3} className={styles.badgeCircle}>
                  <MailOutlined
                    className={styles.headerIcon}
                    onClick={() => setMessageDrawer((e) => !e)}
                  />
                </Badge>
                <div>
                  <QuickCreate />
                </div>
                <AvatarDropDown {...rest} />
              </div>
            </Col>
          </Row>
        </div>
      </AntHeader>

      {openNotificationDrawer && (
        <NotificationDrawer
          user={user}
          openDrawer={openNotificationDrawer}
          closeDrawer={() => setNotificationDrawer((e) => !e)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          notifications={notifications}
        />
      )}
      {openMessageDrawer && (
        <PabauMessages
          openDrawer={openMessageDrawer}
          closeDrawer={() => setMessageDrawer((e) => !e)}
          onCreateChannel={onCreateChannel}
          onMessageType={onMessageType}
        />
      )}
    </>
  )
}

export default Header
export * from './messages/Messages'
