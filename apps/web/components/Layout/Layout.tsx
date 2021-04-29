import { gql, useSubscription } from '@apollo/client'
import { useDisabledFeaturesQuery } from '@pabau/graphql'
import { Iframe, Layout as PabauLayout, LayoutProps } from '@pabau/ui'
import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import useLogin from '../../hooks/authentication/useLogin'
import Login from '../../pages/login'
import Search from '../Search'

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

const LIST_QUERY = gql`
  subscription notifications($user: jsonb) {
    notifications(
      order_by: { order: desc }
      where: { sent_to: { _contains: $user } }
    ) {
      id
      sent_to
      is_read
      created_at
      variables
      destination
      sent_by
      loop
      notification_type {
        id
        name
        title
        description
      }
    }
  }
`

const onMessageType = () => {
  //add mutation for send message textbox
}

const onCreateChannel = (name, description, isPrivate) => {
  //add mutation for create Channel here
  console.log('onCreateChannel-- or another one', name, description, isPrivate)
}

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  const [authenticated, user] = useLogin(false)
  const [notifications, setNotifications] = useState<Notification[]>()
  const router = useRouter()
  const { data, error, loading } = useDisabledFeaturesQuery()
  const { data: notificationData } = useSubscription(LIST_QUERY, {
    variables: { user: [user?.user] },
  })
  const loggedUser = useContext(UserContext)
  const userData = { ...user, fullName: loggedUser?.me?.full_name }

  useEffect(() => {
    if (notificationData?.notifications?.length > 0) {
      const todayNotification = notificationData.notifications.map(
        (notification) => ({
          id: notification.id,
          type_id: notification?.notification_type?.id,
          notificationTime: notification?.created_at,
          notificationType: notification?.notification_type?.name.trim(),
          title: notification?.notification_type?.title,
          desc: notification?.notification_type?.description,
          read: notification?.is_read,
          users: notification?.sent_to,
          link: notification?.destination,
          variables: notification?.variables,
          sentBy: notification?.sent_by,
          loop: notification?.loop,
        })
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
    return (
      <PabauLayout
        notifications={notifications}
        user={userData}
        searchRender={() => <Search />}
        onCreateChannel={onCreateChannel}
        onMessageType={onMessageType}
        legacyContent={!!legacyPage}
        {...props}
      >
        {!legacyPage ? children : <Iframe urlPath={legacyPage} />}
      </PabauLayout>
    )
  }
  return <Login />
}

export default Layout
