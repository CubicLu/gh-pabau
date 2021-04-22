import React, { FC, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import styles from './NotificationDrawer.module.less'
import { Drawer, Image } from 'antd'
import { ReactComponent as EmptySVG } from '../../assets/images/notification-empty.svg'
import { ReactComponent as Lead1SVG } from '../../assets/images/lead.svg'
import { ReactComponent as Lead2SVG } from '../../assets/images/lead1.svg'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { notificationIcons } from './mock'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

interface Notification {
  id: string
  notificationTime: string
  notificationType: string
  notificationTypeIcon: string
  title: string
  desc: string
  read: number[]
  users: number[]
  link: string
}

const DELETE_MUTATION = gql`
  mutation delete_notifications_by_pk($id: uuid!) {
    delete_notifications_by_pk(id: $id) {
      __typename
      id
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation update_notifications_by_pk(
    $id: uuid!
    $sent_to: jsonb
    $is_read: jsonb
  ) {
    update_notifications_by_pk(
      pk_columns: { id: $id }
      _set: { sent_to: $sent_to, is_read: $is_read }
    ) {
      id
    }
  }
`

interface NotificationData {
  [key: string]: Notification[]
}

interface UserProps {
  user: number
  company: number
  fullName: string
}

interface P {
  openDrawer?: boolean
  closeDrawer?: () => void
  notifications?: NotificationData[]
  user?: UserProps
}

export const NotificationDrawer: FC<P> = ({
  openDrawer = true,
  closeDrawer,
  notifications = [],
  user,
}) => {
  const { t } = useTranslation('common')
  const [notificationDrawer, setNotificationDrawer] = useState(openDrawer)
  const [notifyTab, setNotifyTab] = useState('Activity')
  const [notificationData] = useState<NotificationData[]>(notifications)
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

  const router = useRouter()

  const [deleteMutation] = useMutation(DELETE_MUTATION)
  const [updateMutation] = useMutation(UPDATE_MUTATION)

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

  const getNotificationIcon = (type) => {
    const notificationIcon = notificationIcons.find(
      (notificationIcons) => notificationIcons.type === type
    )
    return notificationIcon?.icon
  }

  // const removeSingleNotification = (index, dayIndex, objectKey) => {
  //   const selectedObject = notificationData[index]
  //   selectedObject[objectKey].splice(dayIndex, 1)
  //   if (selectedObject[objectKey].length === 0) {
  //     notificationData.splice(index, 1)
  //     setNotificationData([...notificationData])
  //   } else {
  //     const newNotificationData = notificationData.map((item, i) => {
  //       if (i !== index) {
  //         return item
  //       }
  //       return { ...selectedObject }
  //     })
  //     setNotificationData([...newNotificationData])
  //   }
  // }

  const isReadNotification = (users) => {
    return users?.find((user_id) => user_id == user?.user) ? true : false
  }

  const onNotificationClick = async (notification) => {
    let { id, users, read, link } = notification
    console.log('notificiaotnskajsfk', notification)
    if (!isReadNotification(read)) {
      if (read?.length > 0) {
        read = [...read, user?.user]
      } else {
        read = [user?.user]
      }
      const variables = { id, is_read: read, sent_to: users }
      await updateMutation({ variables, optimisticResponse: {} })
    }
    router.push({ pathname: link })
  }

  const removeSingleNotification = async (notification) => {
    const { id, users } = notification
    const sent_to = users.filter((user_id) => user_id !== user?.user)
    const variables = { id, sent_to }
    sent_to.length > 0
      ? await updateMutation({ variables, optimisticResponse: {} })
      : await deleteMutation({
          variables: { id: notification.id },
          optimisticResponse: {},
        })
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
          <h2>
            {/* {t('notifications.today')} */}
            {/* {notify[notification].length > 0 &&
                      (notification === 'Today'
                        ? t('notifications.today')
                        : notification === 'Yesterday'
                        ? t('notifications.yesterday')
                        : notification)} */}
          </h2>
        </div>
      )}

      {notifyTab === 'Activity' &&
        notifications.map((notify, index) => {
          return (
            <div key={index} onClick={() => onNotificationClick(notify)}>
              <div className={styles.notificationCard}>
                <div className={styles.notifyAlign}>
                  <div className={classNames(styles.logo, styles.flex)}>
                    <Image
                      preview={false}
                      src={getNotificationIcon(notify.notificationType)}
                    />
                    <p className={styles.textSm}>
                      {notify.notificationType}
                      {/* {notificationTypes[
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
                              : dayNotify.notificationType} */}
                    </p>
                  </div>
                  <div className={styles.time}>
                    <p
                      className={classNames(
                        styles.textMd,
                        styles.grayTextColor
                      )}
                    >
                      {moment(notify.notificationTime.toString()).format(
                        'hh:mm A'
                      )}
                      <CloseOutlined
                        onClick={() => {
                          removeSingleNotification(notify)
                        }}
                        className={styles.notificationClearIcon}
                      />
                    </p>
                  </div>
                </div>
                <div className={styles.descAlign}>
                  <div className={styles.notifyTitleDesc}>
                    <h1>{notify.title}</h1>
                    <p>{notify.desc}</p>
                  </div>
                  <div className={styles.readStatus}>
                    {!isReadNotification(notify?.read) && <span></span>}
                  </div>
                </div>
              </div>
              <div className={styles.cardBorder} />
            </div>
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
