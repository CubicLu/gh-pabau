import { RightOutlined } from '@ant-design/icons'
import { Breadcrumb } from '@pabau/ui'
import { Typography } from 'antd'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import styles from './payments.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../components/ContextWrapper/context/ClientContext'

const { Title } = Typography

export const Payments = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.payments}>
        <div className={styles.paymentsHeader}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('connect.account.title'),
                path: '/account',
              },
              {
                breadcrumbName: t('connect.account.payments'),
                path: '',
              },
            ]}
          />
          <Title>{t('connect.account.payments')}</Title>
        </div>
        <div className={styles.paymentsMobileHeader}>
          <Title>{t('connect.account.payments')}</Title>
        </div>
        <div className={styles.paymentsContent}>
          <Link href="/account/payments/payment-methods">
            <div className={styles.paymentItem}>
              <span className={styles.title}>
                {t('connect.account.payments.paymentmethods')}
              </span>
              <RightOutlined className={styles.icon} />
            </div>
          </Link>
          <Link href="/account/payments/billing-history">
            <div className={styles.paymentItem}>
              <span className={styles.title}>
                {t('connect.account.payments.billinghistory')}
              </span>
              <RightOutlined className={styles.icon} />
            </div>
          </Link>
          <Link href="/account/payments/insurance-details">
            <div className={styles.paymentItem}>
              <span className={styles.title}>
                {t('connect.account.payments.insurancedetails')}
              </span>
              <RightOutlined className={styles.icon} />
            </div>
          </Link>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default Payments
