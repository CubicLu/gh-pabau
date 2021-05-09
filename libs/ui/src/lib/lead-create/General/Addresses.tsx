import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps } from '../LeadCreate'
import { Form as AntForm, Input } from 'formik-antd'
import { SimpleDropdown } from '@pabau/ui'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface Props {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
}

export const Addresses: FC<Props> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.addressForm}>
      <h5>{t('quickCreate.client.modal.general.addresses')}</h5>
      <AntForm
        className={styles.addressFormLayout}
        layout={'vertical'}
        requiredMark={false}
      >
        <AntForm.Item
          label={t('quickCreate.client.modal.general.addresses.label')}
          name={'address'}
        >
          <Input
            name={'address'}
            placeholder={t(
              'quickCreate.client.modal.general.addresses.placeHolder'
            )}
            prefix={<SearchOutlined />}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.client.modal.general.addresses.country')}
          name={'country'}
        >
          <SimpleDropdown
            name={'country'}
            defaultValue={t(
              'quickCreate.client.modal.general.addresses.country.placeHolder'
            )}
            onSelected={(value) => setFieldValue('country', value)}
            dropdownItems={['United Kingdom', 'India']}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.client.modal.general.addresses.city')}
          name={'city'}
        >
          <SimpleDropdown
            name={'country'}
            defaultValue={t(
              'quickCreate.client.modal.general.addresses.city.placeHolder'
            )}
            onSelected={(value) => setFieldValue('city', value)}
            dropdownItems={['London', 'India']}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.client.modal.general.addresses.postcode')}
          name={'postCode'}
        >
          <Input
            name={'postCode'}
            placeholder={t(
              'quickCreate.client.modal.general.addresses.postcode.placeHolder'
            )}
          />
        </AntForm.Item>
      </AntForm>
    </div>
  )
}

export default Addresses
