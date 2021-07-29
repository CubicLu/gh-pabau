import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { InitialDetailsProps } from '../ClientCreate'
import { Form as AntForm } from 'formik-antd'
import { RadioGroup } from '@pabau/ui'
import { useTranslation } from 'react-i18next'

interface Props {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number
  ): void
}

export const ThirdPartyDetail: FC<Props> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.customFieldForm}>
      <AntForm
        className={styles.customFormInput}
        layout={'vertical'}
        requiredMark={false}
      >
        <h5>{t('quickCreate.client.modal.general.thirdParty')}</h5>
        <p>{t('quickCreate.client.modal.general.thirdParty.whoResponsible')}</p>
        <AntForm.Item name={'thirdPartyDetails'}>
          <RadioGroup
            name={'thirdPartyDetails'}
            value={values?.thirdPartyDetails?.toString() || ''}
            radioItems={[
              t('quickCreate.client.modal.general.thirdParty.botox'),
              t('quickCreate.client.modal.general.thirdParty.laser'),
            ]}
          />
        </AntForm.Item>
      </AntForm>
    </div>
  )
}

export default ThirdPartyDetail
