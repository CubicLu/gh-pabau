import React, { FC, useState, MouseEvent, useEffect } from 'react'
import { Badge, Col, Layout, Row } from 'antd'
import { BellOutlined, MailOutlined } from '@ant-design/icons'
import styles from './Header.module.less'
import {
  Dropdown as AvatarDropDown,
  QuickCreate,
  NotificationDrawer,
  Logo,
  useLiveQuery,
} from '@pabau/ui'
import { Search } from './search/Search'
import PabauMessages from './messages/Messages'
import classNames from 'classnames'
import AppointmentSVG from '../../assets/images/notification.svg'
import { gql } from '@apollo/client'

const AntHeader = Layout.Header

const notificationsMockData = [
  {
    Today: [],
  },
]

const LIST_QUERY = gql`
  query notifications {
    notifications {
      id
      text
      notification_type {
        type
        type_name
        title
      }
      created_at
    }
  }
`

interface P {
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  onCreateChannel?: (
    name: string,
    description: string,
    isPrivate: boolean
  ) => void
  onMessageType?: (e: MouseEvent<HTMLElement>) => void
}

interface Notification {
  notificationTime: string
  notificationType: string
  notificationTypeIcon: string
  title: string
  desc: string
  read: boolean
}

interface NotificationData {
  [key: string]: Notification[]
}

export const Header: FC<P> = ({
  searchRender,
  onCreateChannel,
  onMessageType,
  ...rest
}) => {
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [openMessageDrawer, setMessageDrawer] = useState<boolean>(false)

  const { data } = useLiveQuery(LIST_QUERY)
  console.log('data', data)

  const [notifications] = useState<NotificationData[]>(notificationsMockData)

  useEffect(() => {
    if (data?.length > 0) {
      const todayNotification = data.map((notification) => ({
        notificationTime: notification?.created_at,
        notificationType: notification?.notification_type?.type_name,
        notificationTypeIcon: AppointmentSVG,
        title: notification?.title,
        desc: notification?.text,
        read: false,
      }))
      notifications[0].Today = todayNotification
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
              <div style={{ width: '360px' }}>
                {searchRender ? searchRender(<Search />) : <Search />}
              </div>
            </Col>
            <Col md={10} lg={8} className={styles.headerIconEnd}>
              <div className={styles.headerAlign}>
                <Badge count={3} className={styles.badgeCircle}>
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
