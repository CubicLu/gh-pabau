import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Form as AntForm, Input, Select } from 'formik-antd'
import { useTranslation } from 'react-i18next'
import { FieldSetting } from '@pabau/ui'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
const { Option } = Select

interface Props {
  fieldsSettings: FieldSetting[]
  requiredLabel: (name: string) => string
}

export const Addresses: FC<Props> = ({ fieldsSettings, requiredLabel }) => {
  const { t } = useTranslation('common')
  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const getLabel = (label) => {
    return fieldsSettings.find((thread) => thread.field_name === label)
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
        {fieldsSettings.find(
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
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingProvince'
        ) && (
          <AntForm.Item
            label={`${
              getLabel('MailingProvince') ||
              t('quickCreate.client.modal.general.county.label')
            }${requiredLabel('MailingProvince')}`}
            name={'MailingProvince'}
          >
            <Input
              name={'MailingProvince'}
              placeholder={t('common-label-enter', {
                what: getLabel('MailingProvince')
                  ? getLabel('MailingProvince')?.toLowerCase()
                  : t(
                      'quickCreate.client.modal.general.county.label'
                    ).toLowerCase(),
              })}
            />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
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
                      'quickCreate.client.modal.general.county.label'
                    ).toLowerCase(),
              })}
            />
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingCountry'
        ) && (
          <AntForm.Item
            label={`${
              getLabel('MailingCountry') ||
              t('quickCreate.client.modal.general.addresses.country')
            }${requiredLabel('MailingCountry')}`}
            name={'MailingCountry'}
          >
            <Select
              placeholder={t('common-label-enter', {
                what: getLabel('MailingCountry')
                  ? getLabel('MailingCountry')?.toLowerCase()
                  : t(
                      'quickCreate.client.modal.general.addresses.country'
                    ).toLowerCase(),
              })}
              name={'MailingCountry'}
              showSearch
            >
              {Object.keys(countriesName).map((c) => (
                <Option key={c} value={countriesName[c]}>
                  {countriesName[c]}
                </Option>
              ))}
            </Select>
          </AntForm.Item>
        )}
        {fieldsSettings.find(
          (thread) => thread.field_name === 'MailingPostal'
        ) && (
          <AntForm.Item
            label={`${
              getLabel('MailingPostal') ||
              t('quickCreate.client.modal.general.addresses.postcode')
            }${requiredLabel('MailingPostal')}`}
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
        )}
      </AntForm>
    </div>
  )
}

export default Addresses
