import React, { FC, useState } from 'react'
import {
  BusinessDetails,
  BasicInformation,
  LanguageSetting,
  Notification,
  NotificationType,
} from '@pabau/ui'
import {
  GetBussinessDetailsQuery,
  GetBussinessDetailsDocument,
  useUpdateCompanyDetailsMutation,
  useSetMultipleMetaDataMutation,
} from '@pabau/graphql'
import { TFunction } from 'react-i18next'

interface BusinessDetailsTabProps {
  data: GetBussinessDetailsQuery
  addrSuiteNo: string
  forcePassword: number
  user: number
  location: string
  loading?: boolean
  t: TFunction<'common'>
}

export const BusinessDetailTab: FC<BusinessDetailsTabProps> = ({
  data,
  addrSuiteNo,
  forcePassword,
  user,
  location,
  loading,
  t,
}) => {
  const [updateApply, setUpdate] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [updateBusinessDetails] = useUpdateCompanyDetailsMutation({
    onCompleted() {
      setUpdate(true)
    },
    onError() {
      Notification(
        NotificationType.error,
        t('notification.type.error.message.text')
      )
    },
  })
  const [updateCompanyMeta] = useSetMultipleMetaDataMutation({
    onCompleted() {
      setButtonClicked(false)
      if (updateApply) {
        Notification(
          NotificationType.success,
          t('notification.type.success.message')
        )
      }
    },
    onError() {
      setButtonClicked(false)
      Notification(
        NotificationType.error,
        t('notification.type.error.message.text')
      )
    },
  })
  const basicInformation: BasicInformation = {
    businessName: data?.company?.details?.company_name,
    companyEmail: data?.company?.details?.info_email,
    phone: data?.company?.details?.phone,
    website: data?.company?.details?.website,
    businessType: data?.company?.details?.industry_sector,
  }

  const languageSetting: LanguageSetting = {
    defaultLanuageStaff:
      data?.company?.details?.language === 'english'
        ? ''
        : data?.company?.details?.language,
    defaultLanuageClients:
      data?.company?.details?.language === 'english'
        ? ''
        : data?.company?.details?.language,
    timezone: data?.company?.details?.timezone?.db_format,
    currency: data?.company?.details?.currency,
    dateFormat: data?.company?.details?.date_format,
    weekStart: data?.company?.details?.week_start_day,
  }

  const handleSaveDetail = async (values) => {
    setButtonClicked(true)
    setUpdate(false)

    const CompanyDetailData = {
      details_id: data?.company?.details?.details_id,
      business_name: data?.company?.details?.company_name,
      info_email: data?.company?.details?.info_email,
      phone: data?.company?.details?.phone,
      website: data?.company?.details?.website,
      industry_sector: data?.company?.details?.industry_sector,
      language: data?.company?.details?.language,
      timezone: data?.company?.details?.timezone?.db_format,
      currency: data?.company?.details?.currency,
      date_formate: data?.company?.details?.date_format,
      week_start_day: data?.company?.details?.week_start_day,
      contact_term_singular: data?.company?.details?.contact_term_singular,
      contact_term_plural: data?.company?.details?.contact_term_plural,
      class_term_singular: data?.company?.details?.class_term_singular,
      class_term_plural: data?.company?.details?.class_term_plural,
      employee_term_singular: data?.company?.details?.employee_term_singular,
      employee_term_plural: data?.company?.details?.employee_term_plural,
      class_teacher_singular: data?.company?.details?.class_teacher_singular,
      tax_name: data?.company?.details?.tax_name,
      secure_medical_forms: data?.company?.details?.secure_medical_forms,
      disable_prescriptions: data?.company?.details?.disable_prescriptions,
      is_surgical: data?.company?.details?.is_surgical,
      medical_approvals: data?.company?.details?.medical_approvals,
      cycles_display: data?.company?.details?.cycles_display,
      enable_2fa: data?.company?.details?.enable_2fa,
      enable_sens_data: data?.company?.details?.enable_sens_data,
      user_id: user,
      force_password: forcePassword,
      street: data?.company?.details?.street,
      address_suite_no: addrSuiteNo,
      post_code: data?.company?.details?.post_code,
      city: data?.company?.details?.city,
      region: data?.company?.details?.county,
      country: data?.company?.details?.country,
    }

    const {
      basicInformation,
      languageSetting,
      businessLocation,
      businessLocationData,
    } = values
    const {
      businessName,
      businessType,
      companyEmail,
      phone,
      website,
    } = basicInformation
    const {
      currency,
      dateFormat,
      defaultLanuageStaff,
      timezone,
      weekStart,
    } = languageSetting
    const { address, city, country, postcode, region, apt } = businessLocation

    CompanyDetailData.business_name = businessName
    CompanyDetailData.info_email = companyEmail
    CompanyDetailData.phone = phone
    CompanyDetailData.website = website
    CompanyDetailData.language = defaultLanuageStaff
    CompanyDetailData.timezone = timezone
    CompanyDetailData.currency = currency
    CompanyDetailData.date_formate = dateFormat
    CompanyDetailData.week_start_day = weekStart
    CompanyDetailData.industry_sector = businessType
    CompanyDetailData.street = address
    CompanyDetailData.post_code = postcode
    CompanyDetailData.city = city
    CompanyDetailData.region = region
    CompanyDetailData.country = country

    const CompanyMeta = [
      {
        meta_name: 'address_suite_no',
        meta_value: apt,
      },
      {
        meta_name: 'business_location',
        meta_value: businessLocationData,
      },
    ]

    try {
      await updateBusinessDetails({
        variables: CompanyDetailData,
        optimisticResponse: {},
        refetchQueries: [
          {
            query: GetBussinessDetailsDocument,
          },
        ],
      })
      await updateCompanyMeta({
        variables: {
          company_meta: CompanyMeta,
        },
        optimisticResponse: {},
        refetchQueries: [
          {
            query: GetBussinessDetailsDocument,
          },
        ],
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <BusinessDetails
      apiKey={process.env.google_api_key}
      basicInformation={basicInformation}
      languageSetting={languageSetting}
      businessLocation={location}
      loading={loading}
      onSave={(val) => handleSaveDetail(val)}
      buttonClicked={buttonClicked}
    />
  )
}

export default BusinessDetailTab
