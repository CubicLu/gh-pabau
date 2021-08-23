import React, { FC } from 'react'
import RecordSharing from './RecordSharing'
import styles from './SharingPrivacy.module.less'
import SettingSharing from './SettingSharing'
import CommunicationPreference from './CommunicationPreference'
import SharingHistory from './SharingHistory'
import { InitialDetailsProps } from '@pabau/ui'

interface P {
  companyName?: string
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string[] | Record<string, string> | Record<string, boolean>
  ): void
}

const Index: FC<P> = ({ companyName, values, setFieldValue }) => {
  return (
    <div className={styles.mainWrapper}>
      <RecordSharing setFieldValue={setFieldValue} values={values} />
      {values?.['recordSharing'] &&
        Object.entries(values['recordSharing']).filter(
          ([key, value]) => value === 'access'
        ).length > 0 && (
          <SettingSharing
            companyName={companyName}
            setFieldValue={setFieldValue}
            values={values}
          />
        )}
      <CommunicationPreference setFieldValue={setFieldValue} values={values} />
      <SharingHistory />
    </div>
  )
}

export default Index
