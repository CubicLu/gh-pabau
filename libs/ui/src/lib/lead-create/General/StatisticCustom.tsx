import React, { FC } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps } from '../LeadCreate'
import { Form as AntForm, Input } from 'formik-antd'
import { SimpleDropdown } from '@pabau/ui'
import { useTranslation } from 'react-i18next'

interface GeneralProps {
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
}

export const StatisticInfo: FC<GeneralProps> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.statisticInfo}>
      <h5>{t('quickCreate.lead.modal.general.statisticCustom')}</h5>
      <AntForm
        className={styles.statisticCustomForm}
        layout={'vertical'}
        requiredMark={false}
      >
        <AntForm.Item
          label={t('quickCreate.lead.modal.general.procedureType')}
          name={'procedureType'}
        >
          <Input
            name={'procedureType'}
            placeholder={t(
              'quickCreate.lead.modal.general.procedureType.placeholder'
            )}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.lead.modal.general.treatmentInterestPage')}
          name={'treatmentInterestPage'}
        >
          <SimpleDropdown
            name={'treatmentInterestPage'}
            defaultValue={t(
              'quickCreate.lead.modal.general.treatmentInterestPage.placeholder'
            )}
            onSelected={(value) =>
              setFieldValue('treatmentInterestPage', value)
            }
            dropdownItems={['1%', '2%', '3%', '4%']}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.lead.modal.general.title')}
          name={'title'}
        >
          <Input
            name={'title'}
            placeholder={t('quickCreate.lead.modal.general.title.placeholder')}
          />
        </AntForm.Item>
        <AntForm.Item
          label={t('quickCreate.lead.modal.general.keyword')}
          name={'keyword'}
        >
          <Input
            name={'keyword'}
            placeholder={t(
              'quickCreate.lead.modal.general.keyword.placeholder'
            )}
          />
        </AntForm.Item>
      </AntForm>
    </div>
  )
}

export default StatisticInfo
