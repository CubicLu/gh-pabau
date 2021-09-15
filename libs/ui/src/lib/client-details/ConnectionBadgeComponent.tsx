import React, { FC } from 'react'
import styles from './ConnectionBadgeComponent.module.less'

export interface ConnectionBadgeComponentProps {
  primaryBadge: React.ReactNode
  secondaryBadge: React.ReactNode
}

export const ConnectionBadgeComponent: FC<ConnectionBadgeComponentProps> = ({
  primaryBadge,
  secondaryBadge,
}) => {
  return (
    <div className={styles.badgeContent}>
      <div className={styles.primary}>
        {primaryBadge}
        <div className={styles.second}>{secondaryBadge}</div>
      </div>
    </div>
  )
}
