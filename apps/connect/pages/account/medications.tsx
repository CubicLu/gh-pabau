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
import { ClientContext } from '../../components/UserContext/context/ClientContext'
const { Title } = Typography

export const Medications = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)

  const medicationOptions = [
    'Vicodin',
    'Simvastatin',
    'Lisinopril',
    'Levothyroxine',
    'Vitamin D',
  ]
  const [selectedMedications, setSelectedMedications] = useState([])

  const onSelectMedication = (e) => {
    setSelectedMedications([...selectedMedications, e])
    Notification(
      NotificationType.success,
      t('account.settings.medications.add-message')
    )
  }

  const onDeSelectMedication = (e) => {
    const arr = selectedMedications.filter((x, i) => x !== e)
    setSelectedMedications(arr)
    Notification(
      NotificationType.error,
      t('account.settings.medications.remove-message')
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
            items={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('account.settings.medications.title'),
                path: '',
              },
            ]}
          />
          <Title>{t('account.settings.medications.title')}</Title>
        </div>
        <div className={styles.allergiesMobileHeader}>
          <Title>{t('account.settings.medications.title')}</Title>
        </div>
        <div className={styles.allergiesContent}>
          <p>{t('account.settings.medications.description')}</p>
          <SearchAddOption
            label={t('account.settings.medications.search.label')}
            placeHolder={t('account.settings.medications.search.placeholder')}
            options={medicationOptions}
            onChange={onSelectMedication}
          />

          {selectedMedications.length > 0 && (
            <div className={styles.allergiesSelectedContent}>
              <Title level={5}>
                {t('account.settings.medications.your-medications')}
              </Title>

              {selectedMedications.map((e, i) => {
                return (
                  <div key={i} className={styles.allergyItem}>
                    <span>{e}</span>
                    <div
                      className={styles.iconContainer}
                      onClick={() => {
                        onDeSelectMedication(e)
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

export default Medications
