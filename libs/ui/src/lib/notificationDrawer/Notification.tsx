import { CloseOutlined } from '@ant-design/icons'
import { MutationFunction } from '@apollo/client'
import { Image } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { notificationIcons } from './mock'
import { Notifications } from './NotificationDrawer'
import styles from './NotificationDrawer.module.less'

export interface UserProps {
  user: number
  company: number
  fullName: string
}
interface NotificationProps {
  notify: Notifications
  relativeTime?: (lan: string, date: Date) => string
  user?: UserProps
  updateMutation?: MutationFunction
  deleteMutation?: MutationFunction
  readAddMutation?: MutationFunction
}

const Notification: FC<NotificationProps> = ({
  notify,
  relativeTime,
  user,
  updateMutation,
  deleteMutation,
  readAddMutation,
}) => {
  const [notifyTime, setNotifyTime] = useState(
    relativeTime?.('en', notify?.notificationTime)
  )

  const setRelativeTime = () => {
    const updatedTime = relativeTime?.('en', notify?.notificationTime)
    setNotifyTime(updatedTime)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRelativeTime()
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifyTime, notify])

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
    const { id, link } = notification
    const { read } = notification

    if (!isReadNotification(read)) {
      const variables = {
        company: user?.company,
        notification: id,
        user: user?.user,
      }
      await readAddMutation?.({
        variables,
        optimisticResponse: {},
      })
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

  const getFormattedDate = (date: Date) =>
    Intl.DateTimeFormat('en-US').format(new Date(date))

  const getNotificationDescOrTitle = (notification, returnType = 'desc') => {
    const { variables, notificationType, sentBy, desc } = notification

    if (
      notificationType === 'Lead assigned' &&
      sentBy &&
      returnType === 'desc' &&
      !notification['desc'].includes('by')
    ) {
      notification['desc'] = desc + ' by [who]'
    }

    if (
      typeof variables == 'object' &&
      Object.keys({ ...variables }).length > 0
    ) {
      for (const key in variables) {
        const replaceVariable = `[${key}]`
        let variableValue = variables[key]

        if (key === 'date') {
          variableValue = getFormattedDate(variableValue)
        }

        notification[returnType] = notification[returnType]?.replace(
          replaceVariable,
          variableValue
        )
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

export default Notification
