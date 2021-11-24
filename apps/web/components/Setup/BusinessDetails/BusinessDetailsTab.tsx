import React, { FC, useState, useEffect } from 'react'
import {
  BusinessDetails,
  BasicInformation,
  LanguageSetting,
  Notification,
  NotificationType,
  AddressDetails,
} from '@pabau/ui'
import {
  GetBusinessDetailsQuery,
  GetBusinessDetailsDocument,
  GetTimezoneListDocument,
  useUpdateCompanyDetailsMutation,
  useSetMultipleMetaDataMutation,
  useUpdateOneCompanyDetailsMutation,
} from '@pabau/graphql'
import { useQuery } from '@apollo/client'
import { TFunction } from 'react-i18next'
import AvatarUploader from '../../Uploaders/AvatarUploader/AvatarUploader'
import { cdnURL } from '../../../baseUrl'
import { message } from 'antd'

interface BusinessDetailsTabProps {
  data: GetBusinessDetailsQuery
  addrSuiteNo: string
  forcePassword: number
  user: number
  location: string
  loading?: boolean
  companyLanguage?: string
  t: TFunction<'common'>
}

export const BusinessDetailTab: FC<BusinessDetailsTabProps> = ({
  data,
  addrSuiteNo,
  forcePassword,
  user,
  location,
  loading,
  companyLanguage,
  t,
}) => {
  const [updateApply, setUpdate] = useState(false)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [companyLogo, setCompanyLogo] = useState<string>()
  const [deleteLogo, setDeleteLogo] = useState(false)

  useEffect(() => {
    setCompanyLogo(
      data?.me?.Company?.details?.logo
        ? cdnURL + data?.me?.Company?.details?.logo
        : ''
    )
  }, [data])

  const showUploader = () => {
    setShowAvatarUploader(true)
  }
  const { data: timezoneList } = useQuery(GetTimezoneListDocument)

  const [updateBusinessLogo] = useUpdateOneCompanyDetailsMutation()

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
    businessName: data?.me?.Company?.details?.company_name,
    companyEmail: data?.me?.Company?.details?.info_email,
    phone: data?.me?.Company?.details?.phone,
    website: data?.me?.Company?.details?.website,
    logo: cdnURL + data?.me?.Company?.details?.logo,
    businessType: data?.me?.Company?.details?.industry_sector,
  }

  const languageSetting: LanguageSetting = {
    defaultLanuageStaff: companyLanguage,
    defaultLanuageClients: companyLanguage,
    timezone: data?.me?.Company?.details?.timezone?.php_format,
    currency: data?.me?.Company?.details?.currency,
    dateFormat: data?.me?.Company?.details?.date_format,
    weekStart: data?.me?.Company?.details?.week_start_day,
  }

  const AddressDetails: AddressDetails = {
    FullAddress: location ?? '',
    address: data?.me?.Company?.details?.street ?? '',
    apt: data && addrSuiteNo,
    postcode: data?.me?.Company?.details?.post_code ?? '',
    city: data?.me?.Company?.details?.city ?? '',
    region: data?.me?.Company?.details?.county ?? '',
    country: data?.me?.Company?.details?.country ?? '',
  }

  const handleLogoUpload = (imageData) => {
    if (!deleteLogo) {
      try {
        updateBusinessLogo({
          variables: {
            data: {
              logo: {
                set: imageData.path,
              },
            },
            where: {
              details_id: data?.me?.Company?.details?.details_id,
            },
          },
        })
        setCompanyLogo(cdnURL + imageData.path)
        message.success(t('setup.business-details.update.success'))
      } catch (error) {
        message.error(t('setup.business-details.update.error'))
        throw new Error(error)
      }
    }
    if (deleteLogo) {
      onDeleteImage()
    }
  }

  const onDeleteImage = () => {
    try {
      updateBusinessLogo({
        variables: {
          data: {
            logo: {
              set: '',
            },
          },
          where: {
            details_id: data?.me?.Company?.details?.details_id,
          },
        },
      })
      setCompanyLogo('')
      message.success(t('setup.business-details.update.success'))
    } catch (error) {
      message.error(t('setup.business-details.update.error'))
      throw new Error(error)
    }
  }

  const handleDelete = () => {
    setDeleteLogo(true)
  }

  const handleSaveDetail = async (values) => {
    setButtonClicked(true)
    setUpdate(false)

    const CompanyDetailData = {
      details_id: data?.me?.Company?.details?.details_id,
      business_name: data?.me?.Company?.details?.company_name,
      info_email: data?.me?.Company?.details?.info_email,
      phone: data?.me?.Company?.details?.phone,
      website: data?.me?.Company?.details?.website,
      logo: data?.me?.Company?.details?.logo,
      industry_sector: data?.me?.Company?.details?.industry_sector,
      timezone: data?.me?.Company?.details?.timezone?.php_format,
      timezone_label: data?.me?.Company?.details?.timezone?.label,
      currency: data?.me?.Company?.details?.currency,
      date_formate: data?.me?.Company?.details?.date_format,
      week_start_day: data?.me?.Company?.details?.week_start_day,
      contact_term_singular: data?.me?.Company?.details?.contact_term_singular,
      contact_term_plural: data?.me?.Company?.details?.contact_term_plural,
      class_term_singular: data?.me?.Company?.details?.class_term_singular,
      class_term_plural: data?.me?.Company?.details?.class_term_plural,
      employee_term_singular:
        data?.me?.Company?.details?.employee_term_singular,
      employee_term_plural: data?.me?.Company?.details?.employee_term_plural,
      class_teacher_singular:
        data?.me?.Company?.details?.class_teacher_singular,
      secure_medical_forms: data?.me?.Company?.details?.secure_medical_forms,
      disable_prescriptions: data?.me?.Company?.details?.disable_prescriptions,
      is_surgical: data?.me?.Company?.details?.is_surgical,
      medical_approvals: data?.me?.Company?.details?.medical_approvals,
      cycles_display: data?.me?.Company?.details?.cycles_display,
      enable_2fa: data?.me?.Company?.details?.enable_2fa,
      enable_sens_data: data?.me?.Company?.details?.enable_sens_data,
      user_id: user,
      force_password: forcePassword,
      street: data?.me?.Company?.details?.street,
      address_suite_no: addrSuiteNo,
      post_code: data?.me?.Company?.details?.post_code,
      city: data?.me?.Company?.details?.city,
      region: data?.me?.Company?.details?.county,
      country: data?.me?.Company?.details?.country,
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
      logo,
    } = basicInformation
    const {
      currency,
      dateFormat,
      defaultLanuageStaff,
      timezone,
      weekStart,
      timeZoneLabel,
    } = languageSetting
    const { address, city, country, postcode, region, apt } = businessLocation

    CompanyDetailData.business_name = businessName
    CompanyDetailData.info_email = companyEmail
    CompanyDetailData.phone = phone
    CompanyDetailData.website = website
    CompanyDetailData.logo = logo
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
    CompanyDetailData.timezone_label = timeZoneLabel

    const CompanyMeta = [
      {
        meta_name: 'address_suite_no',
        meta_value: apt,
      },
      {
        meta_name: 'business_location',
        meta_value: businessLocationData,
      },
      {
        meta_name: 'company_language',
        meta_value: defaultLanuageStaff,
      },
    ]

    try {
      await updateBusinessDetails({
        variables: CompanyDetailData,
        refetchQueries: [
          {
            query: GetBusinessDetailsDocument,
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
            query: GetBusinessDetailsDocument,
          },
        ],
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div>
      <BusinessDetails
        apiKey={process.env.google_api_key}
        basicInformation={basicInformation}
        languageSetting={languageSetting}
        businessLocation={location}
        loading={loading}
        onSave={(val) => handleSaveDetail(val)}
        buttonClicked={buttonClicked}
        showUploader={showUploader}
        onDelete={onDeleteImage}
        companyLogo={companyLogo}
        AddressDetails={data && AddressDetails}
        timezoneList={timezoneList?.findManyTimezone ?? []}
      />
      {showAvatarUploader && (
        <AvatarUploader
          visible={showAvatarUploader}
          title={t('setup.business-details.uploadlogo')}
          imageURL={companyLogo}
          onCancel={() => setShowAvatarUploader(false)}
          onDelete={handleDelete}
          shape={'rectangle'}
          width={400}
          height={200}
          section={'avatar_photos'}
          type={'file_attachments'}
          successHandler={(val) => {
            setDeleteLogo(false)
            handleLogoUpload(val)
          }}
        />
      )}
    </div>
  )
}

export default BusinessDetailTab
