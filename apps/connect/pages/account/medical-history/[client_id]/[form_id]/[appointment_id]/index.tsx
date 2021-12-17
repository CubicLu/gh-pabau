import {
  useGetBusinessDetailsQuery,
  useGetContactDetailsLazyQuery,
  useGetMedicalFormDetailsLazyQuery,
} from '@pabau/graphql'
import {
  Breadcrumb,
  FormComponentBuilder,
  MedicalFormTypes,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Typography } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import ConnectLayout from '../../../../../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../../../../../components/UserContext/context/ClientContext'
import styles from '../../../style.module.less'

const { Title } = Typography

const defaultData = {
  clientName: '---',
  dob: '---',
  homeAddress: '---',
  postcode: '---',
  homePhone: '---',
  mobilePhone: '---',
}

export const MedicalHistory = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [clientName, setClientName] = useState('')
  const [formData, setFormData] = useState('')
  const [formName, setFormName] = useState('')
  const [dob, setDob] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [postcode, setPostcode] = useState('')
  const [homePhone, setHomePhone] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const clientContext = useContext(ClientContext)
  const router = useRouter()
  const [companyDateFormat, setCompanyDateFormat] = useState('d/m/Y')

  const [getMedicalFormDetails] = useGetMedicalFormDetailsLazyQuery({
    onCompleted(response) {
      if (response?.findUniqueMedicalForm?.data)
        setFormData(response?.findUniqueMedicalForm?.data)
      if (response?.findUniqueMedicalForm?.name)
        setFormName(response?.findUniqueMedicalForm?.name)
    },
    onError(error) {
      console.error(error)
    },
  })

  const [getContactDetails] = useGetContactDetailsLazyQuery({
    onCompleted(response) {
      if (response?.findManyCmContact?.length > 0) {
        let homeAddress = ''
        if (response.findManyCmContact[0].MailingStreet !== '')
          homeAddress += response.findManyCmContact[0].MailingStreet
        if (response.findManyCmContact[0].MailingCity !== '') {
          if (homeAddress !== '') homeAddress += ', '
          homeAddress += response.findManyCmContact[0].MailingCity
        }
        if (response.findManyCmContact[0].MailingCountry !== '') {
          if (homeAddress !== '') homeAddress += ', '
          homeAddress += response.findManyCmContact[0].MailingCountry
        }
        setClientName(
          response.findManyCmContact[0].Fname +
            ' ' +
            response.findManyCmContact[0].Lname
        )
        if (dayjs(response.findManyCmContact[0].DOB).isValid()) {
          setDob(
            companyDateFormat === 'd/m/Y'
              ? dayjs(response.findManyCmContact[0].DOB).format('DD/MM/YYYY') +
                  ' (' +
                  moment(response.findManyCmContact[0].DOB).toNow(true) +
                  ')'
              : dayjs(response.findManyCmContact[0].DOB).format('MM/DD/YYYY') +
                  ' (' +
                  moment(response.findManyCmContact[0].DOB).toNow(true) +
                  ')'
          )
        } else {
          setDob('--/--/----')
        }

        setHomeAddress(homeAddress !== '' ? homeAddress : '---')
        setPostcode(
          response.findManyCmContact[0].MailingPostal !== ''
            ? response.findManyCmContact[0].MailingPostal
            : '---'
        )
        setHomePhone(
          response.findManyCmContact[0].Phone !== ''
            ? response.findManyCmContact[0].Phone
            : '---'
        )
        setMobilePhone(
          response.findManyCmContact[0].Mobile !== ''
            ? response.findManyCmContact[0].Mobile
            : '---'
        )
      }
    },
    onError(error) {
      console.error(error)
    },
  })

  useEffect(() => {
    const {
      clientName,
      dob,
      homeAddress,
      postcode,
      homePhone,
      mobilePhone,
    } = defaultData
    setClientName(clientName)
    setDob(dob)
    setHomeAddress(homeAddress)
    setPostcode(postcode)
    setHomePhone(homePhone)
    setMobilePhone(mobilePhone)
  }, [])

  useEffect(() => {
    getContactDetails({
      variables: {
        contactId: { equals: Number(router.query.client_id) },
      },
    })
  }, [router.query.client_id, getContactDetails])

  useEffect(() => {
    getMedicalFormDetails({
      variables: {
        medicalFormId: Number(router.query.form_id),
      },
    })
  }, [router.query.form_id, getMedicalFormDetails])

  useEffect(() => {
    console.log('router.query.appointment_id =', router.query.appointment_id)
  }, [router.query.appointment_id])

  const businessDetails = useGetBusinessDetailsQuery()

  useEffect(() => {
    if (businessDetails?.data?.me?.Company?.details?.date_format)
      setCompanyDateFormat(
        businessDetails?.data?.me?.Company?.details?.date_format
      )
  }, [businessDetails])

  const saveMedicalFormHistory = (draggedForms: MedicalFormTypes[]) => {
    Notification(
      NotificationType.success,
      `${formName} ${t('connect.account.medicalhistory.form.save.success')}`
    )
  }

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
                {t('connect.account.medicalhistory.dob')}
              </span>
              <span className={styles.content}>{dob}</span>
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
          <div>
            <FormComponentBuilder
              previewData={formData}
              previewAttrs={[]}
              formSaveLabel={'Save Form'}
              saveMedicalFormHistory={saveMedicalFormHistory}
            />
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default MedicalHistory
