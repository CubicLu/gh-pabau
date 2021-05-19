import { QuestionCircleOutlined } from '@ant-design/icons'
import { PabauPlus } from '@pabau/ui'
import { Select, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'

const { Option } = Select

const MedicalFormComponentMedicalHistory: FC = () => {
  const { t } = useTranslation('common')
  const tooltip = t('ui.medicalformbuilder.medicalhistory.tooltip')
  const terms = [
    { label: t('ui.medicalformbuilder.medicalhistory.terms.3m'), value: '3m' },
    { label: t('ui.medicalformbuilder.medicalhistory.terms.6m'), value: '6m' },
    {
      label: t('ui.medicalformbuilder.medicalhistory.terms.12m'),
      value: '12m',
    },
    { label: t('ui.medicalformbuilder.medicalhistory.terms.2y'), value: '2y' },
    { label: t('ui.medicalformbuilder.medicalhistory.terms.3y'), value: '3y' },
    { label: t('ui.medicalformbuilder.medicalhistory.terms.5y'), value: '5y' },
  ]
  return (
    <div className={styles.MedicalFormComponentMedicalHistory}>
      <div className={styles.description}>
        <div className={styles.expireDesc}>
          <span>{t('ui.medicalformbuilder.medicalhistory.expiredesc')}</span>
          <Tooltip placement="topLeft" title={tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <PabauPlus
          label={t('ui.medicalformbuilder.medicalhistory.plus')}
          modalType={'Care'}
          disabled={false}
        />
      </div>
      <div className={styles.dropdown}>
        <Select defaultValue={'6m'}>
          <Option value="">
            {t('ui.medicalformbuilder.medicalhistory.terms')}
          </Option>
          {terms.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default MedicalFormComponentMedicalHistory
