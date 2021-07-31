import React, { FC, useState } from 'react'
import styles from '../LeadCreate.module.less'
import {
  CustomFieldsProps,
  FieldSetting,
  InitialDetailsDataProps,
  LeadStatusProps,
  LocationProps,
} from '@pabau/ui'
import GeneralComponent from './General'
import ContactInfo from './ContactInfo'
import Subscriptions from './Subscriptions'
import Addresses from './Addresses'
import { useTranslation } from 'react-i18next'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import CustomField from '../../client-create/General/CustomField'
import { CommonProps } from '../../client-create/General'

interface GeneralProps {
  key?: string
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
  fieldsSettings?: FieldSetting[]
  salutationData?: CommonProps[]
  marketingSources?: CommonProps[]
  leadStatusData?: LeadStatusProps[]
  locationData?: LocationProps[]
  customFields?: CustomFieldsProps[]
  isFieldSettingLoading?: boolean
  isMarketingSourceLoading?: boolean
  isLocationLoading?: boolean
  isLeadStatusLoading?: boolean
}

export const Index: FC<GeneralProps> = ({
  setFieldValue,
  values,
  fieldsSettings,
  customFields,
  isFieldSettingLoading,
  ...props
}) => {
  const [moreVisible, setMoreVisible] = useState(false)

  const { t } = useTranslation('common')

  const toggleMore = () => {
    setMoreVisible(!moreVisible)
  }

  const isAddress = () => {
    if (fieldsSettings && fieldsSettings?.length > 0) {
      for (const field of fieldsSettings) {
        if (
          field.field_name === 'MailingStreet' ||
          field.field_name === 'MailingProvince' ||
          field.field_name === 'MailingCity' ||
          field.field_name === 'MailingCountry' ||
          field.field_name === 'MailingPostal'
        ) {
          return true
        }
      }
    }
    return false
  }

  return (
    <div className={styles.mainDiv}>
      <GeneralComponent
        values={values}
        setFieldValue={setFieldValue}
        fieldsSettings={fieldsSettings}
        isFieldSettingLoading={isFieldSettingLoading}
        {...props}
      />
      <ContactInfo
        values={values}
        setFieldValue={setFieldValue}
        fieldsSettings={fieldsSettings}
        isFieldSettingLoading={isFieldSettingLoading}
      />
      {(isAddress() ||
        (customFields && customFields.length > 0) ||
        fieldsSettings?.find((thread) => thread.field_name === 'opt_in')) && (
        <div
          className={`${styles.moreBtn} ${!moreVisible && styles.paddingAtEnd}`}
          onClick={toggleMore}
        >
          {moreVisible ? <UpOutlined /> : <DownOutlined />}
          <p> {t('quickCreate.client.modal.more')}</p>
        </div>
      )}

      {moreVisible && (
        <div className={styles.paddingAtEnd}>
          {fieldsSettings?.find((thread) => thread.field_name === 'opt_in') && (
            <Subscriptions values={values} setFieldValue={setFieldValue} />
          )}
          {isAddress() && (
            <Addresses
              values={values}
              setFieldValue={setFieldValue}
              fieldsSettings={fieldsSettings}
              isFieldSettingLoading={isFieldSettingLoading}
            />
          )}
          <CustomField
            values={values}
            setFieldValue={setFieldValue}
            customFields={customFields}
          />
        </div>
      )}
    </div>
  )
}

export default Index
