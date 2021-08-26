import {
  Breadcrumb,
  Button,
  Input,
  Notification,
  NotificationType,
  PhoneNumberInput,
} from '@pabau/ui'
import { Select, Typography } from 'antd'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import React, { useContext, useState } from 'react'
import { useMedia } from 'react-use'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import styles from './gp-details.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../components/UserContext/context/ClientContext'

const { Title } = Typography
const { Option } = Select

export const GPDetails = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [gpName, setGpName] = useState('')
  const [surgeryName, setSurgeryName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [street, setStreet] = useState('')
  const [postcode, setPostcode] = useState('')
  const [town, setTown] = useState('')
  const [country, setCountry] = useState('GB')

  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const handleSave = () => {
    Notification(NotificationType.success, 'Success - GP Details were updated')
  }

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.gpDetails}>
        <div className={styles.gpDetailsHeader}>
          {!isMobile ? (
            <>
              <Breadcrumb
                breadcrumbItems={[
                  {
                    breadcrumbName: t('connect.account.title'),
                    path: 'connect/account',
                  },
                  {
                    breadcrumbName: t('connect.account.gpdetails'),
                    path: '',
                  },
                ]}
              />
              <Title>{t('connect.account.gpdetails')}</Title>
            </>
          ) : (
            <Title>{t('connect.account.gpdetails')}</Title>
          )}
        </div>
        <div className={styles.gpDetailsContent}>
          <div className={styles.gpDetailsSection}>
            <p className={styles.title}>
              {t('connect.account.gpdetails.general')}
            </p>
            <div className={styles.item}>
              <Input
                label={t('connect.account.gpdetails.general.gpname.label')}
                placeHolderText={t(
                  'connect.account.gpdetails.general.gpname.placeholder'
                )}
                text={gpName}
                onChange={(val) => setGpName(val)}
              />
            </div>
            <div className={styles.item}>
              <Input
                label={t('connect.account.gpdetails.general.surgery.label')}
                placeHolderText={t(
                  'connect.account.gpdetails.general.surgery.placeholder'
                )}
                text={surgeryName}
                onChange={(val) => setSurgeryName(val)}
              />
            </div>
            <div className={styles.item}>
              <div className={styles.phoneNumberWrapper}>
                <PhoneNumberInput
                  label={t('connect.account.gpdetails.general.phone.label')}
                  value={phoneNumber}
                  onChange={(val) => setPhoneNumber(val)}
                />
              </div>
            </div>
          </div>
          <div className={styles.gpDetailsSection}>
            <p className={styles.title}>
              {t('connect.account.gpdetails.address')}
            </p>
            <div className={styles.item}>
              <Input
                label={t('connect.account.gpdetails.address.street.label')}
                text={street}
                placeHolderText={t(
                  'connect.account.gpdetails.address.street.placeholder'
                )}
                onChange={(val) => setStreet(val)}
              />
            </div>
            <div className={styles.items}>
              <div className={styles.item}>
                <Input
                  label={t('connect.account.gpdetails.address.postcode.label')}
                  text={postcode}
                  placeHolderText={t(
                    'connect.account.gpdetails.address.postcode.placeholder'
                  )}
                  onChange={(val) => setPostcode(val)}
                />
              </div>
              <div className={styles.item}>
                <Input
                  label={t('connect.account.gpdetails.address.town.label')}
                  text={town}
                  placeHolderText={t(
                    'connect.account.gpdetails.address.town.placeholder'
                  )}
                  onChange={(val) => setTown(val)}
                />
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.label}>
                {t('connect.account.gpdetails.address.country.label')}
              </p>
              <div className={styles.content}>
                <Select
                  defaultValue={country}
                  onSelect={(val) => setCountry(val)}
                >
                  {Object.keys(countriesName).map((c) => (
                    <Option key={c} value={c}>
                      {countriesName[c]}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className={styles.saveChangesButton}>
            <Button
              type="primary"
              block
              onClick={() => handleSave()}
              disabled={
                !gpName ||
                !surgeryName ||
                !phoneNumber ||
                !street ||
                !postcode ||
                !town ||
                !country
              }
            >
              {t('connect.account.gpdetails.save')}
            </Button>
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default GPDetails
