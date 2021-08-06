import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Form as AntForm, Input } from 'formik-antd'
import { useTranslation } from 'react-i18next'
import { FieldSetting } from '@pabau/ui'

interface Props {
  fieldsSettings: FieldSetting[]
  requiredLabel: (name: string) => string
}

export const Addresses: FC<Props> = ({ fieldsSettings, requiredLabel }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.addressForm}>
      <h5>{t('quickCreate.client.modal.general.addresses')}</h5>
      <AntForm
        className={styles.addressFormLayout}
        layout={'vertical'}
        requiredMark={false}
      >
        {fieldsSettings.find(
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
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingProvince'
        ) && (
          <AntForm.Item
            label={`${
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingProvince'
              )?.field_label ||
              t('quickCreate.client.modal.general.county.label')
            }${requiredLabel('MailingProvince')}`}
            name={'MailingProvince'}
          >
            <Input name={'MailingProvince'} />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
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
        )}
        {fieldsSettings.find(
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
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingPostal'
        ) && (
          <AntForm.Item
            label={`${
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingPostal'
              )?.field_label ||
              t('quickCreate.client.modal.general.addresses.postcode')
            }${requiredLabel('MailingPostal')}`}
            name={'MailingPostal'}
          >
            <Input name={'MailingPostal'} />
          </AntForm.Item>
        )}
      </AntForm>
    </div>
  )
}

export default Addresses
