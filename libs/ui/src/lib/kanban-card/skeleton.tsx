import React from 'react'
import { Skeleton } from 'antd'

import styles from './KanbanCard.module.less'

export const KanbanCardSkeleton = () => {
  return (
    <div className={styles.cardContent}>
      <div className={styles.leadTitleContent}>
        <Skeleton.Input
          className={styles.leadTitleContent}
          style={{ width: 80 }}
          active={true}
          size={'default'}
        />
      </div>
      <div className={styles.btnWrapper}>
        <div className={styles.labelsContent}>
          <div className={styles.statusBtn}>
            <Skeleton.Button active={true} size={'default'} shape={'square'} />
          </div>
          <Skeleton.Input
            style={{ width: 50 }}
            active={true}
            size={'default'}
          />
        </div>
        <div className={styles.statusContent}>
          <Skeleton.Button active={true} size={'small'} shape={'circle'} />
        </div>
      </div>
      <div className={styles.ownerClientContent}>
        <div className={styles.leadOwnerContent}>
          <Skeleton.Avatar active={true} shape={'circle'} size={'small'} />
          <Skeleton.Avatar active={true} shape={'circle'} size={'small'} />
        </div>
        <div className={styles.contactContent}>
          <Skeleton.Input
            className={styles.contactContentName}
            style={{ width: 80 }}
            active={true}
            size={'small'}
          />
        </div>
      </div>
    </div>
  )
}

export default KanbanCardSkeleton
