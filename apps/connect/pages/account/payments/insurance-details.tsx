import { CheckOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from '@pabau/ui'
import { Input, Select, Typography } from 'antd'
import React, { FC, useContext, useState } from 'react'
import ConnectLayout from '../../../components/ConnectLayout/ConnectLayout'
import styles from './insurance-details.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../../components/UserContext/context/ClientContext'

const { Title } = Typography
const { Option } = Select

const InsuranceDetails: FC = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const [companyName, setCompanyName] = useState('')
  const [membershipNumber, setMembershipNumber] = useState('')
  const companyList = ['AXA', 'Aviva', 'Bupa', 'Prudential', 'WPA', 'Other']
  const clientContext = useContext(ClientContext)

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.insuranceDetails}>
        <div className={styles.insuranceDetailsHeader}>
          <Breadcrumb
            items={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('connect.account.payments'),
                path: 'connect/account/payments',
              },
              {
                breadcrumbName: t('connect.account.payments.insurancedetails'),
                path: '',
              },
            ]}
          />
          <Title>{t('connect.account.payments.insurancedetails')}</Title>
        </div>
        <div className={styles.insuranceDetailsMobileHeader}>
          <Title>{t('connect.account.payments.insurancedetails')}</Title>
        </div>
        <div className={styles.insuranceDetailsContent}>
          <div className={styles.insuranceDetailsForm}>
            <div className={styles.formItem}>
              <p className={styles.label}>
                {t(
                  'connect.account.payments.insurancedetails.companyname.label'
                )}
              </p>
              <div className={styles.content}>
                <Select
                  placeholder={t(
                    'connect.account.payments.insurancedetails.companyname.placeholder'
                  )}
                  value={companyName}
                  onSelect={(value) => setCompanyName(value)}
                >
                  {companyList.map((company, index) => (
                    <Option value={company} key={`company-item-${index}`}>
                      <div className={styles.companyItem}>
                        <div>
                          {companyName === company && <CheckOutlined />}
                        </div>
                        <div
                          className={
                            companyName === company
                              ? styles.selected
                              : styles.unselected
                          }
                        >
                          {company}
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className={styles.formItem}>
              <p className={styles.label}>
                {t(
                  'connect.account.payments.insurancedetails.membershipnumber.label'
                )}
              </p>
              <div className={styles.content}>
                <Input
                  placeholder={t(
                    'connect.account.payments.insurancedetails.membershipnumber.placeholder'
                  )}
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  disabled={!companyName}
                />
              </div>
            </div>
            <div className={styles.formItem}>
              <Button
                type="primary"
                disabled={!companyName || !membershipNumber}
                block
              >
                {t('common-label-save')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default InsuranceDetails
