import React, { FC, useState } from 'react'
import styles from '../ClientCreate.module.less'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import GeneralComponent from './General'
import ContactInfo from './ContactInfo'
import { Subscriptions } from './Subscriptions'
import Addresses from './Addresses'
import CustomField from './CustomField'
import { useTranslation } from 'react-i18next'
import { Form as AntForm, Switch } from 'formik-antd'
import {
  CustomFieldsProps,
  InitialDetailsProps,
  Label,
  LabelDataProps,
  FieldSetting,
  LimitLocation,
  OtherCompany,
} from '@pabau/ui'
import { Dayjs } from 'dayjs'

export interface CommonProps {
  id: number
  name: string
}

interface GeneralProps {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number | Dayjs | null
  ): void
  labels: Label[]
  setLabels: (val: Label[]) => void
  selectedLabels: Label[]
  setSelectedLabels: (val: Label[]) => void
  salutationData?: CommonProps[]
  customFields?: CustomFieldsProps[]
  fieldsSettings?: FieldSetting[]
  marketingSources?: CommonProps[]
  limitContactsLocations?: LimitLocation[]
  otherCompanies?: OtherCompany[]
  isLoading?: boolean
  isMarketingSourceLoading?: boolean
  labelsData: LabelDataProps[]
}

export const Index: FC<GeneralProps> = ({
  setFieldValue,
  values,
  salutationData,
  customFields,
  fieldsSettings,
  marketingSources,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  limitContactsLocations,
  otherCompanies,
  isLoading = false,
  labelsData,
  isMarketingSourceLoading,
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
          field.field_name === 'MailingPostal' ||
          field.field_name === 'secondary_address'
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
        salutationData={salutationData}
        marketingSources={marketingSources}
        fieldsSettings={fieldsSettings}
        labels={labels}
        setLabels={setLabels}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
        isLoading={isLoading}
        labelsData={labelsData}
        isMarketingSourceLoading={isMarketingSourceLoading}
      />
      {fieldsSettings && (
        <ContactInfo
          values={values}
          fieldsSettings={fieldsSettings}
          setFieldValue={setFieldValue}
        />
      )}
      {fieldsSettings?.find((thread) => thread.field_name === 'opt_in') && (
        <Subscriptions />
      )}
      {(isAddress() ||
        (limitContactsLocations && limitContactsLocations.length > 0) ||
        (otherCompanies && otherCompanies.length > 0) ||
        (customFields && customFields.length > 0)) && (
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
          {isAddress() && fieldsSettings && (
            <Addresses fieldsSettings={fieldsSettings} />
          )}
          {limitContactsLocations && limitContactsLocations?.length > 0 && (
            <AntForm
              className={styles.subscriptionForm}
              layout={'vertical'}
              requiredMark={false}
            >
              <h5>Available in locations</h5>
              {limitContactsLocations.map((item) => (
                <AntForm.Item
                  name={`limitContactsLocations_${item.id}`}
                  key={item.id}
                >
                  <div className={styles.switchBtn}>
                    <Switch
                      name={`limitContactsLocations_${item.id}`}
                      defaultChecked={true}
                    />
                    <p>{item.name}</p>
                  </div>
                </AntForm.Item>
              ))}
            </AntForm>
          )}
          {otherCompanies && otherCompanies.length > 0 && (
            <AntForm
              className={styles.subscriptionForm}
              layout={'vertical'}
              requiredMark={false}
            >
              <h5>Other Companies</h5>
              {otherCompanies.map((item) => (
                <AntForm.Item
                  name={`otherCompany_${item.company_id}`}
                  key={item.company_id}
                >
                  <div className={styles.switchBtn}>
                    <Switch name={`otherCompany_${item.company_id}`} />
                    <p>{item.company_name}</p>
                  </div>
                </AntForm.Item>
              ))}
            </AntForm>
          )}
          {customFields && customFields?.length > 0 && (
            <CustomField
              customFields={customFields}
              setFieldValue={setFieldValue}
              values={values}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Index
