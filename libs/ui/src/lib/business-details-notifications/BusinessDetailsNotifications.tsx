import React, { FC, useEffect, useState } from 'react'
import { Divider, Form } from 'antd'
import { Button, ButtonCheckbox } from '@pabau/ui'
import styles from './BusinessDetailsNotifications.module.less'
import { useTranslation } from 'react-i18next'

interface NotificationSetting {
  setting: string
  disabled: boolean
  checked: boolean
}

interface NotificationConfig {
  title: string
  tooltip?: string
  settings: NotificationSetting[]
  badge?: boolean
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
      title: t('business.notification.review'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
          checked: true,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
          checked: true,
        },
      ],
      badge: false,
    },
    {
      title: t('business.notification.sms.delivered'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
          checked: true,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
          checked: true,
        },
      ],
      badge: false,
    },
    {
      title: t('business.notification.newsletter.delivered'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
          checked: true,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
          checked: true,
        },
      ],
      badge: false,
    },
    {
      title: t('business.notification.holiday'),
      tooltip: t('business.notification.holiday.tooltip'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
          checked: true,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
          checked: true,
        },
      ],
      badge: false,
    },
    {
      title: t('business.notification.refer'),
      settings: [
        {
          setting: t('business.notification.setting.notification'),
          disabled: false,
          checked: true,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: false,
          checked: true,
        },
      ],
      badge: false,
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
          disabled: true,
          checked: true,
        },
        {
          setting: t('business.notification.setting.email'),
          disabled: true,
          checked: true,
        },
      ],
      badge: true,
    })),
  ]
  const [configs, setConfigs] = useState<NotificationConfig[]>([])
  const handleSaveChanges = () => {
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
      {configs.map((config, index) => (
        <React.Fragment key={config.title}>
          <Divider />
          <div className={styles.sectionContainer}>
            {config.badge && (
              <div className={styles.mainDiv}>
                <p className={styles.title}>{config.title}</p>
                <span className={styles.label}>
                  {t('notification.coming.soon.label')}
                </span>
              </div>
            )}
            <Form layout="vertical">
              <Form.Item
                label={!config.badge ? config.title : ''}
                tooltip={config.tooltip}
              >
                {config.settings.map((setting, i) => (
                  <ButtonCheckbox
                    key={setting.setting}
                    label={setting.setting}
                    disabled={setting.disabled}
                    onChange={(val) => {
                      const List = [...configs]
                      List[index].settings[i].checked = !setting.checked
                      setConfigs(List)
                    }}
                    checked={setting.checked}
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
