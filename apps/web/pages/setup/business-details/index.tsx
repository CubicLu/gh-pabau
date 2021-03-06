import { useGetBusinessDetailsQuery } from '@pabau/graphql'
import {
  Breadcrumb,
  BusinessDetailsNotifications,
  PasswordExpirationProps,
  TabMenu,
  TerminologyConfig,
} from '@pabau/ui'
import { Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import CommonHeader from '../../../components/CommonHeader'
import Layout from '../../../components/Layout/Layout'
import BusinessDetailTab from '../../../components/Setup/BusinessDetails/BusinessDetailsTab'
import SecurityTab from '../../../components/Setup/BusinessDetails/SecurityTab'
import SystemTab from '../../../components/Setup/BusinessDetails/SystemTab'
import TerminologyTab from '../../../components/Setup/BusinessDetails/TerminologyTab'
import useWindowSize from '../../../hooks/useWindowSize'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'

const { Title } = Typography

export const Index: FC = () => {
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const optIns = [
    {
      title: 'For Clients',
      items: [
        {
          key: 'opt_in_postal',
          label: t('business.default.opt.key.postal'),
          value: '',
        },
        {
          key: 'opt_in_sms',
          label: t('business.default.opt.key.sms'),
          value: '',
        },
        {
          key: 'opt_in_email',
          label: t('business.default.opt.key.email'),
          value: '',
        },
        {
          key: 'opt_in_phone',
          label: t('business.default.opt.key.phone'),
          value: '',
        },
      ],
    },
    {
      title: 'For Leads',
      items: [
        {
          key: 'opt_in_postal_lead',
          label: t('business.default.opt.key.postal'),
          value: '',
        },
        {
          key: 'opt_in_sms_lead',
          label: t('business.default.opt.key.sms'),
          value: '',
        },
        {
          key: 'opt_in_email_lead',
          label: t('business.default.opt.key.email'),
          value: '',
        },
        {
          key: 'opt_in_phone_lead',
          label: t('business.default.opt.key.phone'),
          value: '',
        },
      ],
    },
  ]
  const [opsData, setOpsData] = useState<TerminologyConfig[]>(optIns)
  const [securityData, setSecurityData] = useState<PasswordExpirationProps>({
    modalType: 2,
    password_expire: '',
    login_attempts: '',
    password_enforce_history: '',
    lockout_period: '',
  })
  const [passwordExpiration, setPasswordExpiration] = useState('0')
  const [forcePassword, setForcePassword] = useState(0)
  const [addrSuiteNo, setAddrSuiteNo] = useState('')
  const [enableLab, setEnableLabs] = useState('')
  const [location, setLocation] = useState('')
  const [historyData, setHistoryData] = useState('')
  const [timeFormat, setTimeFormat] = useState('')
  const [companyLanguage, setCompanyLanguage] = useState('')
  const [taxSingular, serTaxSingular] = useState('')

  const tabMenuItems = [
    t('business.details.tab.tabtitle'),
    t('business.terminology.tab.title'),
    t('business.system.tab.title'),
    t('business.security.tab.title'),
    t('business.notification.tab.title'),
  ]
  const user = useUser()

  const { data, loading } = useGetBusinessDetailsQuery()

  useEffect(() => {
    const list = [...opsData]
    const securityList = securityData

    const record = data?.findManyCompanyMeta?.reduce(
      (data, { meta_name, meta_value }) => ({
        ...data,
        [meta_name]: meta_value,
      }),
      {}
    )

    if (record) {
      list.map((item) => {
        item.items.map((data) => {
          if (data.key) {
            data.value = record?.[`${data.key}`]
          }
          return data
        })
        return item
      })

      Object.keys(securityList).map((key) => {
        if (key !== 'modalType') {
          securityList[`${key}`] = record?.[`${key}`]
        }
        return key
      })

      setPasswordExpiration(record?.['password_expiration'] ?? '')
      setAddrSuiteNo(record?.['address_suite_no'] ?? '')
      setLocation(record?.['business_location'] ?? '')
      setEnableLabs(record?.['lab_enabled'] ?? '')
      setHistoryData(record?.['history_data'])
      setTimeFormat(record?.['time_format'])
      setCompanyLanguage(record?.['company_language'])
      serTaxSingular(record?.['tax_singular'])

      const force_password_data = data?.me?.Company?.User?.filter(
        (item) => item.id === user?.me?.id
      )
      if (force_password_data && force_password_data.length > 0) {
        setForcePassword(force_password_data[0].force_password)
      }
    }
    setOpsData(list)
    setSecurityData(securityList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSave = async (values, type) => {
    switch (type) {
      default: {
        break
      }
    }
  }

  return (
    <Layout>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={t('setup.business-details.header')}
      />
      {size.width > 767 && (
        <div className={styles.businessDetailsContainer}>
          <Breadcrumb
            items={[
              {
                breadcrumbName: t('navigation-breadcrumb-setup'),
                path: 'setup',
              },
              { breadcrumbName: t('setup.business-details.header'), path: '' },
            ]}
          />
          <Title>{t('setup.business-details.header')}</Title>
        </div>
      )}
      <div className={styles.tabsForDesktop}>
        <TabMenu
          tabPosition="left"
          menuItems={tabMenuItems}
          minHeight="auto"
          disabledKeys={loading ? [0, 1, 2, 3, 4] : []}
        >
          <BusinessDetailTab
            data={data}
            addrSuiteNo={addrSuiteNo}
            forcePassword={forcePassword}
            user={user?.me?.id}
            location={location}
            loading={loading}
            companyLanguage={companyLanguage}
            t={t}
          />
          <TerminologyTab
            data={data}
            addrSuiteNo={addrSuiteNo}
            forcePassword={forcePassword}
            user={user?.me?.id}
            opsData={opsData}
            loading={loading}
            taxSingular={taxSingular}
            t={t}
          />
          <SystemTab
            data={data}
            addrSuiteNo={addrSuiteNo}
            forcePassword={forcePassword}
            enableLab={enableLab}
            user={user?.me?.id}
            loading={loading}
            historyData={historyData}
            timeFormat={timeFormat}
            t={t}
          />
          <SecurityTab
            data={data}
            user={user?.me?.id}
            forcePassword={forcePassword}
            passwordExpiration={passwordExpiration}
            addrSuiteNo={addrSuiteNo}
            securityData={securityData}
            loading={loading}
            t={t}
          />
          <BusinessDetailsNotifications
            onSave={(values) => onSave(values, 'notification')}
          />
        </TabMenu>
      </div>
      <div className={styles.tabsForMobile}>
        <TabMenu tabPosition="top" menuItems={tabMenuItems} minHeight="auto">
          <BusinessDetailTab
            data={data}
            addrSuiteNo={addrSuiteNo}
            forcePassword={forcePassword}
            user={user?.me?.id}
            location={location}
            loading={loading}
            companyLanguage={companyLanguage}
            t={t}
          />
          <TerminologyTab
            data={data}
            addrSuiteNo={addrSuiteNo}
            forcePassword={forcePassword}
            user={user?.me?.id}
            opsData={opsData}
            loading={loading}
            taxSingular={taxSingular}
            t={t}
          />
          <SystemTab
            data={data}
            addrSuiteNo={addrSuiteNo}
            forcePassword={forcePassword}
            enableLab={enableLab}
            user={user?.me?.id}
            loading={loading}
            historyData={historyData}
            timeFormat={timeFormat}
            t={t}
          />
          <SecurityTab
            data={data}
            user={user?.me?.id}
            forcePassword={forcePassword}
            passwordExpiration={passwordExpiration}
            addrSuiteNo={addrSuiteNo}
            securityData={securityData}
            loading={loading}
            t={t}
          />
          <BusinessDetailsNotifications
            onSave={(values) => onSave(values, 'notification')}
          />
        </TabMenu>
      </div>
    </Layout>
  )
}

export default Index
