import {
  useDisabledFeaturesQuery,
  useNotificationsSubscription,
  useUpdate_Notifications_By_PkMutation,
  useDelete_Notifications_By_PkMutation,
  useInsert_Read_Notification_OneMutation,
} from '@pabau/graphql'
import {
  Iframe,
  Layout as PabauLayout,
  LayoutProps,
  StickyPopout,
} from '@pabau/ui'
import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { relativeTime } from '../../helper/relativeTimeFormat'
import useLogin from '../../hooks/authentication/useLogin'
import Login from '../../pages/login'
import Search from '../Search'
import styles from './Layout.module.less'
import TaskManagerIFrame from '../TaskManagerIFrame/TaskManagerIFrame'
import { Unauthorized } from '../Unauthorized'
import CommonHeader from '../CommonHeader'
import Chat from '../Chat/Chat'

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

const Layout: FC<LayoutProps> = ({
  children,
  allowed = true,
  requireAdminAccess = false,
  ...props
}) => {
  const [authenticated, user] = useLogin(false)
  const [notifications, setNotifications] = useState<Notification[]>()
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()
  const { data, error, loading } = useDisabledFeaturesQuery()

  const { data: notificationData } = useNotificationsSubscription({
    variables: { user: [user?.user] },
  })

  const loggedUser = useContext(UserContext)
  const userData = {
    ...user,
    companyName: loggedUser?.me?.company?.details.company_name,
    fullName: loggedUser?.me?.full_name,
  }

  const [
    insertReadNotificationOneMutation,
  ] = useInsert_Read_Notification_OneMutation()
  const [
    updateNotificationsByPkMutation,
  ] = useUpdate_Notifications_By_PkMutation()
  const [
    deleteNotificationsByPkMutation,
  ] = useDelete_Notifications_By_PkMutation()

  useEffect(() => {
    if (notificationData?.notifications?.length > 0) {
      const todayNotification = notificationData.notifications.map(
        (notification) => {
          const readUsers = notification?.read_by?.map((users) => users.user)
          return {
            id: notification.id,
            type_id: notification?.notification_type?.id,
            notificationTime: notification?.created_at,
            notificationType: notification?.notification_type?.name.trim(),
            title: notification?.notification_type?.title,
            desc: notification?.notification_type?.description,
            read: readUsers,
            users: notification?.sent_to,
            link: notification?.destination,
            variables: notification?.variables,
            sentBy: notification?.sent_by,
            loop: notification?.loop,
          }
        }
      )
      setNotifications(todayNotification)
    }
  }, [notificationData?.notifications])

  if (error) {
    return (
      <div>
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </div>
    )
  }

  if (typeof window === 'undefined' || !data || loading) {
    return <PabauLayout> Loading animation placeholder </PabauLayout>
  }

  let legacyPage: boolean | string = false
  for (const [, row] of data.feature_flags.entries()) {
    if (router.pathname.substring(1) === row.page_slug) {
      legacyPage = '/' + row.fallback_slug
    }
  }

  if (
    typeof window !== 'undefined' &&
    authenticated &&
    user &&
    localStorage?.getItem('token')
  ) {
    return requireAdminAccess && !loggedUser?.me?.admin ? (
      <Unauthorized />
    ) : (
      <>
        <PabauLayout
          relativeTime={relativeTime}
          notifications={notifications}
          deleteNotification={deleteNotificationsByPkMutation}
          updateNotification={updateNotificationsByPkMutation}
          readAddMutation={insertReadNotificationOneMutation}
          user={userData}
          searchRender={() => <Search />}
          onMessageIconClick={() => setShowChat((e) => !e)}
          legacyContent={!!legacyPage}
          taskManagerIFrameComponent={<TaskManagerIFrame />}
          {...props}
        >
          <CommonHeader showChat={showChat} title="Pabau" isShowSearch={true} />
          <Chat closeDrawer={() => setShowChat(false)} visible={showChat} />

          {!legacyPage ? children : <Iframe urlPath={legacyPage} />}
        </PabauLayout>
        <div className={styles.stickyPopoutContainer}>
          <StickyPopout />
        </div>
      </>
    )
  }
  return <Login />
}

export default Layout
