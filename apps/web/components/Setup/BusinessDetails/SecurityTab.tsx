import {
  Security,
  PasswordExpirationProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import React, { FC, useState } from 'react'
import {
  GetBusinessDetailsDocument,
  useUpdateCompanyDetailsMutation,
  useSetMultipleMetaDataMutation,
  GetBusinessDetailsQuery,
} from '@pabau/graphql'
import { TFunction } from 'react-i18next'

interface SecurityTabProps {
  data: GetBusinessDetailsQuery
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
      details_id: data?.me?.Company?.details?.details_id,
      business_name: data?.me?.Company?.details?.company_name,
      info_email: data?.me?.Company?.details?.info_email,
      phone: data?.me?.Company?.details?.phone,
      website: data?.me?.Company?.details?.website,
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

    switch (type) {
      case 'security':
        if (values.modalType === 1) {
          CompanyDetailData.enable_2fa = values.isActive === false ? 0 : 1
          CompanyDetailData.enable_sens_data =
            data?.me?.Company?.details?.enable_sens_data
        }
        if (values.modalType === 3) {
          CompanyDetailData.enable_2fa = data?.me?.Company?.details?.enable_2fa
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
                query: GetBusinessDetailsDocument,
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
                  query: GetBusinessDetailsDocument,
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
                query: GetBusinessDetailsDocument,
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
      twoFAstatus={data?.me?.Company?.details?.enable_2fa}
      onOk={handleSecurityChange}
      enableSensData={data?.me?.Company?.details?.enable_sens_data}
      config={securityData}
      passwordExpiration={passwordExpiration}
      onForceResetPassword={handleForceReset}
      loading={loading}
    />
  )
}

export default SecurityTab
