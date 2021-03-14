import React, { useState, FC } from 'react'
import { Switch, Accordion } from '@pabau/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

import styles from './ReportsPermissions.module.less'

export type PermissionType = {
  key: string
  name: string
}

export type PermissionGroupType = {
  key: string
  name: string
  children?: PermissionType[]
}

/* eslint-disable-next-line */
export interface ReportsPermissionsProps {
  pageTitle: string
  subTitle: string
  permissions: string[]
  data: PermissionGroupType[]
  onChange?: (permissions: string[]) => void
}

export const ReportsPermissions: FC<ReportsPermissionsProps> = ({
  pageTitle,
  subTitle,
  permissions: defaultPermissions,
  data,
  onChange,
}) => {
  const allPermissions: string[] = data.reduce(
    (acc, grp) => [...acc, ...(grp.children?.map((item) => item.key) || [])],
    []
  )
  const [permissions, setPermissions] = useState<string[]>(
    defaultPermissions || []
  )

  const handleChangePermission = (key: string) => {
    const index = permissions.indexOf(key)
    if (index === -1) permissions.push(key)
    else if (index !== -1) permissions.splice(index, 1)

    setPermissions([...permissions])
    onChange?.([...permissions])
  }

  const handleShowAll = (checked: boolean) => {
    if (checked) {
      setPermissions([...allPermissions])
      onChange?.([...allPermissions])
    } else {
      setPermissions([])
      onChange?.([])
    }
  }

  return (
    <div className={styles.reportsPermissions}>
      <div className={styles.reportsPermissionsHeader}>
        <div className={styles.viewAll}>
          <span>
            View all reports&nbsp;
            <FontAwesomeIcon
              icon={Icons.faQuestionCircle}
              style={{ fontSize: '16px' }}
            />
          </span>
          <Switch
            checked={permissions.length === allPermissions.length}
            onChange={(checked) => handleShowAll(checked)}
          />
        </div>
        <h3 className={styles.pageTitle}>{pageTitle}</h3>
        <div className={styles.subTitle}>
          <p>{subTitle}</p>
        </div>
      </div>

      <div className={styles.reportsPermissionsList}>
        {data.map((group) => (
          <Accordion key={group.key} headerLabel={group.name}>
            <div className={styles.permissionGroup}>
              {group.children?.map((item) => (
                <div key={item.key} className={styles.permissionItem}>
                  <div className={styles.label}>{item.name}</div>
                  <div className={styles.permission}>
                    <Switch
                      checked={permissions.indexOf(item.key) !== -1}
                      onChange={(checked) => handleChangePermission?.(item.key)}
                    />
                  </div>
                </div>
              )) || null}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default ReportsPermissions
