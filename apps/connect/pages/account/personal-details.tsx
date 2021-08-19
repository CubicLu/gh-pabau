import { CameraOutlined } from '@ant-design/icons'
import {
  useGetContactDetailsLazyQuery,
  useUpdateConnectPersonalDetailsMutation,
} from '@pabau/graphql'
import {
  AvatarUploader,
  Breadcrumb,
  Button,
  Input,
  Language,
  Notification,
  NotificationType,
  PhoneNumberInput,
} from '@pabau/ui'
import { Select, Typography } from 'antd'
import cn from 'classnames'
import { useFormik } from 'formik'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import * as Yup from 'yup'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/ContextWrapper/context/ClientContext'
import styles from './personal-details.module.less'

const { Title } = Typography
const { Option } = Select

interface InputTypes {
  avatar: string
  firstName: string
  lastName: string
  dobDate: string
  dobMonth: string
  dobYear: string
  gender: string
  language: string
  weight: string
  height: string
  smoke: string
  phone: string
  email: string
  street: string
  postcode: string
  town: string
  country: string
}

export const PersonalDetails = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [openAvatarUploader, setOpenAvatarUploader] = useState(false)
  const clientContext = useContext(ClientContext)
  const [client, setClient] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    dobDate: '01',
    dobMonth: 'Oct',
    dobYear: 1994,
    gender: 'woman',
    language: 'English (UK)',
    weight: '',
    height: '',
    smoke: 'No',
    phone: '',
    email: '',
    street: '',
    postcode: '',
    town: '',
    country: 'GB',
    loaded: 0,
  })

  const currentYear = new Date().getFullYear()
  const [getContactDetails] = useGetContactDetailsLazyQuery({
    onCompleted(response) {
      if (response.findManyCmContact.length > 0) {
        const contactDOB = new Date(response.findManyCmContact[0].DOB)
        const contactGender =
          response.findManyCmContact[0].gender === 'Male'
            ? 'man'
            : response.findManyCmContact[0].gender === 'Female'
            ? 'woman'
            : ''
        const contact = {
          avatar: response.findManyCmContact[0].Avatar,
          firstName: response.findManyCmContact[0].Fname,
          lastName: response.findManyCmContact[0].Lname,
          dobDate:
            contactDOB.getDate() < 10
              ? `0${contactDOB.getDate().toString()}`
              : contactDOB.getDate().toString(),
          dobMonth: monthItems[contactDOB.getMonth()],
          dobYear: contactDOB.getFullYear(),
          gender: contactGender,
          language: response.findManyCmContact[0].ContactMeta.find(
            (el) => el.meta_name === 'connect_preferred_language'
          ).meta_value,
          weight: response.findManyCmContact[0].ContactMeta.find(
            (el) => el.meta_name === 'connect_weight'
          ).meta_value,
          height: response.findManyCmContact[0].ContactMeta.find(
            (el) => el.meta_name === 'connect_height'
          ).meta_value,
          smoke: response.findManyCmContact[0].ContactMeta.find(
            (el) => el.meta_name === 'connect_smoker'
          ).meta_value,
          phone: response.findManyCmContact[0].Mobile
            ? response.findManyCmContact[0].Mobile
            : response.findManyCmContact[0].Phone
            ? response.findManyCmContact[0].Phone
            : '',
          email: response.findManyCmContact[0].Email,
          street: response.findManyCmContact[0].MailingStreet,
          postcode: response.findManyCmContact[0].MailingPostal,
          town: response.findManyCmContact[0].MailingCity,
          country: 'GB',
          loaded: 1,
        }

        setClient(contact)
        for (const [key, value] of Object.entries(contact)) {
          handleChange(key, value)
        }
      }
    },
    onError(error) {
      console.error(error)
    },
  })

  const [
    updateConnectPersonalDetailsMutation,
  ] = useUpdateConnectPersonalDetailsMutation()

  const monthItems = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const initialValues: InputTypes = {
    avatar: '',
    firstName: '',
    lastName: '',
    dobDate: '01',
    dobMonth: 'Jan',
    dobYear: '1994',
    gender: 'woman',
    language: 'English (UK)',
    weight: '',
    height: '',
    smoke: 'No',
    phone: '',
    email: '',
    street: '',
    postcode: '',
    town: '',
    country: 'GB',
  }
  const validationSchema = Yup.object({
    avatar: Yup.string().required(
      t('connect.account.personaldetails.validate.avatar.required')
    ),
    firstName: Yup.string().required(
      t('connect.account.personaldetails.validate.firstname.required')
    ),
    lastName: Yup.string().required(
      t('connect.account.personaldetails.validate.lastname.required')
    ),
    dobDate: Yup.string().required(
      t('connect.account.personaldetails.validate.dob.required')
    ),
    dobMonth: Yup.string().required(
      t('connect.account.personaldetails.validate.dob.required')
    ),
    dobYear: Yup.string().required(
      t('connect.account.personaldetails.validate.dob.required')
    ),
    gender: Yup.string().required(
      t('connect.account.personaldetails.validate.gender.required')
    ),
    language: Yup.string().required(
      t('connect.account.personaldetails.validate.language.required')
    ),
    weight: Yup.string().required(
      t('connect.account.personaldetails.validate.weight.required')
    ),
    height: Yup.string().required(
      t('connect.account.personaldetails.validate.height.required')
    ),
    phone: Yup.string().required(
      t('connect.account.personaldetails.validate.phone.required')
    ),
    email: Yup.string()
      .required(t('connect.account.personaldetails.validate.email.required'))
      .email(t('connect.account.personaldetails.validate.email.type')),
    street: Yup.string().required(
      t('connect.account.personaldetails.validate.street.required')
    ),
    postcode: Yup.string().required(
      t('connect.account.personaldetails.validate.postcode.required')
    ),
    town: Yup.string().required(
      t('connect.account.personaldetails.validate.town.required')
    ),
    country: Yup.string().required(
      t('connect.account.personaldetails.validate.country.required')
    ),
  })
  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updateConnectPersonalDetailsMutation({
        variables: {
          contactId: clientContext[0].contact_id,
          avatar: values.avatar,
          fname: values.firstName,
          lname: values.lastName,
          dob: `${values.dobYear}-${values.dobMonth}-${values.dobDate}`,
          gender: values.gender,
          mobile: values.phone,
          email: values.email,
          mailingStreet: values.street,
          mailingPostal: values.postcode,
          mailingCountry: values.country,
          mailingCity: values.town,
        },
      })

      Notification(
        NotificationType.success,
        t('connect.account.personaldetails.save.success')
      )
    },
  })

  const handleChange = (key, value) => {
    console.log('inifnite loop....')
    formik.setFieldValue(key, value)
  }

  useEffect(() => {
    if (clientContext) {
      getContactDetails({
        variables: {
          contactId: clientContext[0].contact_id,
        },
      })
    }
  }, [clientContext, getContactDetails])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.personalDetails}>
        <div className={styles.personalDetailsHeader}>
          {!isMobile ? (
            <>
              <Breadcrumb
                breadcrumbItems={[
                  {
                    breadcrumbName: t('connect.account.title'),
                    path: 'connect/account',
                  },
                  {
                    breadcrumbName: t('connect.account.personaldetails'),
                    path: '',
                  },
                ]}
              />
              <Title>{t('connect.account.personaldetails')}</Title>
            </>
          ) : (
            <Title>{t('connect.account.personaldetails')}</Title>
          )}
        </div>
        <div className={styles.personalDetailsContent}>
          <div className={styles.avatarContainer}>
            <div style={{ backgroundImage: `url(${formik.values.avatar})` }}>
              <div>
                <CameraOutlined
                  className={styles.cameraIcon}
                  onClick={() => setOpenAvatarUploader(true)}
                />
              </div>
            </div>
            <div>{`${formik.values.firstName} ${formik.values.lastName}`}</div>
          </div>
          <div className={styles.personalDetailsSection}>
            <p className={styles.title}>
              {t('connect.account.personaldetails.general')}
            </p>
            <div className={styles.item}>
              <Input
                id={'input-fname'}
                label={t(
                  'connect.account.personaldetails.general.firstname.label'
                )}
                placeHolderText={t(
                  'connect.account.personaldetails.general.firstname.placeholder'
                )}
                text={formik.values.firstName}
                onChange={(val) => handleChange('firstName', val)}
              />
            </div>
            <div className={styles.item}>
              <Input
                id={'input-lname'}
                label={t(
                  'connect.account.personaldetails.general.lastname.label'
                )}
                placeHolderText={t(
                  'connect.account.personaldetails.general.lastname.placeholder'
                )}
                text={formik.values.lastName}
                onChange={(val) => handleChange('lastName', val)}
              />
            </div>
            <div className={styles.item}>
              <p className={styles.label}>
                {t('connect.account.personaldetails.general.dob.label')}
              </p>
              <div className={cn(styles.content, styles.dobWrapper)}>
                <div>
                  <Select
                    defaultValue={formik.values.dobDate}
                    onSelect={(val) => handleChange('dobDate', val)}
                  >
                    {[...Array.from({ length: 31 })].map((_, index) => (
                      <Option
                        key={`dob-date-${index}`}
                        value={index > 8 ? index + 1 : '0' + (index + 1)}
                      >
                        {index > 8 ? index + 1 : '0' + (index + 1)}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    defaultValue={formik.values.dobMonth}
                    onSelect={(val) => handleChange('dobMonth', val)}
                  >
                    {monthItems.map((month, index) => (
                      <Option key={`dob-month-${index}`} value={month}>
                        {month}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    defaultValue={formik.values.dobYear}
                    onSelect={(val) => handleChange('dobYear', val)}
                  >
                    {[...Array.from({ length: 400 })].map((_, index) => (
                      <Option
                        key={`dob-year-${index}`}
                        value={currentYear - index}
                      >
                        {currentYear - index}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.label}>
                {t('connect.account.personaldetails.general.gender.label')}
              </p>
              <div className={styles.content}>
                <Select
                  defaultValue={formik.values.gender}
                  onSelect={(val) => handleChange('gender', val)}
                >
                  <Option key="gender-woman" value="woman">
                    {t('connect.account.personaldetails.general.gender.woman')}
                  </Option>
                  <Option key="gender-man" value="man">
                    {t('connect.account.personaldetails.general.gender.man')}
                  </Option>
                </Select>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.label}>
                {t('connect.account.personaldetails.general.lang.label')}
              </p>
              <div className={styles.content}>
                <Language
                  defaultValue={formik.values.language}
                  onSelect={(val) => handleChange('language', val)}
                />
              </div>
            </div>
          </div>
          <div className={styles.personalDetailsSection}>
            <p className={styles.title}>
              {t('connect.account.personaldetails.healthinfo')}
            </p>
            <div className={styles.items}>
              <div className={styles.item}>
                <Input
                  label={t('connect.account.personaldetails.healthinfo.weight')}
                  text={formik.values.weight}
                  onChange={(val) => handleChange('weight', val)}
                />
              </div>
              <div className={styles.item}>
                <Input
                  label={t('connect.account.personaldetails.healthinfo.height')}
                  text={formik.values.height}
                  onChange={(val) => handleChange('height', val)}
                />
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.label}>
                {t('connect.account.personaldetails.healthinfo.smoke')}
              </p>
              <div className={styles.content}>
                <Select
                  defaultValue={formik.values.smoke}
                  onSelect={(val) => handleChange('smoke', val)}
                >
                  <Option key="smoke-yes" value="Yes">
                    {t('connect.account.personaldetails.healthinfo.smoke.yes')}
                  </Option>
                  <Option key="smoke-no" value="No">
                    {t('connect.account.personaldetails.healthinfo.smoke.no')}
                  </Option>
                </Select>
              </div>
            </div>
          </div>
          <div className={styles.personalDetailsSection}>
            <p className={styles.title}>
              {t('connect.account.personaldetails.contactdetails')}
            </p>
            <div className={styles.item}>
              <div className={styles.phoneNumberWrapper}>
                <PhoneNumberInput
                  label={t(
                    'connect.account.personaldetails.contactdetails.phone'
                  )}
                  value={formik.values.phone}
                  onChange={(val) => handleChange('phone', val)}
                />
              </div>
            </div>
            <div className={styles.item}>
              <Input
                label={t(
                  'connect.account.personaldetails.contactdetails.email.label'
                )}
                text={formik.values.email}
                placeHolderText={t(
                  'connect.account.personaldetails.contactdetails.email.placeholder'
                )}
                onChange={(val) => handleChange('email', val)}
              />
            </div>
          </div>
          <div className={styles.personalDetailsSection}>
            <p className={styles.title}>
              {t('connect.account.personaldetails.address')}
            </p>
            <div className={styles.item}>
              <Input
                label={t(
                  'connect.account.personaldetails.address.street.label'
                )}
                text={formik.values.street}
                placeHolderText={t(
                  'connect.account.personaldetails.address.street.placeholder'
                )}
                onChange={(val) => handleChange('street', val)}
              />
            </div>
            <div className={styles.items}>
              <div className={styles.item}>
                <Input
                  label={t(
                    'connect.account.personaldetails.address.postcode.label'
                  )}
                  text={formik.values.postcode}
                  placeHolderText={t(
                    'connect.account.personaldetails.address.postcode.placeholder'
                  )}
                  onChange={(val) => handleChange('postcode', val)}
                />
              </div>
              <div className={styles.item}>
                <Input
                  label={t(
                    'connect.account.personaldetails.address.town.label'
                  )}
                  text={formik.values.town}
                  placeHolderText={t(
                    'connect.account.personaldetails.address.town.placeholder'
                  )}
                  onChange={(val) => handleChange('town', val)}
                />
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.label}>
                {t('connect.account.personaldetails.address.country.label')}
              </p>
              <div className={styles.content}>
                <Select
                  defaultValue={formik.values.country}
                  onSelect={(val) => handleChange('country', val)}
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
            <Button type="primary" block onClick={() => formik.submitForm()}>
              {t('connect.account.personaldetails.save')}
            </Button>
          </div>
        </div>
        <AvatarUploader
          visible={openAvatarUploader}
          title={t('connect.account.personaldetails.uploadavatar')}
          onCreate={(val) => handleChange('avatar', val)}
          imageURL={formik.values.avatar}
          onCancel={() => setOpenAvatarUploader(false)}
        />
      </div>
    </ConnectLayout>
  )
}

export default PersonalDetails
