import {
  Avatar,
  AvatarUploader,
  BusinessLocation,
  BusinessTypes,
  Button,
  IOption,
  LanguageDropdown,
  PhoneNumberInput,
  SimpleDropdown,
} from '@pabau/ui'
import { Col, Divider, Row, Skeleton } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'react-use'
import currency from '../../assets/currency'
import { bizTypes } from '../../assets/images/biz-types'
import NormalClinicLogo from '../../assets/images/our-clinic.png'
import timezones from '../../assets/timezone'
import styles from './BusinessDetails.module.less'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'

export interface BasicInformation {
  businessName: string
  companyEmail: string
  phone: string
  website: string
  businessType: string
}

export interface LanguageSetting {
  defaultLanuageStaff: string
  defaultLanuageClients: string
  timezone: string
  currency: string
  dateFormat: string
  weekStart: string
}

export interface BusinessDetailsProps {
  apiKey: string
  onSave?(val): void
  loading: boolean
  basicInformation?: BasicInformation
  languageSetting?: LanguageSetting
  businessLocation?: string
  buttonClicked?: boolean
}

export const BusinessDetails: FC<BusinessDetailsProps> = ({
  apiKey,
  onSave,
  loading,
  basicInformation,
  languageSetting,
  businessLocation,
  buttonClicked,
}) => {
  const { t } = useTranslation('common')
  const size = useWindowSize()

  const [location, setLocation] = useState('')
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [userImage, setUserImage] = useState<string>(NormalClinicLogo)
  const [businessType, setBusinessType] = useState<IOption[]>(bizTypes)
  const [businessTypeData, setBusinessTypeData] = useState('')
  const [locationDetails, setLocationDetails] = useState({
    address: '',
    apt: '',
    city: '',
    country: '',
    postcode: '',
    region: '',
  })
  const [businessLocationData, setBusinessLocationData] = useState('')

  useEffect(() => {
    if (businessLocation !== undefined) {
      setLocation(businessLocation)
    }
    const List = [...businessType]
    const type =
      basicInformation?.businessType !== undefined
        ? basicInformation?.businessType
        : ''
    const typeList = type.split(',')

    typeList.map((item) => {
      const index = List.findIndex((i) => i.title === item)
      if (index !== -1) {
        List[index].onselected = true
        setBusinessType(List)
      }
      return item
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInformation])

  const handleChangeImage = (image: string) => {
    setUserImage(image)
  }
  const uploadPhoto = () => {
    setShowAvatarUploader(true)
  }
  const handleSaveChanges = (handleSubmit, values) => {
    handleSubmit()
    onSave?.({
      basicInformation: {
        businessName: values.businessName,
        companyEmail: values.companyEmail,
        phone: values.phone,
        website: values.website,
        businessType: businessTypeData,
      },
      languageSetting: {
        defaultLanuageStaff: values.defaultLanuageStaff,
        defaultLanuageClients: values.defaultLanuageClients,
        timezone: values.timezone,
        currency: values.currency,
        dateFormat: values.dateFormat,
        weekStart: values.weekStart,
      },
      businessLocation: locationDetails,
      businessLocationData: businessLocationData,
    })
  }

  const handleSelectBusinessType = (value) => {
    const Record = value.filter((item) => item.onselected === true)
    const result: string[] = []
    Record.map((item) => result.push(item.title))
    setBusinessTypeData(result.toString())
  }

  const formikInitialValues = {
    businessName: basicInformation?.businessName ?? '',
    companyEmail: basicInformation?.companyEmail || '',
    phone: basicInformation?.phone || '',
    website: basicInformation?.website || '',
    defaultLanuageStaff: languageSetting?.defaultLanuageStaff || '',
    defaultLanuageClients: languageSetting?.defaultLanuageClients || '',
    timezone: languageSetting?.timezone || '',
    currency: languageSetting?.currency || '',
    dateFormat: languageSetting?.dateFormat || '',
    weekStart: languageSetting?.weekStart || '',
  }

  const formikValidationSchema = Yup.object({
    businessName: Yup.string().required(
      t('setup.business.details.name.message')
    ),
    companyEmail: Yup.string()
      .email(t('setup.business.details.email.message'))
      .required(t('setup.business.details.email.required')),
  })

  const handleLocationChanges = (value, data) => {
    setLocationDetails({
      address: data.address ?? '',
      apt: data.apt ?? '',
      city: data.city ?? '',
      country: data.country ?? '',
      postcode: data.postcode ?? '',
      region: data.region ?? '',
    })
    setBusinessLocationData(value)
  }

  return (
    <div className={styles.businessDetailsTabContainer}>
      <div className={styles.detailsSubContainer}>
        <div className={styles.detailsHeaderContainer}>
          <div>
            <p className={styles.tabTitle}>
              {t('business.details.tab.tabtitle')}
            </p>
            <p className={styles.tabSubTitle}>
              {t('business.details.tab.subtitle')}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <Formik
        enableReinitialize={true}
        initialValues={formikInitialValues}
        validationSchema={formikValidationSchema}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
      >
        {({ setFieldValue, values, handleSubmit }) => (
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
          >
            <div className={styles.basicInformationSection}>
              <p className={`${styles.sectionTitle} ${styles.bottom}`}>
                {t('business.details.tab.basic.information.section')}
              </p>
              <div className={styles.normalClinicLogo}>
                <div onClick={uploadPhoto}>
                  <Avatar
                    src={userImage}
                    size={size.width > 767 ? 128 : 88}
                    name={'Clinic Logo'}
                    edit={true}
                  />
                </div>
              </div>
              <Row gutter={[32, 28]} className={styles.name}>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    label={t('business.details.input.business.name')}
                    name="businessName"
                  >
                    {!loading ? (
                      <Input
                        name="businessName"
                        autoComplete="off"
                        value={values.businessName}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    label={
                      <>
                        {t('business.details.input.business.email')}
                        <small>
                          &nbsp;
                          {t('business.details.input.business.email.text')}
                        </small>
                      </>
                    }
                    name="companyEmail"
                  >
                    {!loading ? (
                      <Input
                        name="companyEmail"
                        autoComplete="off"
                        value={values.companyEmail}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'phone'}
                    label={
                      loading
                        ? t('ui.add.thirdparty.addmanual.phone.label')
                        : ''
                    }
                  >
                    {!loading ? (
                      <PhoneNumberInput
                        onChange={(value) => setFieldValue('phone', value)}
                        label={t('ui.add.thirdparty.addmanual.phone.label')}
                        value={values.phone}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'website'}
                    label={t('business.details.input.website.label')}
                  >
                    {!loading ? (
                      <Input
                        name="website"
                        autoComplete="off"
                        value={values.website}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <BusinessTypes
                loading={loading}
                List={businessType}
                onSelect={handleSelectBusinessType}
              />
            </div>
            <Divider />
            <div className={styles.languageSettingSection}>
              <p className={`${styles.sectionTitle} ${styles.title}`}>
                {t('business.details.language.setting.title')}
              </p>
              <p className={`${styles.sectionSubTitle} ${styles.subtitle}`}>
                {t('business.details.language.setting.subtitle')}
              </p>
              <Row gutter={[32, 28]}>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'defaultLanuageStaff'}
                    label={
                      loading ? t('business.details.default.lanuage.staff') : ''
                    }
                  >
                    {!loading ? (
                      <LanguageDropdown
                        label={t('business.details.default.lanuage.staff')}
                        value={values.defaultLanuageStaff}
                        onSelected={(value) => {
                          setFieldValue('defaultLanuageStaff', value)
                        }}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'defaultLanuageClients'}
                    label={
                      loading
                        ? t('business.details.default.lanuage.clients')
                        : ''
                    }
                  >
                    {!loading ? (
                      <LanguageDropdown
                        label={t('business.details.default.lanuage.clients')}
                        value={values.defaultLanuageClients}
                        onSelected={(value) =>
                          setFieldValue('defaultLanuageClients', value)
                        }
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'timezone'}
                    label={loading ? t('business.details.timezone.label') : ''}
                  >
                    {!loading ? (
                      <SimpleDropdown
                        label={t('business.details.timezone.label')}
                        value={values.timezone}
                        dropdownItems={timezones.map(
                          (timezone) => timezone.text || ''
                        )}
                        onSelected={(value) => setFieldValue('timezone', value)}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'currency'}
                    label={loading ? t('business.details.currency.label') : ''}
                  >
                    {!loading ? (
                      <SimpleDropdown
                        label={t('business.details.currency.label')}
                        value={values.currency}
                        dropdownItems={currency}
                        onSelected={(value) => setFieldValue('currency', value)}
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'dateFormat'}
                    label={
                      loading ? t('business.details.date.format.label') : ''
                    }
                  >
                    {!loading ? (
                      <SimpleDropdown
                        label={t('business.details.date.format.label')}
                        value={values.dateFormat}
                        dropdownItems={[
                          t('business.details.date.format.value.dmy'),
                          t('business.details.date.format.value.mdy'),
                        ]}
                        onSelected={(value) =>
                          setFieldValue('dateFormat', value)
                        }
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                  <Form.Item
                    name={'values'}
                    label={
                      loading ? t('business.details.week.start.label') : ''
                    }
                  >
                    {!loading ? (
                      <SimpleDropdown
                        label={t('business.details.week.start.label')}
                        tooltip={t('business.details.week.start.tooltip')}
                        value={values.weekStart}
                        dropdownItems={[
                          t('business.details.week.day.monday'),
                          t('business.details.week.day.tuesday'),
                          t('business.details.week.day.wednesday'),
                          t('business.details.week.day.thursday'),
                          t('business.details.week.day.friday'),
                          t('business.details.week.day.saturday'),
                          t('business.details.week.day.sunday'),
                        ]}
                        onSelected={(value) =>
                          setFieldValue('weekStart', value)
                        }
                      />
                    ) : (
                      <Skeleton.Input active={true} size={'small'} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />
            <div className={styles.businessLocationSection}>
              <p className={`${styles.sectionTitle} ${styles.location}`}>
                {t('business.details.location')}
              </p>
              <BusinessLocation
                apiKey={apiKey}
                loading={loading}
                value={location}
                onChange={handleLocationChanges}
              />
            </div>
            <div className={styles.btnSave}>
              {!loading ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={buttonClicked}
                  className={styles.savebtn}
                  onClick={() => handleSaveChanges(handleSubmit, values)}
                >
                  {t('business.details.save.changes')}
                </Button>
              ) : (
                <Skeleton.Button
                  active={true}
                  size={'small'}
                  className={styles.btn}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
      <AvatarUploader
        visible={showAvatarUploader}
        title={t('account.settings.profile.avatarupload.title')}
        onCreate={handleChangeImage}
        imageURL={userImage}
        onCancel={() => setShowAvatarUploader(false)}
        shape={'rectangle'}
      />
    </div>
  )
}

export default BusinessDetails
