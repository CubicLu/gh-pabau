import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Form as AntForm, Input } from 'formik-antd'
import { useTranslation } from 'react-i18next'
import { FieldSetting } from '@pabau/ui'

interface Props {
  fieldsSettings: FieldSetting[]
}

export const Addresses: FC<Props> = ({ fieldsSettings }) => {
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
            label={
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingStreet'
              )?.field_label
            }
            name={'MailingStreet'}
          >
            <Input name={'MailingStreet'} />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingProvince'
        ) && (
          <AntForm.Item
            label={
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingProvince'
              )?.field_label
            }
            name={'MailingProvince'}
          >
            <Input name={'MailingProvince'} />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingCity'
        ) && (
          <AntForm.Item
            label={
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingCity'
              )?.field_label
            }
            name={'MailingCity'}
          >
            <Input name={'MailingCity'} />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingCountry'
        ) && (
          <AntForm.Item
            label={
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingCountry'
              )?.field_label
            }
            name={'MailingCountry'}
          >
            <Input name={'MailingCountry'} />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingPostal'
        ) && (
          <AntForm.Item
            label={
              fieldsSettings.find(
                (thread) => thread.field_name === 'MailingPostal'
              )?.field_label
            }
            name={'MailingPostal'}
          >
            <Input name={'MailingPostal'} />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'secondary_address'
        ) && (
          <>
            <AntForm.Item label={'Other Street'} name={'OtherStreet'}>
              <Input name={'OtherStreet'} />
            </AntForm.Item>
            <AntForm.Item label={'Other Country'} name={'OtherProvince'}>
              <Input name={'OtherProvince'} />
            </AntForm.Item>
            <AntForm.Item label={'Other City / Town'} name={'OtherCity'}>
              <Input name={'OtherCity'} />
            </AntForm.Item>
            <AntForm.Item label={'Other Country'} name={'OtherCountry'}>
              <Input name={'OtherCountry'} />
            </AntForm.Item>
            <AntForm.Item label={'Other Post Code'} name={'OtherPostal'}>
              <Input name={'OtherPostal'} />
            </AntForm.Item>
          </>
        )}
      </AntForm>
    </div>
  )
}

export default Addresses
