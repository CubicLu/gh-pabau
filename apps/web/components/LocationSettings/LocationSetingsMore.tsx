import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Form, Select } from 'formik-antd'
import styles from './LocationSettings.module.less'
import { FC } from 'react'

const LocationSetingsMore: FC = () => {
  const { Option } = Select

  function onSearch(val: string) {
    console.log('search:', val)
  }
  function onChange(value: string) {
    console.log(`selected ${value}`)
  }
  const { t } = useTranslationI18()

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
              onChange={onChange}
              onSearch={onSearch}
              name={'Country'}
            >
              <Option key={2} value={'unitedKingdom'}>
                United Kingdom
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            className={styles.locationSettingsMore__formItemInside}
            name={'TimeZone'}
            label={t('create.account.signup.time.zone')}
          >
            <Select
              showSearch
              onChange={onChange}
              onSearch={onSearch}
              name={'TimeZone'}
            >
              <Option value={2} key={2}>
                America
              </Option>
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
              onChange={onChange}
              onSearch={onSearch}
              name={'Currency'}
            >
              <Option key={31} value={'Currency'}>
                Currency
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            className={styles.locationSettingsMore__formItemInside}
            name={'Language'}
            label={t('create.account.singup.language')}
          >
            <Select
              showSearch
              onChange={onChange}
              onSearch={onSearch}
              name={'Language'}
            >
              <Option key={2} value={'Language'}>
                Language
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Form>
    </div>
  )
}

export default LocationSetingsMore
