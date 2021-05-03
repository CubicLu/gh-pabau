import React, { FC, useEffect, useState } from 'react'
import { Divider, Form } from 'antd'
import {
  Button,
  ButtonCheckbox,
  Notification,
  NotificationType,
} from '@pabau/ui'
import styles from './BusinessDetailsNotifications.module.less'
import { useTranslation } from 'react-i18next'

interface NotificationSetting {
  setting: string
  disabled: boolean
}

interface NotificationConfig {
  title: string
  tooltip?: string
  settings: NotificationSetting[]
}

export interface BusinessDetailsNotificationsProps {
  onSave?(val): void
  configurations?: NotificationConfig[]
}

export const BusinessDetailsNotifications: FC<BusinessDetailsNotificationsProps> = ({
  onSave,
  configurations,
}) => {
  const { t } = useTranslation('common')

  const defaultConfigs: NotificationConfig[] = [
    {
      title: t('business.notification.lead'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    {
      title: t('business.notification.review'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    {
      title: t('business.notification.sms.delivered'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    {
      title: t('business.notification.newsletter.delivered'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    {
      title: t('business.notification.report'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    {
      title: t('business.notification.holiday'),
      tooltip: t('business.notification.holiday.tooltip'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    {
      title: t('business.notification.refer'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    },
    ...[
      t('business.notification.unattended'),
      t('business.notification.assessment.due'),
      t('business.notification.peer.review.due'),
      t('business.notification.self.assessment.due'),
      t('business.notification.manager.assessment.due'),
      t('business.notification.target.hit'),
    ].map((title) => ({
      title,
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
        },
      ],
    })),
  ]
  const [configs, setConfigs] = useState<NotificationConfig[]>([])
  const handleSaveChanges = () => {
    Notification(
      NotificationType.success,
      t('notification.type.success.message')
    )
    onSave?.(configs)
  }

  useEffect(() => {
    setConfigs(configurations || defaultConfigs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configurations])
  return (
    <div className={styles.notificationsTabContainer}>
      <div className={styles.notificationsSubContainer}>
        <div className={styles.notificationsHeaderContainer}>
          <div>
            <p className={styles.tabTitle}>
              {t('business.notification.tab.title')}
            </p>
            <p className={styles.tabSubTitle}>
              {t('business.notification.sub.title')}
            </p>
          </div>
        </div>
      </div>
      {configs.map((config) => (
        <React.Fragment key={config.title}>
          <Divider />
          <div className={styles.sectionContainer}>
            <Form layout="vertical">
              <Form.Item label={config.title} tooltip={config.tooltip}>
                {config.settings.map((setting) => (
                  <ButtonCheckbox
                    key={setting.setting}
                    label={setting.setting}
                    disabled={setting.disabled}
                  />
                ))}
              </Form.Item>
            </Form>
          </div>
        </React.Fragment>
      ))}
      <div className={styles.btnSave}>
        <Button type="primary" onClick={() => handleSaveChanges()}>
          {t('business.details.save.changes')}
        </Button>
      </div>
    </div>
  )
}

export default BusinessDetailsNotifications
