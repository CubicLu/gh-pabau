import {
  useDisabledFeaturesQuery,
  useNotificationsSubscription,
  useUpdate_Notification_StateMutation,
  useProduct_NewsSubscription,
  useInsert_Product_News_Read_OneMutation,
  useSwitchCompanyMutation,
} from '@pabau/graphql'
import { Layout as PabauLayout, LayoutProps, StickyPopout } from '@pabau/ui'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { relativeTime } from '../../helper/relativeTimeFormat'
import Search from '../Search'
import ClientCreate from '../Clients/ClientCreate'
import LeadCreate from '../Lead/LeadCreate'
import styles from './Layout.module.less'
import TaskManagerIFrame from '../TaskManagerIFrame/TaskManagerIFrame'
import { Unauthorized } from '../Unauthorized'
import CommonHeader from '../CommonHeader'
import Chat from '../Chat/Chat'
import Login from '../../pages/login'
import Journey from '../Journey/Journey'

interface ProductNews {
  id: string
  img: string
  link: string
  title: string
  description: string
  time: Date | string
  readUsers: number[]
}

const Layout: FC<LayoutProps> = ({
  children,
  allowed = true,
  requireAdminAccess = false,
  ...props
}) => {
  const { me, login, logout } = useUser()
  const [notifications, setNotifications] = useState()
  const [productNews, setProductNews] = useState<ProductNews[]>()
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()
  const { data, error } = useDisabledFeaturesQuery()

  const { data: notificationData } = useNotificationsSubscription()
  const { data: productNewsData } = useProduct_NewsSubscription()

  const [switchCompany] = useSwitchCompanyMutation()

  const [
    updateNotificationStateMutation,
  ] = useUpdate_Notification_StateMutation()

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
          const state = notification?.notification_state
          return {
            id: notification.id,
            type_id: notification?.notification_type?.id,
            notificationTime: notification?.created_at,
            notificationType: notification?.notification_type?.name.trim(),
            title: notification?.notification_type?.title,
            desc: notification?.notification_type?.description,
            is_read: state?.is_read,
            is_deleted: state?.is_deleted,
            link: notification?.destination,
            variables: notification?.variables,
            sentBy: notification?.sent_by,
          }
        }
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setNotifications(todayNotification)
    } else {
      setNotifications(null)
    }
  }, [notificationData?.notifications])

  if (error) {
    return <Login />
  }

  let legacyPage: false | string = false
  if (data)
    for (const [, row] of data.feature_flags.entries()) {
      if (router.asPath.substring(1) === row.page_slug) {
        legacyPage = '/' + row.fallback_slug
      }
    }

  const userData = me
    ? {
        ...me,
        handleCompanySwitch: async (companyId) => {
          if (companyId !== me.company) {
            const result = await switchCompany({
              variables: {
                companyId,
              },
            })
            await login(result.data.switchCompany)
          }
        },
      }
    : null
  return requireAdminAccess && !me?.admin ? (
    <Unauthorized />
  ) : (
    <>
      <PabauLayout
        onLogOut={logout}
        relativeTime={relativeTime}
        notifications={notifications}
        productNews={productNews}
        updateNotificationState={updateNotificationStateMutation}
        readNewsMutation={insertProductNewsReadOneMutation}
        user={userData}
        searchRender={() => <Search />}
        onMessageIconClick={() => setShowChat((e) => !e)}
        legacyContent={!!legacyPage}
        taskManagerIFrameComponent={<TaskManagerIFrame />}
        journeyRender={(handleClose) => <Journey handleClose={handleClose} />}
        clientCreateRender={(handleClose) => (
          <ClientCreate handleClose={handleClose} />
        )}
        leadCreateRender={(handleClose) => (
          <LeadCreate handleClose={handleClose} />
        )}
        {...props}
      >
        <CommonHeader
          showChat={showChat}
          title="Pabau"
          isShowSearch={true}
          clientCreateRender={(handleClose) => (
            <ClientCreate handleClose={handleClose} />
          )}
          leadCreateRender={(handleClose) => (
            <LeadCreate handleClose={handleClose} />
          )}
        />
        <Chat closeDrawer={() => setShowChat(false)} visible={showChat} />

        {children}
      </PabauLayout>
      <div className={styles.stickyPopoutContainer}>
        <StickyPopout />
      </div>
    </>
  )

  //return <Login />
}

export default Layout
