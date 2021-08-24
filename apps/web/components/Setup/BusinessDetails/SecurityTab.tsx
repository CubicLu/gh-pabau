import {
  Security,
  PasswordExpirationProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import React, { FC, useState } from 'react'
import {
  GetBussinessDetailsDocument,
  useUpdateCompanyDetailsMutation,
  useSetMultipleMetaDataMutation,
  GetBussinessDetailsQuery,
} from '@pabau/graphql'
import { TFunction } from 'react-i18next'

interface SecurityTabProps {
  data: GetBussinessDetailsQuery
  user: number
  forcePassword: number
  addrSuiteNo: string
  passwordExpiration: string
  securityData: PasswordExpirationProps
  loading?: boolean
  t: TFunction<'common'>
}
export const SecurityTab: FC<SecurityTabProps> = ({
  data,
  user,
  forcePassword,
  addrSuiteNo,
  passwordExpiration,
  securityData,
  loading,
  t,
}) => {
  const [updateApply, setUpdate] = useState(false)
  const [type, setType] = useState('')
  const [securityModelType, setSecurityModelType] = useState(0)
  const [updateBusinessDetails] = useUpdateCompanyDetailsMutation({
    onCompleted() {
      if (type === 'business' || type === 'terminology' || type === 'system')
        setUpdate(true)

      if (
        type === 'security' &&
        (securityModelType === 1 || securityModelType === 3)
      ) {
        Notification(
          NotificationType.success,
          t('notification.type.success.message')
        )
      }
      if (type === 'forceResetPassword') {
        Notification(
          NotificationType.success,
          t('notification.type.success.message')
        )
      }
    },
    onError() {
      if (type === 'business' || type === 'terminology' || type === 'system')
        setUpdate(false)
      if (
        type === 'security' &&
        (securityModelType === 1 || securityModelType === 3)
      ) {
        Notification(
          NotificationType.error,
          t('notification.type.error.message.text')
        )
      }
      if (type === 'forceResetPassword') {
        Notification(
          NotificationType.error,
          t('notification.type.error.message.text')
        )
      }
    },
  })
  const [updateCompanyMeta] = useSetMultipleMetaDataMutation({
    onCompleted() {
      if (
        (type === 'business' || type === 'terminology' || type === 'system') &&
        updateApply === true
      ) {
        Notification(
          NotificationType.success,
          t('notification.type.success.message')
        )
      }
      if (type === 'security' && securityModelType === 2) {
        Notification(
          NotificationType.success,
          t('notification.type.success.message')
        )
      }
    },
    onError() {
      if (
        (type === 'business' || type === 'terminology' || type === 'system') &&
        updateApply === false
      ) {
        Notification(
          NotificationType.error,
          t('notification.type.error.message.text')
        )
      }
      if (type === 'security' && securityModelType === 2) {
        Notification(
          NotificationType.error,
          t('notification.type.error.message.text')
        )
      }
    },
  })
  const onSave = async (values, type) => {
    setType(type)
    setUpdate(false)
    if (type === 'security') setSecurityModelType(values.modalType)
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

    switch (type) {
      case 'security':
        if (values.modalType === 1) {
          CompanyDetailData.enable_2fa = values.isActive === false ? 0 : 1
          CompanyDetailData.enable_sens_data =
            data?.company?.details?.enable_sens_data
        }
        if (values.modalType === 3) {
          CompanyDetailData.enable_2fa = data?.company?.details?.enable_2fa
          CompanyDetailData.enable_sens_data = values.isActive === false ? 0 : 1
        }

        if (values.modalType === 2) {
          const CompanyMeta = [
            {
              meta_name: 'password_expire',
              meta_value: values.password_expire ?? '',
            },
            {
              meta_name: 'login_attempts',
              meta_value: values.login_attempts ?? '',
            },
            {
              meta_name: 'password_enforce_history',
              meta_value: values.password_enforce_history ?? '',
            },
            {
              meta_name: 'lockout_period',
              meta_value: values.lockout_period ?? '',
            },
          ]

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
        }
        if (values.modalType === 1 || values.modalType === 3) {
          try {
            updateBusinessDetails({
              variables: CompanyDetailData,
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
        break
      case 'forceResetPassword':
        CompanyDetailData.force_password = values

        try {
          await updateBusinessDetails({
            variables: CompanyDetailData,
            refetchQueries: [
              {
                query: GetBussinessDetailsDocument,
              },
            ],
          })
        } catch (error) {
          throw new Error(error)
        }
        break
      default: {
        break
      }
    }
  }

  const handleSecurityChange = (value) => {
    onSave(value, 'security')
  }

  const handleForceReset = (value) => {
    onSave(value, 'forceResetPassword')
  }
  return (
    <Security
      twoFAstatus={data?.company?.details?.enable_2fa}
      onOk={handleSecurityChange}
      enableSensData={data?.company?.details?.enable_sens_data}
      config={securityData}
      passwordExpiration={passwordExpiration}
      onForceResetPassword={handleForceReset}
      loading={loading}
    />
  )
}

export default SecurityTab
