import React, { FC, ReactNode } from 'react'
import { Badge } from '../..'
import styles from './NotificationMessages.module.less'
import { useTranslation } from 'react-i18next'

export interface NotificationData {
  header: string
  description: string
  icon: ReactNode
  smartDelivery: boolean
  link: string
  disabled: boolean
}

export interface NotificationMessagesProps {
  notificationData?: NotificationData[]
  onClick?: (selectedLink: string) => void
}

export const NotificationMessages: FC<NotificationMessagesProps> = (props) => {
  const handleClick = (notification) => {
    props.onClick?.(notification)
  }
  const { t } = useTranslation('common')

  return (
    <div>
      {props?.notificationData?.map((notification, index) => (
        <div
          className={styles.scoreBody}
          key={notification.header}
          onClick={() => handleClick(notification.link)}
        >
          <div className={styles.container}>
            <div className={styles.colStatusLabel}>
              <span className={styles.iconSecuritytools}>
                {notification.icon}
              </span>
            </div>
            <div className={styles.containerCol}>
              <span className={styles.p1}>{notification.header}</span>
              <span className={styles.p2}>{notification.description}</span>
            </div>
            <div className={styles.stateLabel}>
              <div className={styles.badgeLabel}>
                <Badge
                  label={t(
                    'notifications.clientNotifications.messages.enabled'
                  )}
                  disabled={notification.disabled}
                />
              </div>
              <div className={styles.smartLabel}>
                {notification.smartDelivery && (
                  <span>
                    +
                    {t(
                      'notifications.clientNotifications.messages.smartDelivery'
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationMessages
