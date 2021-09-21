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
    values: string[] | Record<string, number> | number
  ): void
  accessCode?: number
}

const Index: FC<P> = ({ companyName, values, setFieldValue, accessCode }) => {
  return (
    <div className={styles.mainWrapper}>
      <CommunicationPreference setFieldValue={setFieldValue} values={values} />
      <RecordSharing setFieldValue={setFieldValue} values={values} />
      {values?.['recordSharing'] &&
        Object.entries(values['recordSharing']).filter(
          ([key, value]) => value === 1
        ).length > 0 && (
          <SettingSharing
            companyName={companyName}
            setFieldValue={setFieldValue}
            values={values}
            accessCode={accessCode}
          />
        )}
      <SharingHistory />
    </div>
  )
}

export default Index
