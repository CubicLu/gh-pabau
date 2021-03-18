import { MoreOutlined } from '@ant-design/icons'
import { Button, ButtonTypes } from '@pabau/ui'
import { Dropdown, Menu } from 'antd'
import React, { FC } from 'react'
import styles from './MedicalFormBuilder.module.less'

interface P {
  clickCreateFormBtn: () => void
}

const menu = (
  <Menu>
    <Menu.Item>
      <span>Edit Form</span>
    </Menu.Item>
    <Menu.Item>
      <span>Delete Form</span>
    </Menu.Item>
  </Menu>
)

const MedicalFormSetting: FC<P> = ({ clickCreateFormBtn }) => {
  const onClickBtn = () => {
    clickCreateFormBtn?.()
  }

  return (
    <div className={styles.medicalFormSettingPanel}>
      <Button
        type={ButtonTypes.primary}
        className={styles.createButton}
        onClick={onClickBtn}
      >
        Create Form
      </Button>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Button type={ButtonTypes.default} className={styles.moreButton}>
          <MoreOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}

export default MedicalFormSetting
