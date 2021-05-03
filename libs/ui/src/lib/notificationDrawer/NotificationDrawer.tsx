import { CloseOutlined } from '@ant-design/icons'
import { MutationFunction } from '@apollo/client'
import { Drawer, Image } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Lead1SVG } from '../../assets/images/lead.svg'
import { ReactComponent as Lead2SVG } from '../../assets/images/lead1.svg'
import { ReactComponent as EmptySVG } from '../../assets/images/notification-empty.svg'
import { notificationIcons } from './mock'
import styles from './NotificationDrawer.module.less'

interface UserProps {
  user: number
  company: number
  fullName: string
}

interface Notifications {
  id: string
  notificationTime: Date
  notificationType: string
  notificationTypeIcon: string
  title: string
  desc: string
  read: number[]
  users: number[]
  link: string
}

interface P {
  deleteNotification?: MutationFunction
  updateNotification?: MutationFunction
  openDrawer?: boolean
  closeDrawer?: () => void
  notifications?: Notifications[]
  user?: UserProps
  relativeTime?: (lan: string, date: Date) => string
}

export const NotificationDrawer: FC<P> = ({
  openDrawer = true,
  closeDrawer,
  notifications = [],
  relativeTime,
  deleteNotification,
  updateNotification,
  user,
}) => {
  const { t } = useTranslation('common')
  const [notificationDrawer, setNotificationDrawer] = useState(openDrawer)
  const [notifyTab, setNotifyTab] = useState('Activity')
  const [notificationData] = useState<Notifications[]>(notifications)

  const notificationTypes = {
    report: 'notifications.report',
    appointment: 'notifications.appointment',
    review: 'notifications.review',
    smscampaign: 'notifications.smscampaign',
    newslettercampaign: 'notifications.newslettercampaign',
    holidayrequest: 'notifications.holidayrequest',
    businessrefer: 'notifications.businessrefer',
    lead: 'notifications.lead',
  }

  const notificationLeadsData = [
    {
      Today: [
        {
          leadDate: new Date(),
          title: 'New features to sell vouchers with blase messages',
          desc:
            'Encourage clients and loved ones to treat themselves right in the time for the festive season!',
        },
      ],
    },
    {
      '14 December': [
        {
          leadDate: new Date(),
          title: 'Are you ready for reopening soon?',
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada lobortis ex eget viverra. Ut viverra non nisi eget viverra.',
        },
      ],
    },
  ]

  const closeDrawerMenu = () => {
    setNotificationDrawer(false)
    closeDrawer?.()
  }

  let lengths = 0
  for (const item of notificationData) {
    const length = Object.values(item)[0] ? Object.values(item)[0].length : 0
    lengths = lengths + length
  }

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
          </button>
          <button
            className={classNames(
              styles.notifyTabDesign,
              notifyTab === 'News' && styles.activeTabs
            )}
            onClick={() => setNotifyTab('News')}
          >
            {t('notifications.tab.news')}
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
        notifications.map((notify, index) => {
          return (
            <Notification
              key={index}
              notify={notify}
              relativeTime={relativeTime}
              user={user}
              updateMutation={updateNotification}
              deleteMutation={deleteNotification}
            />
          )
        })}

      {Array.isArray(notifications) &&
        notifications.length === 0 &&
        notifyTab === 'Activity' && (
          <div className={styles.notificationEmpty}>
            <EmptySVG />
            <p className={styles.emptyMessage}>
              {t('notifications.empty.msg')}
            </p>
            <p className={styles.emptyHint}>{t('notifications.empty.hint')}</p>
            <a href="#test" className={styles.emptyAnchor}>
              {t('notifications.empty.anchor')} {'>'}
            </a>
          </div>
        )}

      {notifyTab === 'News' &&
        notificationLeadsData.map((notify, index) => {
          return Object.keys(notify).map((notification) => {
            return (
              <>
                <div
                  className={classNames(
                    styles.notificationAlign,
                    styles.todayTextTopSpace
                  )}
                >
                  <h2>
                    {notification === 'Today'
                      ? t('notifications.today')
                      : notification === 'Yesterday'
                      ? t('notifications.yesterday')
                      : notification}
                  </h2>
                </div>
                {notify[notification].map((dayNotify, index) => {
                  return (
                    <>
                      <div
                        key={dayNotify.title}
                        className={styles.notificationCard}
                      >
                        <div className={styles.notifyAlign}>
                          <div className={classNames(styles.logo, styles.flex)}>
                            {notification === 'Today' ? (
                              <Lead1SVG />
                            ) : (
                              <Lead2SVG />
                            )}
                            <p className={styles.textSm}>
                              {notificationTypes[
                                dayNotify.notificationType
                                  ?.toLowerCase()
                                  ?.replace(' ', '')
                              ]
                                ? t(
                                    notificationTypes[
                                      dayNotify.notificationType
                                        ?.toLowerCase()
                                        ?.replace(' ', '')
                                    ]
                                  )
                                : dayNotify.notificationType}
                            </p>
                          </div>
                        </div>
                        <div className={styles.leadTitleDesc}>
                          <h1>{dayNotify.title}</h1>
                          <p>{dayNotify.desc}</p>
                        </div>
                        <span
                          className={classNames(
                            styles.textMd,
                            styles.learnMore
                          )}
                        >
                          {t('news.learn')}
                        </span>
                      </div>
                      <div className={styles.cardBorder} />
                    </>
                  )
                })}
              </>
            )
          })
        })}
    </Drawer>
  )
}

