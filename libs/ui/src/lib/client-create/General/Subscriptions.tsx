import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Form as AntForm, Switch } from 'formik-antd'
import { useTranslation } from 'react-i18next'

export const Subscriptions: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.subscriptionForm}>
      <h5>{t('quickCreate.client.modal.general.subscription')}</h5>
      <p>{t('quickCreate.client.modal.general.subscription.detail')}</p>
      <AntForm.Item name="MarketingOptInEmail">
        <div className={styles.switchBtn}>
          <Switch name="MarketingOptInEmail" />
          <p>{t('quickCreate.client.modal.general.subscription.newsLetter')}</p>
        </div>
      </AntForm.Item>
      <AntForm.Item name="MarketingOptInText">
        <div className={styles.switchBtn}>
          <Switch name="MarketingOptInText" />
          <p> {t('quickCreate.client.modal.general.subscription.sms')}</p>
        </div>
      </AntForm.Item>
      <AntForm.Item name="MarketingOptInPost">
        <div className={styles.switchBtn}>
          <Switch name="MarketingOptInPost" />
          <p>{t('quickCreate.client.modal.general.subscription.postal')}</p>
        </div>
      </AntForm.Item>
      <AntForm.Item name="MarketingOptInPhone">
        <div className={styles.switchBtn}>
          <Switch name="MarketingOptInPhone" />
          <p>{t('quickCreate.client.modal.general.subscription.phoneCalls')}</p>
        </div>
      </AntForm.Item>
    </div>
  )
}
