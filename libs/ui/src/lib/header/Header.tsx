import {
  BellOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { MutationFunction } from '@apollo/client'
import {
  Dropdown as AvatarDropDown,
  Logo,
  NotificationDrawer,
  QuickCreate,
} from '@pabau/ui'
import Link from 'next/link'
import { Badge, Col, Layout, Row } from 'antd'
import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import styles from './Header.module.less'
import { Search } from './search/Search'
import { NotificationDrawerItemType } from '../notification-drawer/NotificationItem'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'
import journeyCalendar from '../../assets/images/journey-calendar.png'

const AntHeader = Layout.Header

interface ProductNews {
  id: string
  img: string
  link: string
  title: string
  description: string
  time: Date | string
  readUsers: number[]
}

interface P {
  notifications?: NotificationDrawerItemType[]
  productNews?: ProductNews[]
  readNewsMutation?: MutationFunction
  updateNotificationState?: MutationFunction
  relativeTime?: (lan: string, date: Date) => string
  user?: Partial<AuthenticatedUser> & JwtUser
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  onMessageIconClick?(): void
  onLogOut?(): void
  // onCreateChannel?: (
  //   name: string,
  //   description: string,
  //   isPrivate: boolean
  // ) => void
  // onMessageType?: (e: MouseEvent<HTMLElement>) => void
  taskManagerIFrameComponent?: JSX.Element
  journeyRender?: (handleClose?: () => void) => JSX.Element
  clientCreateRender?: (handleClose?: () => void) => JSX.Element
  leadCreateRender?: (handleClose?: () => void) => JSX.Element
  sidebarCollapsed?: boolean
  toggleSidebar?: (e: boolean) => void
}

export const Header = ({
  notifications,
  productNews,
  user,
  searchRender,
  onMessageIconClick,
  onLogOut,
  relativeTime,
  updateNotificationState,
  readNewsMutation,
  taskManagerIFrameComponent,
  clientCreateRender,
  leadCreateRender,
  sidebarCollapsed,
  toggleSidebar,
  journeyRender,
}: P): JSX.Element => {
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [sidebarcollapsed, setSidebarcollapsed] = useState(sidebarCollapsed)
  const [unreadNewsCount, setUnreadNewsCount] = useState<number>(0)
  const [openJourneyModal, setJourneyModal] = useState<boolean>(false)
  const [
    unreadNotificationCount,
    setUnreadNotificationCount,
  ] = useState<number>(0)

  const isReadNotify = (users: number[]) => {
    return !!users?.find((user_id) => user_id === user?.user)
  }

  const toggleJourneyModal = () => {
    setJourneyModal((e) => !e)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productNews])

  useEffect(() => {
    const unReadNotifications =
      notifications?.filter((notification) => !notification.is_read)?.length ||
      0
    setUnreadNotificationCount(unReadNotifications)
  }, [notifications])

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
            <Col md={6} lg={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <div>
                  {React.createElement(
                    sidebarcollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: classNames(
                        styles.sidebarCollapseIcon,
                        sidebarcollapsed && styles.sidebarCollapsed
                      ),
                      onClick: () => {
                        if (toggleSidebar) {
                          toggleSidebar(!sidebarcollapsed)
                        }
                        setSidebarcollapsed(!sidebarcollapsed)
                      },
                    }
                  )}
                </div>
                <Link href="/">
                  <Logo style={{ cursor: 'pointer' }} />
                </Link>
              </div>
            </Col>
            <Col md={8} lg={12} className={styles.headerSearchCenter}>
              <div style={{ width: '400px' }}>
                {searchRender ? searchRender(<Search />) : <Search />}
              </div>
              <div style={{ marginLeft: 10 }}>
                <QuickCreate
                  clientCreateRender={clientCreateRender}
                  leadCreateRender={leadCreateRender}
                />
              </div>
            </Col>
            <Col md={10} lg={6} className={styles.headerIconEnd}>
              <div className={styles.headerAlign}>
                <div
                  className={styles.headerCalendar}
                  onClick={() => setJourneyModal((e) => !e)}
                >
                  <img alt="journey-calendar" src={journeyCalendar} />
                </div>
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
                <AvatarDropDown
                  taskManagerIFrameComponent={taskManagerIFrameComponent}
                  userData={user}
                  onLogOut={onLogOut}
                />
              </div>
            </Col>
          </Row>
        </div>
      </AntHeader>
      {journeyRender && openJourneyModal && journeyRender(toggleJourneyModal)}
      {openNotificationDrawer && (
        <NotificationDrawer
          user={user}
          openDrawer={openNotificationDrawer}
          unreadNewsCount={unreadNewsCount}
          unreadNotificationCount={unreadNotificationCount}
          closeDrawer={() => setNotificationDrawer((e) => !e)}
          notifications={notifications}
          productNews={productNews}
          relativeTime={relativeTime}
          readNewsMutation={readNewsMutation}
          updateNotificationState={updateNotificationState}
        />
      )}
    </>
  )
}
