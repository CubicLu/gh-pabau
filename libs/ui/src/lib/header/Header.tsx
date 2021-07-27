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
import React, { useState, useEffect } from 'react'
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

interface ProductNews {
  id: string
  img: string
  link: string
  title: string
  description: string
  time: Date | string
  readUsers: number[]
}

interface UserProps {
  user: number
  company: number
  companyName: string
  fullName: string
}

interface P {
  notifications?: Notification[]
  productNews?: ProductNews[]
  readNewsMutation?: MutationFunction
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
  productNews,
  user,
  searchRender,
  onMessageIconClick,
  // onCreateChannel,
  // onMessageType,
  relativeTime,
  deleteNotification,
  updateNotification,
  readAddMutation,
  readNewsMutation,
  taskManagerIFrameComponent,
  ...rest
}: P): JSX.Element => {
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openMessageDrawer, setMessageDrawer] = useState<boolean>(false)
  const [unreadNewsCount, setUnreadNewsCount] = useState<number>(0)
  const [
    unreadNotificationCount,
    setUnreadNotificationCount,
  ] = useState<number>(0)

  const isReadNotify = (users: number[]) => {
    return users?.find((user_id) => user_id === user?.user) ? true : false
  }

  const setUnreadNotify = (notifyArray, readKey, setter) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const notifies: any = []
    for (const notify in notifyArray) {
      const _notify = notifyArray[notify]
      const users = _notify[readKey]
      if (!isReadNotify(users)) {
        notifies.push(notify)
      }
    }
    setter(notifies?.length > 0 ? notifies?.length : 0)
  }

  useEffect(() => {
    setUnreadNotify(productNews, 'readUsers', (length) =>
      setUnreadNewsCount(length)
    )
    setUnreadNotify(notifications, 'read', (length) =>
      setUnreadNotificationCount(length)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productNews, notifications])

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
                  count={unreadNewsCount + unreadNotificationCount}
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
          unreadNewsCount={unreadNewsCount}
          unreadNotificationCount={unreadNotificationCount}
          closeDrawer={() => setNotificationDrawer((e) => !e)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          notifications={notifications}
          productNews={productNews}
          relativeTime={relativeTime}
          deleteNotification={deleteNotification}
          updateNotification={updateNotification}
          readNewsMutation={readNewsMutation}
          readAddMutation={readAddMutation}
        />
      )}
    </>
  )
}

export default Header
export * from './messages/Messages'
