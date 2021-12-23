import { Button, Popover } from 'antd'
import { Form, Input } from 'formik-antd'
import LocationSetingsMore from './LocationSetingsMore'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './LocationSettings.module.less'

function LocationSettings() {
  const content = <LocationSetingsMore />
  const { t } = useTranslationI18()

  return (
    <Form.Item
      className={styles.signupInput__formItem}
      label={t('create.account.location.settings')}
      name={'Location settings'}
      colon={false}
    >
      <div className={styles.signupInput__div}>
        <Input disabled name={'lastName'} placeholder={'United Kingdom(GMT)'} />
        <Popover
          className={styles.locationSettings__provider}
          placement="bottomRight"
          content={content}
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
