import { CloseOutlined } from '@ant-design/icons'
import { MutationFunction } from '@apollo/client'
import { Drawer, Badge } from 'antd'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as EmptySVG } from '../../assets/images/notification-empty.svg'
import {
  NotificationDrawerItemType,
  NotificationItem,
} from './NotificationItem'
import styles from './NotificationDrawer.module.less'
import News from './News'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'

export interface ProductNews {
  id: string
  img: string
  link: string
  title: string
  description: string
  time: Date | string
  readUsers: number[]
}

interface P {
  deleteNotification?: MutationFunction
  updateNotification?: MutationFunction
  readNewsMutation?: MutationFunction
  readAddMutation?: MutationFunction
  unreadNewsCount?: number
  unreadNotificationCount?: number
  openDrawer?: boolean
  closeDrawer?: () => void
  notifications?: NotificationDrawerItemType[]
  productNews?: ProductNews[]
  user?: Partial<AuthenticatedUser> & JwtUser
  relativeTime?: (lan: string, date: Date) => string
}

export const NotificationDrawer: FC<P> = ({
  openDrawer = true,
  closeDrawer,
  notifications = [],
  productNews = [],
  relativeTime,
  deleteNotification,
  updateNotification,
  readAddMutation,
  readNewsMutation,
  unreadNewsCount,
  unreadNotificationCount,
  user,
}) => {
  const { t } = useTranslation('common')
  const [notificationDrawer, setNotificationDrawer] = useState(openDrawer)
  const [notifyTab, setNotifyTab] = useState('Activity')
  const [notificationData] = useState<NotificationDrawerItemType[]>(
    notifications
  )

  const closeDrawerMenu = () => {
    setNotificationDrawer(false)
    closeDrawer?.()
  }

  let lengths = 0
  for (const item of notificationData) {
    const length = Object.values(item)[0] ? Object.values(item)[0].length : 0
    lengths = lengths + length
  }

  const renderEmptyPlaceholder = (title: string, hint: string) => (
    <div className={styles.notificationEmpty}>
      <EmptySVG />
      <p className={styles.emptyMessage}>{title}</p>
      <p className={styles.emptyHint}>{hint}</p>
      {notifyTab === 'Activity' && (
        <a href="#test" className={styles.emptyAnchor}>
          {t('notifications.empty.anchor')} {'>'}
        </a>
      )}
    </div>
  )

  return (
    <Drawer
      width={392}
      placement="right"
      closable={false}
      onClose={closeDrawerMenu}
      visible={notificationDrawer}
      className={styles.notificationDrawer}
    >
      <div className={styles.notificationHeader}>
        <div className={styles.notificationAlign}>
          <h1>{t('notifications.header')}</h1>
          <CloseOutlined
            onClick={closeDrawerMenu}
            className={styles.searchIconSize}
          />
        </div>
        <div
          className={classNames(styles.notifyTabs, styles.topSpaceNotification)}
        >
          <button
            className={classNames(
              styles.notifyTabDesign,
              notifyTab === 'Activity' && styles.activeTabs
            )}
            onClick={() => setNotifyTab('Activity')}
          >
            {t('notifications.tab.activity')}
            <Badge
              count={unreadNotificationCount}
              className={styles.badgeCircle}
            />
          </button>
          <button
            className={classNames(
              styles.notifyTabDesign,
              notifyTab === 'News' && styles.activeTabs
            )}
            onClick={() => setNotifyTab('News')}
          >
            {t('notifications.tab.news')}
            <Badge count={unreadNewsCount} className={styles.badgeCircle} />
          </button>
        </div>
      </div>
      {notifyTab === 'Activity' && (
        <div
          className={classNames(
            styles.notificationAlign,
            styles.todayTextTopSpace
          )}
        >
          <h2>{/* {t('notifications.today')} */}</h2>
        </div>
      )}

      {notifyTab === 'Activity' &&
        notifications.map((notify) => {
          return (
            <NotificationItem
              key={notify.id}
              notify={notify}
              relativeTime={relativeTime}
              user={user}
              updateMutation={updateNotification}
              deleteMutation={deleteNotification}
              readAddMutation={readAddMutation}
            />
          )
        })}

      {Array.isArray(notifications) &&
        notifications.length === 0 &&
        notifyTab === 'Activity' &&
        renderEmptyPlaceholder(
          t('notifications.empty.msg'),
          t('notifications.empty.hint')
        )}

      {Array.isArray(productNews) &&
        productNews.length === 0 &&
        notifyTab === 'News' &&
        renderEmptyPlaceholder(t('news.empty.msg'), t('news.empty.hint'))}

      {notifyTab === 'News' &&
        productNews.map((news) => {
          return (
            <News
              key={news.id}
              notify={news}
              user={user}
              readNewsMutation={readNewsMutation}
            />
          )
        })}
    </Drawer>
  )
}
