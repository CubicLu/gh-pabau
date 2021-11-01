import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import {
  FieldSetting,
  InitialDetailsDataProps,
  LeadStatusProps,
  LocationProps,
  DatePicker,
} from '@pabau/ui'
import { Form as AntForm, Input, Select } from 'formik-antd'
import className from 'classnames'
import { SliderCustom } from '@pabau/ui'
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import { CommonProps } from '../../client-create/General'
import dayjs, { Dayjs } from 'dayjs'

const { TextArea } = Input

interface GeneralProps {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number | Dayjs | null
  ): void
  fieldsSettings?: FieldSetting[]
  salutationData?: CommonProps[]
  marketingSources?: CommonProps[]
  leadStatusData?: LeadStatusProps[]
  locationData?: LocationProps[]
  isFieldSettingLoading?: boolean
  isMarketingSourceLoading?: boolean
  isLocationLoading?: boolean
  isLeadStatusLoading?: boolean
  isSalutationLoading?: boolean
  requiredLabel: (name: string) => string
}

export const General: FC<GeneralProps> = ({
  setFieldValue,
  values,
  fieldsSettings,
  salutationData,
  marketingSources,
  leadStatusData,
  locationData,
  isFieldSettingLoading,
  isMarketingSourceLoading,
  isLocationLoading,
  isLeadStatusLoading,
  isSalutationLoading,
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
    <div className={styles.generalDiv}>
      <h5>{t('quickCreate.client.modal.general')}</h5>
      <AntForm layout={'vertical'} requiredMark={false}>
        <div className={styles.wrapNameInfo}>
          <div className={styles.salutation}>
            <AntForm.Item
              label={`${
                fieldsSettings?.find(
                  (thread) => thread.field_name === 'Salutation'
                )?.field_label ||
                t('quickCreate.client.modal.general.salutation')
              }${requiredLabel('Salutation')}`}
              name={'Salutation'}
            >
              {!isSalutationLoading ? (
                <Select
                  name={'Salutation'}
                  placeholder={t(
                    'quickCreate.client.modal.general.salutation.placeholder'
                  )}
                >
                  {salutationData?.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <div className={styles.skeletonWrapper}>
                  <Skeleton
                    className={className(
                      styles.salutationSkeleton,
                      styles.skeletonInput
                    )}
                    paragraph={false}
                    active
                  />
                </div>
              )}
            </AntForm.Item>
          </div>
          <div className={styles.firstName}>
            <AntForm.Item
              label={`${
                fieldsSettings?.find((thread) => thread.field_name === 'Fname')
                  ?.field_label ||
                t('quickCreate.client.modal.general.firstName')
              } (${t('quickcreate.required.label')})`}
              name={'firstName'}
            >
              <Input
                size="middle"
                name={'firstName'}
                placeholder={t(
                  'quickCreate.client.modal.general.firstName.placeHolder'
                )}
              />
            </AntForm.Item>
          </div>
          <div className={styles.lastName}>
            <AntForm.Item
              label={`${
                fieldsSettings?.find((thread) => thread.field_name === 'Lname')
                  ?.field_label ||
                t('quickCreate.client.modal.general.lastName')
              } (${t('quickcreate.required.label')})`}
              name={'lastName'}
            >
              <Input
                size="middle"
                name={'lastName'}
                placeholder={t(
                  'quickCreate.client.modal.general.lastName.placeHolder'
                )}
              />
            </AntForm.Item>
          </div>
        </div>
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'lead_source'
          ) && (
            <AntForm.Item
              className={styles.customCommon}
              label={`${
                fieldsSettings?.find(
                  (thread) => thread.field_name === 'lead_source'
                )?.field_label ||
                t('quickCreate.client.modal.general.hearOption.label')
              }${
                marketingSources && marketingSources.length > 0
                  ? requiredLabel('lead_source')
                  : ''
              }`}
              name={'lead_source'}
            >
              {!isMarketingSourceLoading ? (
                <Select
                  name={'lead_source'}
                  placeholder={t(
                    'quickCreate.client.modal.general.hearOption.selectOption'
                  )}
                >
                  {marketingSources?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <div className={styles.skeletonWrapper}>
                  <Skeleton
                    className={styles.skeletonInput}
                    paragraph={false}
                    active
                  />
                </div>
              )}
            </AntForm.Item>
          )
        )}
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'Description'
          ) && (
            <AntForm.Item
              className={styles.customCommon}
              label={`${
                fieldsSettings?.find(
                  (thread) => thread.field_name === 'Description'
                )?.field_label ||
                t('quickCreate.client.modal.general.description.label')
              }${requiredLabel('Description')}`}
              name={'Description'}
            >
              <Input
                name={'Description'}
                placeholder={t(
                  'quickCreate.client.modal.general.description.placeholder'
                )}
              />
            </AntForm.Item>
          )
        )}
        {isFieldSettingLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find((thread) => thread.field_name === 'DOB') && (
            <AntForm.Item
              className={styles.customCommon}
              label={`${
                fieldsSettings?.find((thread) => thread.field_name === 'DOB')
                  ?.field_label || t('quickCreate.client.modal.general.date')
              }${requiredLabel('DOB')}`}
              name={'DOB'}
            >
              <DatePicker
                onChange={(date, dateString) =>
                  setFieldValue('DOB', dayjs(dateString))
                }
                name={'DOB'}
                value={values?.DOB}
                disabledDate={(current) => {
                  return current && current > dayjs().endOf('day')
                }}
                format={'DD/MM/YY'}
                placeholder={'DD/MM/YY'}
                getPopupContainer={(trigger) =>
                  trigger.parentElement as HTMLElement
                }
              />
            </AntForm.Item>
          )
        )}
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.location.label')}
          name={'location'}
        >
          {!isLocationLoading ? (
            <Select
              name={'location'}
              placeholder={t(
                'quickCreate.client.modal.general.hearOption.selectOption'
              )}
              defaultValue={0}
            >
              <Select.Option value={0}>Automatic</Select.Option>
              {locationData?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <div className={styles.skeletonWrapper}>
              <Skeleton
                className={styles.skeletonInput}
                paragraph={false}
                active
              />
            </div>
          )}
        </AntForm.Item>
        {isLeadStatusLoading ? (
          <SkeletonContent />
        ) : (
          leadStatusData &&
          leadStatusData?.length > 0 && (
            <div>
              <div>
                {t('quickCreate.client.modal.general.lead.status.label')}
              </div>
              <SliderCustom
                data={leadStatusData?.map((thread) => {
                  return {
                    id: thread.id,
                    name: thread.status_name,
                  }
                })}
                handleChange={(value) => {
                  setFieldValue('leadStatus', value?.id || 0)
                }}
                value={values?.leadStatus}
              />
            </div>
          )
        )}
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.lead.modal.general.notes')}
          name={'note'}
        >
          <TextArea
            name={'note'}
            rows={4}
            placeholder={t('quickCreate.lead.modal.general.notes.placeholder')}
          />
        </AntForm.Item>
      </AntForm>
    </div>
  )
}

export default General
