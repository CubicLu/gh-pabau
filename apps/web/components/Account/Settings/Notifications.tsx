import { ButtonCheckbox } from '@pabau/ui'
import {
  Checkbox as AntCheckbox,
  Descriptions,
  Divider,
  Form,
  Skeleton,
} from 'antd'
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

  applicationNotificationTypes?: {
    id?: string
    notification_type?: string
  }[]
  applicationNotificationChecks?: {
    id?: string
    notification_type?: string
    enabled?: boolean
  }[]
  onAppNotificationChange?: (data) => void
}

const Notification: FC<NotificationProps> = ({
  loading = false,
  allAlerts,
  profileData,
  onAlertChange,

  pabauWebNotificationTypes,
  pabauWebNotificationToggles,
  onPabauNotificationChange,

  applicationNotificationTypes,
  applicationNotificationChecks,
  onAppNotificationChange,
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
  const apptNotifications = [
    {
      key: 'news_and_announcements',
      label: t('account.settings.notification.application.label1'),
    },
    {
      key: 'new_feature_release',
      label: t('account.settings.notification.application.label2'),
    },
    {
      key: 'new_blog_post',
      label: t('account.settings.notification.application.label3'),
    },
  ]

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
      type: 'New Appointment via pabau',
      title: t('account.settings.notification.general.appointmentbooked'),
      description: t(
        'account.settings.notification.general.appointmentbooked.description'
      ),
    },
    'Appointment Cancelled': {
      type: 'Cancelled appointment via pabau',
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
  }

  const [allAlertsState, setAllAlertsState] = useState<UserAlert[]>(null)
  const [userAlertsState, setUserAlertsState] = useState(null)
  const [userPabauNotifications, setUserPabauNotifications] = useState(null)
  const [userCurrentNotifications, setUserCurrentNotifications] = useState(null)

  useEffect(() => {
    setUserAlertsState(profileData?.UserAlertPermission)
    setAllAlertsState(allAlerts)
    setUserCurrentNotifications(applicationNotificationChecks)
    setUserPabauNotifications(pabauWebNotificationToggles)
  }, [
    allAlerts,
    profileData,
    applicationNotificationChecks,
    pabauWebNotificationToggles,
  ])

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
            userCurrPabauNotification = userCurrPabauNotification?.notification_type
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
    return (
      <>
        <h2>{alertTranslations[`${rest?.title}`]?.title}</h2>
        <span>{alertTranslations[`${rest?.title}`]?.description}</span>
        <br />
        <br />
        {btnOptions.map(({ key, label }) =>
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

  const applicationNotificationClick = (enabled, currentNotification) => {
    currentNotification = { ...currentNotification, enabled: enabled }
    const userCurrents = userCurrentNotifications
      ? [...userCurrentNotifications]
      : []
    if (currentNotification?.notification_type) {
      const existedIndex = userCurrents?.findIndex(
        (el) => el?.notification_type === currentNotification?.notification_type
      )
      if (existedIndex !== -1) {
        userCurrents.splice(existedIndex, 1, currentNotification)
      } else {
        userCurrents.push(currentNotification)
      }
    }
    setUserCurrentNotifications(userCurrents)
    onAppNotificationChange([...userCurrents])
  }

  const ApplicationNotificationAction = ({ ...rest }) => {
    const appNotification = applicationNotificationTypes?.find(
      (el) => el?.notification_type === rest?.type
    )

    let currentType = userCurrentNotifications?.find(
      (el) => el?.notification_type === appNotification?.id
    )
    if (!currentType) {
      currentType = {
        enabled: false,
        notification_type: appNotification?.id,
      }
    }
    const checked = currentType?.enabled
    return (
      <>
        <AntCheckbox
          onChange={(e) =>
            applicationNotificationClick(e.target.checked, currentType)
          }
          className="nofiticaionAppChk"
          checked={checked}
          key={rest?.key}
        >
          {rest?.label}
        </AntCheckbox>
        <br />
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
        {allAlertsState?.map(({ id, title, description }, index) => (
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
        ))}

        <Form.Item>
          <h1 className="nofiticaionApp">
            {t('account.settings.notification.application.label')}
          </h1>
          {loading
            ? [1, 2, 3].map((id) => (
                <div key={id} className="sFlex" style={{ display: 'flex' }}>
                  <span>
                    <Skeleton.Avatar
                      active
                      shape="square"
                      style={{ height: 20, width: 20 }}
                    />
                  </span>
                  <label key={id}>
                    <Skeleton active paragraph={{ rows: 0 }} />
                  </label>
                </div>
              ))
            : apptNotifications.map(({ key, label }) => (
                <ApplicationNotificationAction
                  key={key}
                  type={key}
                  label={label}
                />
              ))}
        </Form.Item>
        <Form.Item></Form.Item>
      </Form>
    </div>
  )
}

export default Notification
