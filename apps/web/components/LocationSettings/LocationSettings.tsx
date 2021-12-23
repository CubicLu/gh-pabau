import { Button, Popover } from 'antd'
import { Form, Input } from 'formik-antd'
import LocationSetingsMore from './LocationSetingsMore'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './LocationSettings.module.less'
import { useState } from 'react'
import dayjs from 'dayjs'
import useFetchCountryData from '../../hooks/useFetchCountryData'

function LocationSettings() {
  const [handleCountry, setHandleCountry] = useState<string>('')
  const [handleTimeZone, setHandleTimeZone] = useState<string>('')

  const useFetchData = useFetchCountryData()

  const handleCountryDetection = (value: string) => {
    setHandleCountry(value)
  }
  const handleCountryTimeZone = (value: string) => {
    setHandleTimeZone(value)
  }
  const { t } = useTranslationI18()

  return (
    <Form.Item
      className={styles.signupInput__formItem}
      label={t('create.account.location.settings')}
      name={'Location settings'}
      colon={false}
    >
      <div className={styles.signupInput__div}>
        <Input
          disabled
          name={'countryName'}
          placeholder={
            !handleCountry && !handleTimeZone
              ? `${useFetchData?.data?.country_name} (${
                  useFetchData?.data?.time_zone?.code
                } ${dayjs(useFetchData?.data?.time_zone?.current_time).format(
                  'Z'
                )})`
              : `${handleCountry} ${handleTimeZone.slice(0, 13)}`
          }
        />
        <Popover
          className={styles.locationSettings__provider}
          placement="bottomRight"
          content={
            <LocationSetingsMore
              handleCountryDetection={handleCountryDetection}
              handleCountryTimeZone={handleCountryTimeZone}
              useFetchData={useFetchData}
            />
          }
          trigger="click"
          title={t('create.account.location.settings')}
        >
          <Button type="link">Edit</Button>
        </Popover>
      </div>
    </Form.Item>
  )
}

export default LocationSettings
