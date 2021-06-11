import React, { FC, useState } from 'react'
import styles from '../ClientCreate.module.less'
import { InitialDetailsProps, Label } from '../ClientCreate'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import GeneralComponent from './General'
import ContactInfo from './ContactInfo'
import Subscriptions from './Subscriptions'
import Addresses from './Addresses'
import ThirdPartyDetail from './ThirdPartyDetail'
import { useTranslation } from 'react-i18next'

interface GeneralProps {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number
  ): void
  labels: Label[]
  setLabels: (val: Label[]) => void
  selectedLabels: Label[]
  setSelectedLabels: (val: Label[]) => void
}

export const Index: FC<GeneralProps> = ({
  setFieldValue,
  values,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
}) => {
  const [moreVisible, setMoreVisible] = useState(false)

  const { t } = useTranslation('common')

  const toggleMore = () => {
    setMoreVisible(!moreVisible)
  }

  return (
    <div className={styles.mainDiv}>
      <GeneralComponent
        values={values}
        setFieldValue={setFieldValue}
        labels={labels}
        setLabels={setLabels}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
      />
      <ContactInfo values={values} setFieldValue={setFieldValue} />
      <Subscriptions values={values} setFieldValue={setFieldValue} />
      <div
        className={`${styles.moreBtn} ${!moreVisible && styles.paddingAtEnd}`}
        onClick={toggleMore}
      >
        {moreVisible ? <UpOutlined /> : <DownOutlined />}
        <p> {t('quickCreate.client.modal.more')}</p>
      </div>
      {moreVisible && (
        <>
          <Addresses values={values} setFieldValue={setFieldValue} />
          <ThirdPartyDetail values={values} setFieldValue={setFieldValue} />
        </>
      )}
    </div>
  )
}

export default Index
