import {
  Breadcrumb,
  PaymentMethodInformation,
  PaymentMethods as PabauPaymentMethods,
} from '@pabau/ui'
import { Typography } from 'antd'
import React, { useContext, useState } from 'react'
import ConnectLayout from '../../../components/ConnectLayout/ConnectLayout'
import styles from './payment-methods.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../../components/UserContext/context/ClientContext'

const { Title } = Typography

export const PaymentMethods = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const [methods, setMethods] = useState<PaymentMethodInformation[]>([])
  const clientContext = useContext(ClientContext)
  const handleChangePaymentMethods = (methods) => {
    setMethods(methods)
  }

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.paymentMethods}>
        <div className={styles.paymentMethodsHeader}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('connect.account.payments'),
                path: 'connect/account/payments',
              },
              {
                breadcrumbName: t('connect.account.payments.paymentmethods'),
                path: '',
              },
            ]}
          />
          <Title>{t('connect.account.payments.paymentmethods')}</Title>
        </div>
        <div className={styles.paymentMethodsMobileHeader}>
          <Title>{t('connect.account.payments.paymentmethods')}</Title>
        </div>
        <div className={styles.paymentMethodsContent}>
          <PabauPaymentMethods
            methods={methods}
            onChange={(methods) => handleChangePaymentMethods(methods)}
          />
        </div>
      </div>
    </ConnectLayout>
  )
}

export default PaymentMethods
