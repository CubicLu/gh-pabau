import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps } from '../LeadCreate'
import { Form as AntForm, Switch } from 'formik-antd'
import { useTranslation } from 'react-i18next'

interface Props {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
}

export const Subscriptions: FC<Props> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.subscriptionForm}>
      <h5>{t('quickCreate.client.modal.general.subscription')}</h5>
      <p>{t('quickCreate.client.modal.general.subscription.detail')}</p>
      <AntForm.Item name="newsLetter">
        <div className={styles.switchBtn}>
          <Switch name="newsLetter" />
          <p>{t('quickCreate.client.modal.general.subscription.newsLetter')}</p>
        </div>
      </AntForm.Item>
      <AntForm.Item name="sms">
        <div className={styles.switchBtn}>
          <Switch name="sms" />
          <p> {t('quickCreate.client.modal.general.subscription.sms')}</p>
        </div>
      </AntForm.Item>
      <AntForm.Item name="postal">
        <div className={styles.switchBtn}>
          <Switch name="postal" />
          <p> {t('quickCreate.client.modal.general.subscription.postal')}</p>
        </div>
      </AntForm.Item>
      <AntForm.Item name="phoneCalls">
        <div className={styles.switchBtn}>
          <Switch name="phoneCalls" />
          <p>{t('quickCreate.client.modal.general.subscription.phoneCalls')}</p>
        </div>
      </AntForm.Item>
    </div>
  )
}

export default Subscriptions
