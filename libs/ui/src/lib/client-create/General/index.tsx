import React, { FC, useState } from 'react'
import styles from '../ClientCreate.module.less'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import GeneralComponent from './General'
import ContactInfo from './ContactInfo'
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
  isLoading = false,
  labelsData,
  isMarketingSourceLoading,
}) => {
  const [moreVisible, setMoreVisible] = useState(true)

  const { t } = useTranslation('common')

  const toggleMore = () => {
    setMoreVisible(!moreVisible)
  }

  const isAddress = () => {
    if (fieldsSettings && fieldsSettings?.length > 0 && !isLoading) {
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

  const requiredLabel = (name: string) => {
    return fieldsSettings?.find((thread) => thread.field_name === name)
      ?.is_required === 1
      ? ` (${t('quickcreate.required.label')})`
      : ''
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
        requiredLabel={requiredLabel}
      />
      <ContactInfo
        values={values}
        fieldsSettings={fieldsSettings}
        setFieldValue={setFieldValue}
        requiredLabel={requiredLabel}
        isLoading={isLoading}
      />
      {(isAddress() ||
        (limitContactsLocations && limitContactsLocations.length > 0) ||
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
            <Addresses
              fieldsSettings={fieldsSettings}
              requiredLabel={requiredLabel}
            />
          )}
          {!isLoading &&
            limitContactsLocations &&
            limitContactsLocations?.length > 0 && (
              <AntForm
                className={styles.subscriptionForm}
                layout={'vertical'}
                requiredMark={false}
              >
                <h5>{t('quickCreate.client.modal.general.location.title')}</h5>
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
          {!isLoading && customFields && customFields?.length > 0 && (
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
