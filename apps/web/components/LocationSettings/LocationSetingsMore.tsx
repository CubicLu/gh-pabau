import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Form, Select } from 'formik-antd'
import styles from './LocationSettings.module.less'
import { FC } from 'react'
import { useGetAllCountryTimezoneQuery } from '@pabau/graphql'
import dayjs from 'dayjs'
import { LanguageSelectorDropdown } from '@pabau/ui'

export interface Props {
  country_name?: string
  country_id?: number
  findManyCountry?: string
  Timezone?: any
  data?: any
  useFetchData?: any
  handleCountryDetection?: (value: string) => void
  handleCountryTimeZone?: (value: string) => void
}

const LocationSetingsMore: FC<Props> = ({
  useFetchData,
  handleCountryDetection,
  handleCountryTimeZone,
}) => {
  const { Option } = Select

  const { data: currencyData } = useGetAllCountryTimezoneQuery({
    variables: {},
  })

  const { t } = useTranslationI18()

  function handleCountry(value: string) {
    handleCountryDetection(value)
  }
  function handleTimeZone(value: string) {
    handleCountryTimeZone(value)
  }

  return (
    <div>
      <Form className={styles.locationSetingsMore__form} layout="vertical">
        <Form className={styles.locationSetingsMore__formItem} layout="inline">
          <Form.Item
            className={styles.locationSettingsMore__formItemInside}
            name={'Country'}
            label={t('create.account.signup.country')}
          >
            <Select
              showSearch
              onChange={handleCountry}
              name={'Country'}
              defaultValue={useFetchData?.data?.country_name}
            >
              {currencyData?.findManyCountry.map((data) => (
                <Option key={data?.country_id} value={data?.country_name}>
                  {data?.country_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className={styles.locationSettingsMore__formItemInside}
            name={'TimeZone'}
            label={t('create.account.signup.time.zone')}
          >
            <Select
              key={useFetchData?.data?.time_zone.timezone_id}
              defaultValue={`(${useFetchData?.data?.time_zone.code} ${dayjs(
                useFetchData?.data?.time_zone?.current_time
              ).format('Z')}) ${useFetchData?.data?.time_zone?.id}`}
              showSearch
              onChange={handleTimeZone}
              name={'TimeZone'}
            >
              {currencyData?.findManyCountry.map((data) =>
                data?.Timezone?.map((data) => (
                  <Option value={data.label} key={data.timezone_id}>
                    {data.label}
                  </Option>
                ))
              )}
            </Select>
          </Form.Item>
        </Form>
      </Form>
      <Form className={styles.locationSetingsMore__form} layout="vertical">
        <Form className={styles.locationSetingsMore__formItem} layout="inline">
          <Form.Item
            className={styles.locationSettingsMore__formItemInside}
            name={'Currency'}
            label={t('create.account.signup.currency')}
          >
            <Select
              showSearch
              name={'Currency'}
              defaultValue={`${useFetchData?.data?.currency?.name} - ${useFetchData?.data?.currency?.symbol}`}
            >
              {currencyData?.findManyCountry?.map((data) =>
                data?.Currency?.map((value) => (
                  <Option key={value.ID} value={value.name}>
                    {value.name} - {value.code}
                  </Option>
                ))
              )}
            </Select>
          </Form.Item>
          <Form.Item
            className={styles.locationSettingsMore__formItemInside}
            name={'Language'}
            label={t('create.account.singup.language')}
          >
            <LanguageSelectorDropdown />
          </Form.Item>
        </Form>
      </Form>
    </div>
  )
}

export default LocationSetingsMore
