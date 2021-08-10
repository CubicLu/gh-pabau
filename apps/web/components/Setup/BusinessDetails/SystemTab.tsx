import React, { FC, useState } from 'react'
import { Notification, NotificationType, System } from '@pabau/ui'
import {
  GetBussinessDetailsQuery,
  GetBussinessDetailsDocument,
  useUpdateCompanyDetailsMutation,
  useSetMultipleMetaDataMutation,
} from '@pabau/graphql'
import { TFunction } from 'react-i18next'

interface SystemTabProps {
  data: GetBussinessDetailsQuery
  addrSuiteNo: string
  enableLab: string
  historyData: string
  timeFormat: string
  forcePassword: number
  user: number
  loading?: boolean
  t: TFunction<'common'>
}

export const SystemTab: FC<SystemTabProps> = ({
  data,
  addrSuiteNo,
  forcePassword,
  enableLab,
  user,
  historyData,
  timeFormat,
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

  const systemConfig = {
    tretmentCycles:
      data?.company?.details?.cycles_display === 0
        ? 'Display in calendar only when an open cycle exists'
        : 'Always display',
    secureMedicalForms:
      data?.company?.details?.secure_medical_forms === 0 ? false : true,
    disablePrescriptions:
      data?.company?.details?.disable_prescriptions === 0 ? false : true,
    performSurgical: data?.company?.details?.is_surgical === 0 ? false : true,
    medicalApprovals:
      data?.company?.details?.medical_approvals === 0 ? false : true,
    historyData: historyData === '0' ? false : true,
    enableLabs: enableLab === '0' ? false : true,
    timeFormat: timeFormat,
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
      disablePrescriptions,
      medicalApprovals,
      performSurgical,
      secureMedicalForms,
      historyData,
      timeFormat,
      tretmentCycles,
      enableLabs,
    } = values

    CompanyDetailData.disable_prescriptions =
      disablePrescriptions === false ? 0 : 1
    CompanyDetailData.medical_approvals = medicalApprovals === false ? 0 : 1
    CompanyDetailData.is_surgical = performSurgical === false ? 0 : 1
    CompanyDetailData.secure_medical_forms =
      secureMedicalForms === false ? 0 : 1
    CompanyDetailData.cycles_display =
      tretmentCycles === 'Always display' ? 1 : 0
    const CompanyMeta = [
      {
        meta_name: 'history_data',
        meta_value: historyData === false ? '0' : '1',
      },
      {
        meta_name: 'time_format',
        meta_value:
          timeFormat === '12 hours (e.g. 9:00pm)'
            ? '12 hours (e.g. 9:00pm)'
            : '24 hours (e.g. 21:00)',
      },
      {
        meta_name: 'lab_enabled',
        meta_value: enableLabs === false ? '0' : '1',
      },
    ]

    try {
      await updateBusinessDetails({
        variables: CompanyDetailData,
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
    <System
      config={systemConfig}
      onSave={(val) => handleSaveDetail(val)}
      loading={loading}
      buttonClicked={buttonClicked}
    />
  )
}

export default SystemTab
