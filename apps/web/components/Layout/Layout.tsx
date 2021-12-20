import {
  useDisabledFeaturesQuery,
  useNotificationsSubscription,
  useUpdate_Notification_StateMutation,
  useProduct_NewsSubscription,
  useInsert_Product_News_Read_OneMutation,
  useSwitchCompanyMutation,
  useActivityCountQuery,
  Activity_Status,
  useFindGmailConnectionQuery,
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
import { clientId, clientScerate } from '../Email/Inbox'

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
  const [activityCount, setActivityCount] = useState<number>()
  const router = useRouter()
  const { data, error } = useDisabledFeaturesQuery()

  const { data: notificationData } = useNotificationsSubscription()
  const { data: productNewsData } = useProduct_NewsSubscription()
  const { data: activityResponse } = useActivityCountQuery({
    variables: {
      status: Activity_Status.Done,
    },
  })

  const [switchCompany] = useSwitchCompanyMutation()

  const { data: gmailConnection } = useFindGmailConnectionQuery({
    variables: {
      companyId: me.company,
      userId: me.user,
    },
    fetchPolicy: 'no-cache',
  })

  const [unreadEmail, setUnreadEmail] = useState(0)
  const getUnreadEmail = async (accessToken) => {
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${gmailConnection?.gmail_connection[0].email}/messages?labelIds=UNREAD&labelIds=INBOX&access_token=${accessToken}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then((response) => {
          return response.json()
        })
        .then(async (data) => {
          setUnreadEmail(data?.messages?.length)
        })
    }
  }

  useEffect(() => {
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      fetch(
        `https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientScerate}&grant_type=refresh_token&refresh_token=${gmailConnection.gmail_connection[0].refresh_token}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then((response) => {
          return response.json()
        })
        .then(async (data) => {
          await getUnreadEmail(data.access_token)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gmailConnection])

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

  useEffect(() => {
    if (activityResponse?.aggregateActivity) {
      setActivityCount(activityResponse.aggregateActivity?._count?.id)
    }
  }, [activityResponse])

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
        badgeCountList={{ activities: activityCount }}
        emailCount={unreadEmail}
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