export default NotificationDrawer

interface NotificationProps {
  notify: Notifications
  relativeTime?: (lan: string, date: Date) => string
  user?: UserProps
  updateMutation?: MutationFunction
  deleteMutation?: MutationFunction
}

const Notification: FC<NotificationProps> = ({
  notify,
  relativeTime,
  user,
  updateMutation,
  deleteMutation,
}) => {
  const [notifyTime, setNotifyTime] = useState(
    relativeTime?.('en', notify?.notificationTime)
  )

  const watchRelativeTime = () => {
    setInterval(() => {
      const updatedTime = relativeTime?.('en', notify?.notificationTime)
      setNotifyTime(updatedTime)
    }, 1000)
  }

  useEffect(() => {
    watchRelativeTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()

  const getNotificationIcon = () => {
    const notificationIcon = notificationIcons.find(
      (notificationIcons) => notificationIcons.type === notify.notificationType
    )
    return notificationIcon?.icon
  }

  const isReadNotification = (users) => {
    return users?.find((user_id) => user_id === user?.user) ? true : false
  }

  const handleOnClick = async (notification) => {
    const { id, users, link } = notification
    let { read } = notification
    if (!isReadNotification(read)) {
      read = read?.length > 0 ? [...read, user?.user] : [user?.user]
      const variables = { id, is_read: read, sent_to: users }
      await updateMutation?.({ variables, optimisticResponse: {} })
    }
    if (link) {
      router.push({ pathname: link })
    }
  }

  const removeSingleNotification = async (notification) => {
    const { id, users } = notification
    const sent_to = users.filter((user_id) => user_id !== user?.user)
    const variables = { id, sent_to }
    sent_to?.length > 0
      ? await updateMutation?.({ variables, optimisticResponse: {} })
      : await deleteMutation?.({
          variables: { id: notification.id },
          optimisticResponse: {},
        })
  }

  const getNotificationDescOrTitle = (notification, returnType = 'desc') => {
    const { variables } = notification
    // const { variables, sentBy } = notification
    if (
      typeof variables == 'object' &&
      Object.keys({ ...variables }).length > 0
    ) {
      for (const key in variables) {
        const replaceVariable = `[${key}]`
        const variableValue = variables[key]

        notification[returnType] = notification[returnType].replace(
          replaceVariable,
          variableValue
        )

        // if (key === 'who' && user?.user === sentBy) {
        //   notification[returnType] = notification[returnType].replace(
        //     '[who]',
        //     'You'
        //   )
        // } else {
        //   notification[returnType] = notification[returnType].replace(
        //     replaceVariable,
        //     variableValue
        //   )
        // }
      }
    }
    return notification[returnType]
  }

  return (
    <div>
      <div className={styles.notificationCard}>
        <div className={styles.notifyAlign}>
          <div
            onClick={() => handleOnClick(notify)}
            className={classNames(styles.logo, styles.flex)}
          >
            <Image preview={false} src={getNotificationIcon()} />
            <p className={styles.textSm}>{notify.notificationType}</p>
          </div>
          <div className={styles.time}>
            <p className={classNames(styles.textMd, styles.grayTextColor)}>
              {notifyTime}
              <CloseOutlined
                onClick={() => {
                  removeSingleNotification(notify)
                }}
                className={styles.notificationClearIcon}
              />
            </p>
          </div>
        </div>
        <div onClick={() => handleOnClick(notify)} className={styles.descAlign}>
          <div className={styles.notifyTitleDesc}>
            <h1>{getNotificationDescOrTitle(notify, 'title')}</h1>
            <p>{getNotificationDescOrTitle(notify, 'desc')}</p>
          </div>
          <div className={styles.readStatus}>
            {!isReadNotification(notify?.read) && <span></span>}
          </div>
        </div>
      </div>
      <div className={styles.cardBorder} />
    </div>
  )
}
