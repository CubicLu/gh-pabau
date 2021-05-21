import {
  useDisabledFeaturesQuery,
  useNotificationsSubscription,
  useUpdate_Notifications_By_PkMutation,
  useDelete_Notifications_By_PkMutation,
  useInsert_Read_Notification_OneMutation,
} from '@pabau/graphql'
import { Iframe, Layout as PabauLayout, LayoutProps } from '@pabau/ui'
import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { relativeTime } from '../../helper/relativeTimeFormat'
import useLogin from '../../hooks/authentication/useLogin'
import Login from '../../pages/login'
import Search from '../Search'
import StickyPopout from '../StickyPopout/StickyPopout'
import TaskManagerIFrame from '../TaskManagerIFrame/TaskManagerIFrame'
import { Unauthorized } from '../Unauthorized'

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

const onMessageType = () => {
  //add mutation for send message textbox
}

const onCreateChannel = (name, description, isPrivate) => {
  //add mutation for create Channel here
  console.log('onCreateChannel-- or another one', name, description, isPrivate)
}

const Layout: FC<LayoutProps> = ({
  children,
  requireAdminAccess = false,
  ...props
}) => {
  const [authenticated, user] = useLogin(false)
  const [notifications, setNotifications] = useState<Notification[]>()
  const router = useRouter()
  const { data, error, loading } = useDisabledFeaturesQuery()

  const { data: notificationData } = useNotificationsSubscription({
    variables: { user: [user?.user] },
  })

  const loggedUser = useContext(UserContext)
  const userData = { ...user, fullName: loggedUser?.me?.full_name }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return requireAdminAccess && (!user?.admin || user?.admin === undefined) ? (
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
          onCreateChannel={onCreateChannel}
          onMessageType={onMessageType}
          legacyContent={!!legacyPage}
          taskManagerIFrameComponent={<TaskManagerIFrame />}
          {...props}
        >
          {!legacyPage ? children : <Iframe urlPath={legacyPage} />}
        </PabauLayout>
        <StickyPopout {...props} />
      </>
    )
  }
  return <Login />
}

export default Layout
