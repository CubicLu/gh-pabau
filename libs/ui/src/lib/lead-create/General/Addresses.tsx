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

  const getLabel = (label) => {
    return fieldsSettings?.find((thread) => thread.field_name === label)
      ?.field_label
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
                getLabel('MailingStreet') ||
                t('quickCreate.client.modal.general.addresses.label')
              }${requiredLabel('MailingStreet')}`}
              name={'MailingStreet'}
            >
              <Input
                name={'MailingStreet'}
                placeholder={t('common-label-enter', {
                  what: getLabel('MailingStreet')
                    ? getLabel('MailingStreet')?.toLowerCase()
                    : t(
                        'quickCreate.client.modal.general.addresses.label'
                      ).toLowerCase(),
                })}
              />
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
                getLabel('MailingProvince') ||
                t('quickCreate.client.modal.general.address.two.label')
              }${requiredLabel('MailingProvince')}`}
              name={'MailingProvince'}
            >
              <Input
                name={'MailingProvince'}
                placeholder={t('common-label-enter', {
                  what: getLabel('MailingProvince')
                    ? getLabel('MailingProvince')?.toLowerCase()
                    : t(
                        'quickCreate.client.modal.general.address.two.label'
                      ).toLowerCase(),
                })}
              />
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
                getLabel('MailingCity') ||
                t('quickCreate.client.modal.general.addresses.city')
              }${requiredLabel('MailingCity')}`}
              name={'MailingCity'}
            >
              <Input
                name={'MailingCity'}
                placeholder={t('common-label-enter', {
                  what: getLabel('MailingCity')
                    ? getLabel('MailingCity')?.toLowerCase()
                    : t(
                        'quickCreate.client.modal.general.addresses.city'
                      ).toLowerCase(),
                })}
              />
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
                getLabel('MailingCountry') ||
                t('quickCreate.client.modal.general.addresses.country')
              }${requiredLabel('MailingCountry')}`}
              name={'MailingCountry'}
            >
              <Input
                name={'MailingCountry'}
                placeholder={t('common-label-enter', {
                  what: getLabel('MailingCountry')
                    ? getLabel('MailingCountry')?.toLowerCase()
                    : t(
                        'quickCreate.client.modal.general.addresses.country'
                      ).toLowerCase(),
                })}
              />
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
                getLabel('MailingPostal') ||
                t('quickCreate.client.modal.general.addresses.postcode')
              }${requiredLabel('MailingPostal')}
              `}
              name={'MailingPostal'}
            >
              <Input
                name={'MailingPostal'}
                placeholder={t('common-label-enter', {
                  what: getLabel('MailingPostal')
                    ? getLabel('MailingPostal')?.toLowerCase()
                    : t(
                        'quickCreate.client.modal.general.addresses.postcode'
                      ).toLowerCase(),
                })}
              />
            </AntForm.Item>
          )
        )}
      </AntForm>
    </div>
  )
}

export default Addresses
