import {
  CheckCircleFilled,
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { message } from 'antd'
import React from 'react'
import styles from './Notification.module.less'
import Reconnect from './ReconnectNotification'

export enum NotificationType {
  info = 'info',
  success = 'success',
  error = 'error',
  warning = 'warning',
  loading = 'loading',
  connect = 'connect',
}

export const Notification = (
  notificationType: NotificationType,
  text: string,
  delay = 2
): void => {
  let notify
  const onClose = () => {
    notify()
  }

  const notifyIcon = () => {
    switch (notificationType) {
      case NotificationType.success: {
        return <CheckCircleFilled className={styles.notifyIcon} />

        break
      }
      case NotificationType.error: {
        return <CloseCircleOutlined className={styles.notifyIcon} />

        break
      }
      case NotificationType.info: {
        return <InfoCircleOutlined className={styles.notifyIcon} />

        break
      }
      case NotificationType.warning: {
        return <ExclamationCircleOutlined className={styles.notifyIcon} />

        break
      }
      // No default
    }
  }

  if (notificationType === NotificationType.connect) {
    message.open({
      type: 'success',
      content: <Reconnect message="" delay={delay} />,
      className: styles.notifyReconnect,
      duration: delay,
    })
  } else {
    notify = message.open({
      type: notificationType,
      content: (
        <div className={styles.notificationContent}>
          <span className={styles.notifyText}>{text}</span>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>
      ),
      icon: notifyIcon(),
      className: styles.notifyStyles,
      duration: delay,
    })
  }
}

export default Notification
