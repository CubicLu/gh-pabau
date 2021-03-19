import React, { FC, useState } from 'react'

import { Button, CheckboxTree, Notification, NotificationType } from '@pabau/ui'
import styles from './Service.module.less'
import { serviceData } from '../../../../mocks/UserDetail'

const Service: FC = () => {
  const [expandedKeys, setExpandedKeys] = useState(['Accent prime'])
  const [checkedKeys, setCheckedKeys] = useState([
    'Accent prime - Subcategory 1',
  ])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: string[]) => {
    setCheckedKeys(checkedKeysValue)
  }

  const handleSaveChanges = () => {
    Notification(NotificationType.success, 'Success! Saved changes.')
  }

  return (
    <div className={styles.serviceMainWrapper}>
      <div className={styles.servicesDetailHead}>
        <h4>Services</h4>
        <div className={styles.servicesDetailHeadBtn}>
          <Button
            className={styles.saveBtn}
            size={'large'}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
      </div>
      <div className={styles.servicesContent}>
        <div className={styles.servicesTitleHead}>
          <h5>Services</h5>
          <div className={styles.desc}>
            Choose the services this employee can perform
          </div>
        </div>
        <CheckboxTree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={serviceData}
        />
      </div>
      <div className={styles.servicesDetailHeadMobileBtn}>
        <Button
          className={styles.saveBtn}
          size={'large'}
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </div>
    </div>
  )
}

export default Service
