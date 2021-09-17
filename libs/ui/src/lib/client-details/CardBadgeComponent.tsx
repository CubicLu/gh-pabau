import React, { FC } from 'react'
import styles from './CardBadgeComponent.module.less'

export interface CardBadgeComponentProps {
  primaryBadge: React.ReactNode
  secondaryBadge: React.ReactNode
}

export const CardBadgeComponent: FC<CardBadgeComponentProps> = ({
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
