import React, { FC } from 'react'
import { Button, Badge, PabauPlus } from '@pabau/ui'
import { analyticsSettingsData } from './OnlineBookingSetting'
import styles from './style.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

export const AnalyticsTab: FC = () => {
  const { t } = useTranslationI18()

  return (
    <div className={styles.onlineBookingAnalytics}>
      <div className={styles.analyticsSettings}>
        <p>{t('setup.online-booking.analytics-settings')}</p>
        {analyticsSettingsData.map((setting) => (
          <div className={styles.analyticsSettingItem} key={setting.title}>
            <div>{setting.logo}</div>
            <div>
              <div>
                <h2>
                  <span style={{ marginRight: '8px' }}>{setting.title}</span>
                  <PabauPlus modalType="Marketing" />
                </h2>
                <p>{setting.description}</p>
                <div>
                  <Button type="primary">
                    {t('setup.online-booking.analytics.setup-now')}
                  </Button>
                </div>
              </div>
              <div className={styles.analyticsStatus}>
                <Badge
                  label={
                    setting.isEnabled
                      ? t('setup.online-booking.analytics.status.enabled')
                      : t('setup.online-booking.analytics.status.disabled')
                  }
                  disabled={setting.isEnabled}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsTab
