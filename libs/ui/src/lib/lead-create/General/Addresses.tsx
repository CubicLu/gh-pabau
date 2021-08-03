import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { FieldSetting } from '@pabau/ui'
import { Form as AntForm, Input } from 'formik-antd'
import { useTranslation } from 'react-i18next'
import { Skeleton } from 'antd'

interface Props {
  fieldsSettings?: FieldSetting[]
  isFieldSettingLoading?: boolean
  requiredLabel: (name: string) => string
}

export const Addresses: FC<Props> = ({
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
    <div className={styles.addressForm}>
      <h5>{t('quickCreate.client.modal.general.addresses')}</h5>
      <AntForm
        className={styles.addressFormLayout}
        layout={'vertical'}
        requiredMark={false}
      >
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'MailingStreet'
          ) && (
            <AntForm.Item
              label={`${
                fieldsSettings.find(
                  (thread) => thread.field_name === 'MailingStreet'
                )?.field_label ||
                t('quickCreate.client.modal.general.addresses.label')
              }${requiredLabel('MailingStreet')}`}
              name={'MailingStreet'}
            >
              <Input name={'MailingStreet'} />
            </AntForm.Item>
          )
        )}
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'MailingProvince'
          ) && (
            <AntForm.Item
              label={`${
                fieldsSettings.find(
                  (thread) => thread.field_name === 'MailingProvince'
                )?.field_label ||
                t('quickCreate.client.modal.general.address.two.label')
              }${requiredLabel('MailingProvince')}`}
              name={'MailingProvince'}
            >
              <Input name={'MailingProvince'} />
            </AntForm.Item>
          )
        )}
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'MailingCity'
          ) && (
            <AntForm.Item
              label={`${
                fieldsSettings.find(
                  (thread) => thread.field_name === 'MailingCity'
                )?.field_label ||
                t('quickCreate.client.modal.general.addresses.city')
              }${requiredLabel('MailingCity')}`}
              name={'MailingCity'}
            >
              <Input name={'MailingCity'} />
            </AntForm.Item>
          )
        )}
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'MailingCountry'
          ) && (
            <AntForm.Item
              label={`${
                fieldsSettings.find(
                  (thread) => thread.field_name === 'MailingCountry'
                )?.field_label ||
                t('quickCreate.client.modal.general.addresses.country')
              }${requiredLabel('MailingCountry')}`}
              name={'MailingCountry'}
            >
              <Input name={'MailingCountry'} />
            </AntForm.Item>
          )
        )}
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'MailingPostal'
          ) && (
            <AntForm.Item
              label={`${
                fieldsSettings.find(
                  (thread) => thread.field_name === 'MailingPostal'
                )?.field_label ||
                t('quickCreate.client.modal.general.addresses.postcode')
              }${requiredLabel('MailingPostal')}
              `}
              name={'MailingPostal'}
            >
              <Input name={'MailingPostal'} />
            </AntForm.Item>
          )
        )}
      </AntForm>
    </div>
  )
}

export default Addresses
