import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Form as AntForm, Input } from 'formik-antd'
import { InitialDetailsProps, PhoneNumberInput, FieldSetting } from '@pabau/ui'
import { useTranslation } from 'react-i18next'

interface GeneralProps {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number
  ): void
  fieldsSettings: FieldSetting[]
  requiredLabel: (name: string) => string
}

export const ContactInfo: FC<GeneralProps> = ({
  setFieldValue,
  values,
  fieldsSettings,
  requiredLabel,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.contactInfo}>
      <h5>{t('quickCreate.client.modal.general.contactInfo')}</h5>
      <AntForm
        className={styles.contactForm}
        layout={'vertical'}
        requiredMark={false}
      >
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
        {fieldsSettings.find((thread) => thread.field_name === 'Phone') && (
          <AntForm.Item
            label={`${
              fieldsSettings?.find((thread) => thread.field_name === 'Phone')
                ?.field_label || t('quickCreate.client.modal.general.telephone')
            }${requiredLabel('Phone')}`}
            name={'Phone'}
          >
            <Input name={'Phone'} placeholder={'+ _ ___ _____'} />
          </AntForm.Item>
        )}
      </AntForm>
    </div>
  )
}

export default ContactInfo
