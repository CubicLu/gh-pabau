import { Breadcrumb } from '@pabau/ui'
import { Typography } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/UserContext/context/ClientContext'
import styles from './medical-history.module.less'

const { Title } = Typography

const defaultData = {
  clientName: 'James Torres',
  appointmentLastName: 'Green',
  dob: '1968-11-28',
  homeAddress: '68 Vassall Road, London',
  postcode: 'SW9 6HY',
  homePhone: '960507',
  mobilePhone: '+44 7700 900863',
}

export const MedicalHistory = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [clientName, setClientName] = useState('')
  const [appointmentLastName, setAppointmentLastName] = useState('')
  const [dob, setDob] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [postcode, setPostcode] = useState('')
  const [homePhone, setHomePhone] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const clientContext = useContext(ClientContext)

  useEffect(() => {
    const {
      clientName,
      appointmentLastName,
      dob,
      homeAddress,
      postcode,
      homePhone,
      mobilePhone,
    } = defaultData
    setClientName(clientName)
    setAppointmentLastName(appointmentLastName)
    setDob(dob)
    setHomeAddress(homeAddress)
    setPostcode(postcode)
    setHomePhone(homePhone)
    setMobilePhone(mobilePhone)
  }, [])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.medicalHisotry}>
        <div className={styles.medicalHistoryHeader}>
          {isMobile ? (
            <Title>{t('connect.account.medicalhistory')}</Title>
          ) : (
            <>
              <Breadcrumb
                items={[
                  {
                    breadcrumbName: 'Account',
                    path: 'connect/account',
                  },
                  {
                    breadcrumbName: t('connect.account.medicalhistory'),
                    path: '',
                  },
                ]}
              />
              <Title>{t('connect.account.medicalhistory')}</Title>
            </>
          )}
        </div>
        <div className={styles.medicalHistoryContent}>
          <div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.clientname')}
              </span>
              <span className={styles.content}>{clientName}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.appointmentlastname')}
              </span>
              <span className={styles.content}>{appointmentLastName}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.dob')}
              </span>
              <span className={styles.content}>
                {`${moment(dob).format('DD/MM/YYYY')} (${moment(dob).toNow(
                  true
                )})`}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.homeaddress')}
              </span>
              <span className={styles.content}>{homeAddress}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.postcode')}
              </span>
              <span className={styles.content}>{postcode}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.homephone')}
              </span>
              <span className={styles.content}>{homePhone}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>
                {t('connect.account.medicalhistory.mobilephone')}
              </span>
              <span className={styles.content}>{mobilePhone}</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default MedicalHistory
