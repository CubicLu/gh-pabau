import React, { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Tag } from 'antd'
import { sectionToShare, recordToSharingOption } from '../mock'
import { CustomDropdown, InitialDetailsProps } from '@pabau/ui'

import styles from './SharingPrivacy.module.less'

interface P {
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: Record<string, number>
  ): void
  values?: InitialDetailsProps
}

export interface RecordSharing {
  key: string
  label: string
  color: string
}

const RecordSharing: FC<P> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')
  const sectionToShareData = sectionToShare(t)
  const recordToSharingOptionData = recordToSharingOption(t)

  const handleChange = (name, value) => {
    const selectedData = values ? { ...values['recordSharing'] } : {}
    if (selectedData) {
      selectedData[name] = Number.parseInt(value)
      setFieldValue('recordSharing', selectedData)
    }
  }

  return (
    <div className={styles.innerMainWrapper}>
      <h4>{t('create.client.modal.privacy.record.sharing.title')}</h4>
      <div className={styles.description}>
        <p>{t('create.client.modal.privacy.record.sharing.description')}</p>
      </div>
      <div className={styles.sectionToShare}>
        <h5>{t('create.client.modal.privacy.selection.share.title')}</h5>
        {sectionToShareData.map((data) => {
          return (
            <div key={data.key} className={styles.container}>
              <Tag color={data.color}>{data.label}</Tag>
              <CustomDropdown
                data={recordToSharingOptionData}
                selectedValue={
                  values?.['recordSharing']
                    ? values?.['recordSharing']?.[data.key].toString()
                    : undefined
                }
                handleChange={(changeData) => {
                  handleChange?.(data.key, changeData.value)
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecordSharing
