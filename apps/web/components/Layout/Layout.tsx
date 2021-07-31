import {
  useDisabledFeaturesQuery,
  useNotificationsSubscription,
  useUpdate_Notifications_By_PkMutation,
  useDelete_Notifications_By_PkMutation,
  useInsert_Read_Notification_OneMutation,
  useProduct_NewsSubscription,
  useInsert_Product_News_Read_OneMutation,
} from '@pabau/graphql'
import { Layout as PabauLayout, LayoutProps, StickyPopout } from '@pabau/ui'
import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { relativeTime } from '../../helper/relativeTimeFormat'
import useLogin from '../../hooks/authentication/useLogin'
import Login from '../../pages/login'
import Search from '../Search'
import ClientCreate from '../Clients/ClientCreate'
import styles from './Layout.module.less'
import TaskManagerIFrame from '../TaskManagerIFrame/TaskManagerIFrame'
import { Unauthorized } from '../Unauthorized'
import CommonHeader from '../CommonHeader'
import Chat from '../Chat/Chat'
import LegacyPage from '../LegacyPage'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onMessageType = () => {
  //add mutation for send message textbox
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onCreateChannel = (name, description, isPrivate) => {
  //add mutation for create Channel here
  console.log('onCreateChannel-- or another one', name, description, isPrivate)
}

const Layout: FC<LayoutProps> = ({
  children,
  allowed = true,
  requireAdminAccess = false,
  handleSearch,
  ...props
}) => {
  const [authenticated, user] = useLogin(false)
  const [notifications, setNotifications] = useState<Notification[]>()
  const [productNews, setProductNews] = useState<ProductNews[]>()
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()
  const { data, error, loading } = useDisabledFeaturesQuery()

  const { data: notificationData } = useNotificationsSubscription({
    variables: { user: [user?.user] },
  })

  const { data: productNewsData } = useProduct_NewsSubscription()

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

  const [
    insertProductNewsReadOneMutation,
  ] = useInsert_Product_News_Read_OneMutation()
  useEffect(() => {
    if (productNewsData?.product_news?.length > 0) {
      const news: ProductNews[] = productNewsData?.product_news.map((news) => {
        const readUsers = news?.read_by?.map((users) => users.user)
        return {
          id: news.id,
          img: news.img,
          link: news.link,
          title: news.title,
          description: news.description,
          time: news.created_at,
          readUsers,
        }
      })
      setProductNews(news)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productNewsData?.product_news])

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
    } else {
      setNotifications([])
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
    if (router.asPath.substring(1) === row.page_slug) {
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
          productNews={productNews}
          deleteNotification={deleteNotificationsByPkMutation}
          updateNotification={updateNotificationsByPkMutation}
          readAddMutation={insertReadNotificationOneMutation}
          readNewsMutation={insertProductNewsReadOneMutation}
          user={userData}
          searchRender={() => <Search />}
          onMessageIconClick={() => setShowChat((e) => !e)}
          legacyContent={!!legacyPage}
          taskManagerIFrameComponent={<TaskManagerIFrame />}
          clientCreateRender={() => <ClientCreate />}
          {...props}
        >
          <CommonHeader
            showChat={showChat}
            title="Pabau"
            isShowSearch={true}
            handleSearch={handleSearch}
          />
          <Chat closeDrawer={() => setShowChat(false)} visible={showChat} />

          {!legacyPage ? children : <LegacyPage urlPath={legacyPage} />}
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
