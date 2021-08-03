import { CloseOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Notification,
  NotificationType,
  SearchAddOption,
} from '@pabau/ui'
import { Typography } from 'antd'
import React, { useContext, useState } from 'react'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import styles from './allergies.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../components/ContextWrapper/context/ClientContext'
const { Title } = Typography

export const Allergies = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)
  const allergiesOptions = ['Peanuts', 'Soy', 'Wheat', 'Tree Nuts']
  const [selectedAllergies, setSelectedAllergies] = useState([])

  const onSelectAllergy = (e) => {
    setSelectedAllergies([...selectedAllergies, e])
    Notification(
      NotificationType.success,
      t('account.settings.allergies.add-message')
    )
  }

  const onDeSelectAllergy = (e) => {
    const arr = selectedAllergies.filter((x, i) => x !== e)
    setSelectedAllergies(arr)
    Notification(
      NotificationType.error,
      t('account.settings.allergies.remove-message')
    )
  }

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.allergies}>
        <div className={styles.allergiesHeader}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('account.settings.allergies.title'),
                path: '',
              },
            ]}
          />
          <Title>{t('account.settings.allergies.title')}</Title>
        </div>
        <div className={styles.allergiesMobileHeader}>
          <Title>{t('account.settings.allergies.title')}</Title>
        </div>
        <div className={styles.allergiesContent}>
          <p>{t('account.settings.allergies.description')}</p>
          <SearchAddOption
            label={t('account.settings.allergies.search.label')}
            placeHolder={t('account.settings.allergies.search.placeholder')}
            options={allergiesOptions}
            onChange={onSelectAllergy}
          />

          {selectedAllergies.length > 0 && (
            <div className={styles.allergiesSelectedContent}>
              <Title level={5}>
                {t('account.settings.allergies.your-allergies')}
              </Title>

              {selectedAllergies.map((e, i) => {
                return (
                  <div key={i} className={styles.allergyItem}>
                    <span>{e}</span>
                    <div
                      className={styles.iconContainer}
                      onClick={() => {
                        onDeSelectAllergy(e)
                      }}
                    >
                      <CloseOutlined className={styles.icon} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </ConnectLayout>
  )
}

export default Allergies
