import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps } from '../LeadCreate'
import { Form as AntForm, Input } from 'formik-antd'
import { SimpleDropdown } from '@pabau/ui'
import { DatePicker } from 'antd'
import { useTranslation } from 'react-i18next'

const { TextArea } = Input

interface GeneralProps {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
}

export const General: FC<GeneralProps> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.generalDiv}>
      <h5>{t('quickCreate.client.modal.general')}</h5>
      <AntForm layout={'vertical'} requiredMark={false}>
        <div className={styles.wrapNameInfo}>
          <div className={styles.firstName}>
            <AntForm.Item
              label={t('quickCreate.client.modal.general.firstName')}
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
              label={t('quickCreate.client.modal.general.lastName')}
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
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.hearOption.label')}
          name={'hearOption'}
        >
          <SimpleDropdown
            name={'hearOption'}
            defaultValue={t(
              'quickCreate.client.modal.general.hearOption.selectOption'
            )}
            onSelected={(value) => setFieldValue('hearOption', value)}
            dropdownItems={[
              t('quickCreate.client.modal.general.hearOption.selectOption'),
              t('quickCreate.client.modal.general.hearOption.anythingHere'),
            ]}
          />
        </AntForm.Item>
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.date')}
          name={'dateOfBirth'}
        >
          <DatePicker
            onChange={(date, dateString) =>
              setFieldValue('dateOfBirth', dateString)
            }
            name={'dateOfBirth'}
            format={'DD/MM/YY'}
            placeholder={'DD/MM/YY'}
          />
        </AntForm.Item>
        <div>Lead Stage (coming soon..)</div>
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
