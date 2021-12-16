import { Button, Popover } from 'antd'
import { Form, Input } from 'formik-antd'
import LocationSetingsMore from './LocationSetingsMore'
import styles from './LocationSettings.module.less'

function LocationSettings() {
  const content = <LocationSetingsMore />

  return (
    <Form.Item
      className={styles.signupInput__formItem}
      label={'Location settings'}
      name={'LocationSettings'}
      colon={false}
    >
      <div className={styles.signupInput__div}>
        <Input disabled name={'lastName'} placeholder={'United Kingdom(GMT)'} />
        <Popover
          className={styles.locationSettings__provider}
          placement="bottomRight"
          content={content}
          trigger="click"
          title="Location settings"
        >
          <Button type="link">Edit</Button>
        </Popover>
      </div>
    </Form.Item>
  )
}

export default LocationSettings
