import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps, FieldSetting } from '@pabau/ui'
import { Form as AntForm, Input } from 'formik-antd'
import { PhoneNumberInput } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { Skeleton } from 'antd'

interface GeneralProps {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
  fieldsSettings?: FieldSetting[]
  isFieldSettingLoading?: boolean
  requiredLabel: (name: string) => string
}

export const ContactInfo: FC<GeneralProps> = ({
  setFieldValue,
  values,
  fieldsSettings,
  isFieldSettingLoading,
  requiredLabel,
}) => {
  const { t } = useTranslation('common')

  const SkeletonContent = () => {
    return (
      <div className={styles.skeletonWrapper}>
        <Skeleton
          className={styles.skeletonName}
          paragraph={false}
          round
          active
        />
        <Skeleton className={styles.skeletonInput} paragraph={false} active />
      </div>
    )
  }

  return (
    <div className={styles.contactInfo}>
      <h5>{t('quickCreate.client.modal.general.contactInfo')}</h5>
      <AntForm
        className={styles.contactForm}
        layout={'vertical'}
        requiredMark={false}
      >
        <AntForm.Item
          label={`${
            fieldsSettings?.find((thread) => thread.field_name === 'Email')
              ?.field_label || t('quickCreate.client.modal.general.email')
          }${requiredLabel('Email')}`}
          name={'Email'}
        >
          <Input
            name={'Email'}
            placeholder={t(
              'quickCreate.client.modal.general.email.placeHolder'
            )}
          />
        </AntForm.Item>
        <AntForm.Item name={'Mobile'}>
          <PhoneNumberInput
            label={`${
              fieldsSettings?.find((thread) => thread.field_name === 'Mobile')
                ?.field_label ||
              t('quickCreate.client.modal.general.mobilePhone')
            }${requiredLabel('Mobile')}`}
            value={values?.Mobile}
            onChange={(value) => setFieldValue('Mobile', value)}
            showValidErrorMessage={false}
            placeholder={t('common-label-enter', {
              what:
                fieldsSettings?.find((thread) => thread.field_name === 'Mobile')
                  ?.field_label ||
                t('quickCreate.client.modal.general.mobilePhone').toLowerCase(),
            })}
          />
        </AntForm.Item>
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find((thread) => thread.field_name === 'Phone') && (
            <AntForm.Item
              label={`${
                fieldsSettings?.find((thread) => thread.field_name === 'Phone')
                  ?.field_label ||
                t('quickCreate.client.modal.general.telephone')
              }${requiredLabel('Phone')}`}
              name={'Phone'}
            >
              <Input name={'Phone'} placeholder={'+ _ ___ _____'} />
            </AntForm.Item>
          )
        )}
      </AntForm>
    </div>
  )
}

export default ContactInfo
