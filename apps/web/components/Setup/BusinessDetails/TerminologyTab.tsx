import React, { FC, useState } from 'react'
import {
  Notification,
  NotificationType,
  TerminologyConfig,
  Terminology,
} from '@pabau/ui'
import {
  GetBusinessDetailsQuery,
  GetBusinessDetailsDocument,
  useUpdateCompanyDetailsMutation,
  useSetMultipleMetaDataMutation,
} from '@pabau/graphql'
import { TFunction } from 'react-i18next'

interface TerminologyTabProps {
  data: GetBusinessDetailsQuery
  addrSuiteNo: string
  forcePassword: number
  user: number
  opsData: TerminologyConfig[]
  loading?: boolean
  t: TFunction<'common'>
}

export const TerminologyTab: FC<TerminologyTabProps> = ({
  data,
  addrSuiteNo,
  forcePassword,
  user,
  opsData,
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

  const config = [
    {
      title: t('marketingreviews.data.config.title1'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: data?.company?.details?.contact_term_singular,
        },
        {
          key: t('business.default.config.key.plural'),
          value: data?.company?.details?.contact_term_plural,
        },
      ],
    },
    {
      title: t('marketingreviews.data.config.title2'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: data?.company?.details?.class_term_singular,
        },
        {
          key: t('business.default.config.key.plural'),
          value: data?.company?.details?.class_term_plural,
        },
      ],
    },
    {
      title: t('marketingreviews.data.config.title3'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: data?.company?.details?.employee_term_singular,
        },
        {
          key: t('business.default.config.key.plural'),
          value: data?.company?.details?.employee_term_plural,
        },
      ],
    },
    {
      title: t('marketingreviews.data.config.title4'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: data?.company?.details?.class_teacher_singular,
        },
      ],
    },
    {
      title: t('marketingreviews.data.config.title5'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: data?.company?.details?.tax_name,
        },
      ],
    },
  ]

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

    const { config, optIns } = values
    const CompanyMeta = [
      {
        meta_name: 'opt_in_postal',
        meta_value: optIns[0].items[0].value ?? '',
      },
      { meta_name: 'opt_in_sms', meta_value: optIns[0].items[1].value ?? '' },
      { meta_name: 'opt_in_email', meta_value: optIns[0].items[2].value ?? '' },
      { meta_name: 'opt_in_phone', meta_value: optIns[0].items[3].value ?? '' },
      {
        meta_name: 'opt_in_postal_lead',
        meta_value: optIns[1].items[0].value ?? '',
      },
      {
        meta_name: 'opt_in_sms_lead',
        meta_value: optIns[1].items[1].value ?? '',
      },
      {
        meta_name: 'opt_in_email_lead',
        meta_value: optIns[1].items[2].value ?? '',
      },
      {
        meta_name: 'opt_in_phone_lead',
        meta_value: optIns[1].items[3].value ?? '',
      },
    ]
    if (config) {
      CompanyDetailData.contact_term_singular = config[0].items[0].value
      CompanyDetailData.contact_term_plural = config[0].items[1].value
      CompanyDetailData.class_term_singular = config[1].items[0].value
      CompanyDetailData.class_term_plural = config[1].items[1].value
      CompanyDetailData.employee_term_singular = config[2].items[0].value
      CompanyDetailData.employee_term_plural = config[2].items[1].value
      CompanyDetailData.class_teacher_singular = config[3].items[0].value
      CompanyDetailData.tax_name = config[4].items[0].value

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
  }

  return (
    <Terminology
      config={config}
      loading={loading}
      optIns={opsData}
      onSave={(val) => handleSaveDetail(val)}
      buttonClicked={buttonClicked}
    />
  )
}

export default TerminologyTab
