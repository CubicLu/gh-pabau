import { BellOutlined, MailOutlined } from '@ant-design/icons'
import { MutationFunction } from '@apollo/client'
import {
  Dropdown as AvatarDropDown,
  Logo,
  NotificationDrawer,
  QuickCreate,
} from '@pabau/ui'
import { Badge, Col, Layout, Row } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './Header.module.less'
import { Search } from './search/Search'

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
  companyName: string
  fullName: string
}

interface P {
  notifications?: Notification[]
  deleteNotification?: MutationFunction
  updateNotification?: MutationFunction
  readAddMutation?: MutationFunction
  relativeTime?: (lan: string, date: Date) => string
  user?: UserProps
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  onMessageIconClick?(): void
  // onCreateChannel?: (
  //   name: string,
  //   description: string,
  //   isPrivate: boolean
  // ) => void
  // onMessageType?: (e: MouseEvent<HTMLElement>) => void
  taskManagerIFrameComponent?: JSX.Element
}

export const Header = ({
  notifications,
  user,
  searchRender,
  onMessageIconClick,
  // onCreateChannel,
  // onMessageType,
  relativeTime,
  deleteNotification,
  updateNotification,
  readAddMutation,
  taskManagerIFrameComponent,
  ...rest
}: P): JSX.Element => {
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )

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
                <Badge count={4} className={styles.badgeCircle}>
                  <MailOutlined
                    className={styles.headerIcon}
                    onClick={() => onMessageIconClick?.()}
                  />
                </Badge>
                <div>
                  <QuickCreate />
                </div>
                <AvatarDropDown
                  taskManagerIFrameComponent={taskManagerIFrameComponent}
                  userData={user}
                />
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
          relativeTime={relativeTime}
          deleteNotification={deleteNotification}
          updateNotification={updateNotification}
          readAddMutation={readAddMutation}
        />
      )}
    </>
  )
}

export default Header
export * from './messages/Messages'
