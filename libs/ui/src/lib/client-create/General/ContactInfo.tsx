import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Form as AntForm, Input } from 'formik-antd'
import { InitialDetailsProps, PhoneNumberInput, FieldSetting } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { Skeleton } from 'antd'

interface GeneralProps {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number
  ): void
  fieldsSettings?: FieldSetting[]
  isLoading?: boolean
  requiredLabel: (name: string) => string
}

export const ContactInfo: FC<GeneralProps> = ({
  setFieldValue,
  values,
  fieldsSettings,
  requiredLabel,
  isLoading,
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
        {isLoading ? (
          <SkeletonContent />
        ) : (
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
        )}
        {isLoading ? (
          <SkeletonContent />
        ) : (
          <AntForm.Item name={'Mobile'}>
            <PhoneNumberInput
              label={`${
                fieldsSettings?.find((thread) => thread.field_name === 'Mobile')
                  ?.field_label ||
                t('quickCreate.client.modal.general.mobilePhone')
              }${requiredLabel('Mobile')}`}
              value={values?.Mobile}
              onChange={(value) => {
                setFieldValue('Mobile', value)
              }}
              showValidErrorMessage={false}
              placeholder={t('common-label-enter', {
                what: t(
                  'quickCreate.client.modal.general.mobilePhone'
                ).toLowerCase(),
              })}
            />
          </AntForm.Item>
        )}
        {isLoading ? (
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
