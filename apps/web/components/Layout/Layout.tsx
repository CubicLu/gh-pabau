import React, { FC, useState, useEffect } from 'react'
import { Layout as PabauLayout, LayoutProps, Iframe } from '@pabau/ui'
import Search from '../Search'
import useLogin from '../../hooks/authentication/useLogin'
import Login from '../../pages/login'
import { useRouter } from 'next/router'
import { useDisabledFeaturesQuery } from '@pabau/graphql'
import { useSubscription, gql } from '@apollo/client'

interface Notification {
  notificationTime: Date
  notificationType: string
  notificationTypeIcon?: string
  title: string
  desc: string
  read: boolean
}

const LIST_QUERY = gql`
  subscription notifications {
    notifications(order_by: { order: desc }) {
      id
      text
      title
      notification_type {
        type
        type_name
        title
      }
      created_at
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
  const { data: notificationData } = useSubscription(LIST_QUERY)

  useEffect(() => {
    if (notificationData?.notifications?.length > 0) {
      const todayNotification = notificationData.notifications.map(
        (notification) => ({
          notificationTime: notification?.created_at,
          notificationType: notification?.notification_type?.type_name,
          title: notification?.title,
          desc: notification?.text,
          read: false,
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
