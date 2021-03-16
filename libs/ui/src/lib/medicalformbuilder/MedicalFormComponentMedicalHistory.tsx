import { QuestionCircleOutlined } from '@ant-design/icons'
import { PabauPlus } from '@pabau/ui'
import { Select, Tooltip } from 'antd'
import React, { FC } from 'react'
import styles from './MedicalFormBuilder.module.less'

const { Option } = Select

const MedicalFormComponentMedicalHistory: FC = () => {
  const tooltip =
    'We will automatically request the client to update there medical history after the below term'
  const terms = [
    { label: '3 months', value: '3m' },
    { label: '6 months', value: '6m' },
    { label: '12 months', value: '12m' },
    { label: '2 years', value: '2y' },
    { label: '3 years', value: '3y' },
    { label: '5 years', value: '5y' },
  ]
  return (
    <div className={styles.MedicalFormComponentMedicalHistory}>
      <div className={styles.description}>
        <div className={styles.expireDesc}>
          <span>Expires after</span>
          <Tooltip placement="topLeft" title={tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <PabauPlus label={'Plus'} modalType={'Care'} disabled={false} />
      </div>
      <div className={styles.dropdown}>
        <Select defaultValue={'6m'}>
          <Option value="">Select an expiration term</Option>
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
