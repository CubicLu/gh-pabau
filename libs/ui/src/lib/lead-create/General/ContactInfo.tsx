import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps } from '../LeadCreate'
import { Form as AntForm, Input } from 'formik-antd'
import { PhoneNumberInput } from '@pabau/ui'
import { useTranslation } from 'react-i18next'

interface GeneralProps {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
}

export const ContactInfo: FC<GeneralProps> = ({ setFieldValue, values }) => {
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
          label={t('quickCreate.client.modal.general.email')}
          name={'email'}
        >
          <Input
            name={'email'}
            placeholder={t(
              'quickCreate.client.modal.general.email.placeHolder'
            )}
          />
        </AntForm.Item>
        <AntForm.Item name={'phoneNumber'}>
          <PhoneNumberInput
            // labelStyle={styles.phoneInputLabel}
            label={t('quickCreate.client.modal.general.mobilePhone')}
            value={values?.phoneNumber}
            onChange={(value) => setFieldValue('phoneNumber', value)}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.client.modal.general.telephone')}
          name={'telePhone'}
        >
          <Input name={'telePhone'} placeholder={'+ _ ___ _____'} />
        </AntForm.Item>
      </AntForm>
    </div>
  )
}

export default ContactInfo
