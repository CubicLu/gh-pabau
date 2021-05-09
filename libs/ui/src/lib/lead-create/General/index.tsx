import React, { FC, useState } from 'react'
import styles from '../LeadCreate.module.less'
import { InitialDetailsDataProps } from '../LeadCreate'
import GeneralComponent from './General'
import ContactInfo from './ContactInfo'
import Subscriptions from './Subscriptions'
import Addresses from './Addresses'
import StatisticCustom from './StatisticCustom'
import { useTranslation } from 'react-i18next'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface GeneralProps {
  key?: string
  values?: InitialDetailsDataProps
  setFieldValue(
    field: keyof InitialDetailsDataProps,
    values: string | string[] | boolean | number
  ): void
}

export const Index: FC<GeneralProps> = ({ setFieldValue, values }) => {
  const [moreVisible, setMoreVisible] = useState(false)

  const { t } = useTranslation('common')

  const toggleMore = () => {
    setMoreVisible(!moreVisible)
  }

  return (
    <div className={styles.mainDiv}>
      <GeneralComponent values={values} setFieldValue={setFieldValue} />
      <StatisticCustom values={values} setFieldValue={setFieldValue} />
      <ContactInfo values={values} setFieldValue={setFieldValue} />
      <div
        className={`${styles.moreBtn} ${!moreVisible && styles.paddingAtEnd}`}
        onClick={toggleMore}
      >
        {moreVisible ? <UpOutlined /> : <DownOutlined />}
        <p> {t('quickCreate.client.modal.more')}</p>
      </div>
      {moreVisible && (
        <div className={styles.paddingAtEnd}>
          <Subscriptions values={values} setFieldValue={setFieldValue} />
          <Addresses values={values} setFieldValue={setFieldValue} />
        </div>
      )}
    </div>
  )
}

export default Index
