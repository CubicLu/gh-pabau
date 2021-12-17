import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { Popover, Radio } from 'antd'
import { Button, ButtonTypes, UserGroupListItem } from '@pabau/ui'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FormComponent.module.less'

const EMPTY_USER = -2
const ALL_USER = -1
const ME = 0
interface P {
  saveForm: () => void
  disableSaveButton: boolean
  formSaveLabel: string
  userGroupListItems?: UserGroupListItem[]
  hidePadlock?: boolean
  saveFormLoading?: boolean
}

export const FormSaveButton: FC<P> = ({
  saveForm,
  disableSaveButton,
  formSaveLabel,
  userGroupListItems = [],
  hidePadlock = false,
  saveFormLoading = false,
}) => {
  const [lockVisible, setLockVisible] = useState(false)
  const [lockUser, setLockUser] = useState(ALL_USER)
  const { t } = useTranslation('common')

  const onChangeLockUser = (e) => {
    setLockUser(e.target.value)
    setLockVisible(false)
  }

  const LockPanel = () => {
    return (
      <div className={styles.lockPanel}>
        <Radio.Group size="small" value={lockUser} onChange={onChangeLockUser}>
          <div className={styles.lockItem}>
            <Radio value={ALL_USER}>
              <span>
                {lockUser === ALL_USER ? <UnlockOutlined /> : <LockOutlined />}
              </span>
              <span className={styles.lockTitle}>
                {t('ui.medicalformbuilder.form.lock.allusers')}
              </span>
            </Radio>
          </div>
          <div className={styles.lockItem}>
            <Radio value={ME}>
              <span>
                {lockUser === ME ? <UnlockOutlined /> : <LockOutlined />}
              </span>
              <span className={styles.lockTitle}>
                {t('ui.medicalformbuilder.form.lock.me')}
              </span>
            </Radio>
          </div>
          <div className={styles.lockDivider}>
            {t('products.list.products.groups')}
          </div>
          {userGroupListItems.map((item, index) => (
            <div
              className={styles.lockItem}
              key={'userGroupListItems-' + index}
            >
              <Radio value={item.id}>
                <span>
                  {lockUser === item.id ? <UnlockOutlined /> : <LockOutlined />}
                </span>
                <span className={styles.lockTitle}>{item.group_name}</span>
              </Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
    )
  }

  return (
    <div className={styles.formComponentButton}>
      <Button
        type={ButtonTypes.primary}
        size="middle"
        disabled={disableSaveButton}
        onClick={saveForm}
        loading={saveFormLoading}
      >
        {formSaveLabel === '' ? 'Save Form' : formSaveLabel}
      </Button>
      {!hidePadlock && (
        <Popover
          placement="topRight"
          content={<LockPanel />}
          visible={lockVisible}
        >
          <Button
            className={styles.btnCircle}
            shape="circle"
            icon={<LockOutlined />}
            onClick={() => setLockVisible(!lockVisible)}
            loading={saveFormLoading}
          />
        </Popover>
      )}
    </div>
  )
}

export default FormSaveButton
