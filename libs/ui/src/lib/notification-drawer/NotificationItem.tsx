import { CloseOutlined } from '@ant-design/icons'
import { MutationFunction } from '@apollo/client'
import { Image } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { notificationIcons } from './mock'
import styles from './NotificationDrawer.module.less'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'
import dayjs from 'dayjs'

export interface NotificationDrawerItemType {
  id: string
  notificationTime: Date
  notificationType: string
  notificationTypeIcon: string
  title: string
  desc: string
  is_read: boolean
  is_deleted: boolean
  link: string
}

interface P {
  notify: NotificationDrawerItemType
  relativeTime?: (lan: string, date: Date) => string
  user?: Partial<AuthenticatedUser> & JwtUser
  updateNotificationState?: MutationFunction
}

export const NotificationItem: FC<P> = ({
  notify,
  relativeTime,
  user,
  updateNotificationState,
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

  const handleOnClick = async (notification) => {
    const { id, link, is_read, is_deleted } = notification
    if (!is_read) {
      const variables = {
        id,
        user: user?.user,
        is_read: true,
        is_deleted,
      }
      await updateNotificationState?.({
        variables,
        optimisticResponse: {},
      })
    }
    if (link) {
      router.push({ pathname: link })
    }
  }

  const removeSingleNotification = async (notification) => {
    const { id, is_read } = notification
    const variables = {
      id,
      user: user?.user,
      is_deleted: true,
      is_read,
    }
    await updateNotificationState?.({
      variables,
      optimisticResponse: {},
    })
  }

  const getFormattedDate = (date: string) => date.replaceAll('-', '/')

  const isValidTime = (time: string) => {
    const formats = ['am', 'pm', 'AM', 'PM']
    let isValid = false
    for (const format of formats) {
      if (time.includes(format)) {
        isValid = true
      }
    }
    return isValid
  }

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

        if (key.includes('date') && variableValue?.includes('-')) {
          variableValue = getFormattedDate(variableValue)
        }

        if (key.includes('time') && !isValidTime(variableValue)) {
          variableValue = dayjs('1/1/1 ' + variableValue).format('hh:mma')
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
            {!notify?.is_read && <span />}
          </div>
        </div>
      </div>
      <div className={styles.cardBorder} />
    </div>
  )
}
