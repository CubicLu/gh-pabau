import { ButtonCheckbox } from '@pabau/ui'
import { Descriptions, Divider, Form, Skeleton } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import useWindowSize from '../../../hooks/useWindowSize'
import styles from './skeleton.module.less'

interface UserAlert {
  id?: number
  title?: string | number
  description?: string | number
}
export interface NotificationProps {
  loading?: boolean
  allAlerts?: UserAlert[]
  profileData?: {
    id: number
    email?: string
    phone_number?: string
    UserAlertPermission: []
  }

  onAlertChange?: (data) => void
  pabauWebNotificationTypes?: {
    id?: string
    type?: string
    notification_type?: string
  }[]
  pabauWebNotificationToggles?: {
    id?: string
    notification_type?: string
    enabled?: boolean
  }[]
  onPabauNotificationChange?: (data) => void
}

const Notification: FC<NotificationProps> = ({
  loading = false,
  allAlerts,
  profileData,
  onAlertChange,

  pabauWebNotificationTypes,
  pabauWebNotificationToggles,
  onPabauNotificationChange,
  ...rest
}) => {
  const { t } = useTranslationI18()
  const btnOptions = [
    {
      key: 'email_notification',
      label: t('account.settings.notification.general.button.label2'),
      disabled: false,
    },
    {
      key: 'sms_notification',
      label: t('account.settings.notification.general.button.label3'),
      disabled: false,
    },
    {
      key: 'pabau_notification',
      label: t('account.settings.notification.general.button.label4'),
      disabled: false,
    },
  ]
  const size = useWindowSize()

  const alertTranslations = {
    'Feed Post': {
      type: 'Feed post via pabau',
      title: t('account.settings.notification.general.feedpost'),
      description: t(
        'account.settings.notification.general.feedpost.description'
      ),
    },
    'Like Post': {
      type: 'Like post via pabau',
      title: t('account.settings.notification.general.likepost'),
      description: t(
        'account.settings.notification.general.likepost.description'
      ),
    },
    'Scheduled Report': {
      type: 'Scheduled report via pabau',
      title: t('account.settings.notification.general.scheduledreport'),
      description: t(
        'account.settings.notification.general.scheduledreport.description'
      ),
    },
    'Appointment Booked': {
      type: 'New Appointment via calendar',
      title: t('account.settings.notification.general.appointmentbooked'),
      description: t(
        'account.settings.notification.general.appointmentbooked.description'
      ),
    },
    'Appointment Cancelled': {
      type: 'Cancelled appointment via calendar',
      title: t('account.settings.notification.general.appointmentcancelled'),
      description: t(
        'account.settings.notification.general.appointmentcancelled.description'
      ),
    },
    'Lead Enquiry': {
      type: 'Lead inquiry via pabau',
      title: t('account.settings.notification.general.leadinquiry'),
      description: t(
        'account.settings.notification.general.leadinquiry.description'
      ),
    },
    'Lead Assigned': {
      type: 'Lead assigned via pabau',
      title: t('account.settings.notification.general.lead.assigned.title'),
      description: t(
        'account.settings.notification.general.lead.assigned.description'
      ),
    },
  }

  const [allAlertsState, setAllAlertsState] = useState<UserAlert[]>(null)
  const [userAlertsState, setUserAlertsState] = useState(null)
  const [userPabauNotifications, setUserPabauNotifications] = useState(null)

  useEffect(() => {
    setUserAlertsState(profileData?.UserAlertPermission)
    setAllAlertsState(allAlerts)
    setUserPabauNotifications(pabauWebNotificationToggles)
  }, [allAlerts, profileData, pabauWebNotificationToggles])

  const RenderAlertCheckBox = ({ type, label, current, ...rest }) => {
    const [currentTab, setCurrentTab] = useState(current)
    let checked = false
    let userCurrPabauNotification = null
    if (type === 'pabau_notification') {
      const pabauNotification = pabauWebNotificationTypes?.find(
        (el) => el?.type === rest?.notificationType
      )

      userCurrPabauNotification = userPabauNotifications?.find(
        (el) => el?.notification_type === pabauNotification?.id
      )
      if (pabauNotification && userCurrPabauNotification) {
        checked = userCurrPabauNotification?.enabled ? true : false
      } else {
        userCurrPabauNotification = {
          notification_type: pabauNotification?.id,
          enabled: checked,
        }
      }
    } else {
      checked = currentTab?.[type] === 1 ? true : false
    }
    return (
      <ButtonCheckbox
        label={label}
        checked={checked}
        onChange={(val) => {
          if (type === 'pabau_notification') {
            userCurrPabauNotification =
              userCurrPabauNotification?.notification_type
                ? {
                    ...userCurrPabauNotification,
                    enabled: val,
                  }
                : {
                    notification_type: userCurrPabauNotification?.id,
                    enabled: val,
                  }
            onPabauNotificationChange(userCurrPabauNotification)
          } else {
            onAlertChange?.({ ...currentTab, [`${type}`]: val ? 1 : 0 })
            setCurrentTab({ ...currentTab, [`${type}`]: val ? 1 : 0 })
          }
        }}
        disabled={
          (!profileData?.email && type === 'email_notification') ||
          (!profileData?.phone_number && type === 'sms_notification')
            ? true
            : false
        }
        size={size.width <= 767 ? 'small' : null}
      />
    )
  }

  const AlertAction = ({ ...rest }) => {
    const defaultTab = {
      UserAlert: {
        id: rest?.alertId,
      },
      id: null,
      ios_notification: 0,
      email_notification: 0,
      sms_notification: 0,
    }
    let current = userAlertsState?.find(
      (el) => el?.UserAlert?.id === rest?.alertId
    )
    if (!current) {
      current = defaultTab
    }
    const checkBtnOptions = [...btnOptions]
    if (
      rest?.title === 'Appointment Booked' ||
      rest?.title === 'Appointment Cancelled'
    ) {
      const ios_obj = {
        key: 'ios_notification',
        label: t('account.settings.notification.general.button.label1'),
        disabled: false,
      }
      checkBtnOptions.unshift(ios_obj)
    }
    return (
      <>
        <h2>{alertTranslations[`${rest?.title}`]?.title}</h2>
        <span>{alertTranslations[`${rest?.title}`]?.description}</span>
        <br />
        <br />
        {checkBtnOptions.map(({ key, label }) =>
          loading ? (
            <Skeleton.Button
              active
              style={{
                width: 120,
                borderRadius: '100px',
                marginRight: '5px',
              }}
            />
          ) : (
            <RenderAlertCheckBox
              key={key}
              type={key}
              label={label}
              current={current}
              notificationType={alertTranslations[`${rest?.title}`]?.type}
            />
          )
        )}
      </>
    )
  }

  return (
    <div className={styles.skeletonWrapper}>
      <Descriptions title={t('account.settings.tab.header3')}>
        <Descriptions.Item>
          {t('account.settings.notification.description')}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h1>{t('account.settings.notification.general.label')}</h1>
        </Form.Item>
        {allAlertsState?.map(
          ({ id, title, description }, index) =>
            title !== 'Feed Post' &&
            title !== 'Like Post' && (
              <>
                <Form.Item key={`allAlerts${index}`}>
                  <AlertAction
                    title={title}
                    description={description}
                    alertId={id}
                  />
                </Form.Item>
                <Divider />
              </>
            )
        )}
      </Form>
    </div>
  )
}

export default Notification
