import React from 'react'
import { Skeleton } from 'antd'

import styles from './KanbanCard.module.less'

export const KanbanCardSkeleton = () => {
  return (
    <div className={styles.cardContent}>
      <div className={styles.leadTitleContent}>
        <Skeleton.Input style={{ width: 80 }} active={true} size={'default'} />
      </div>

      <div className={styles.labelAndBtn}>
        <div className={styles.labelsContent}>
          <div className={styles.statusBtn}>
            <Skeleton.Button
              active={true}
              size={'default'}
              shape={'square'}
              style={{ height: 25 }}
            />
          </div>
        </div>
        <div className={styles.statusContent}>
          <Skeleton.Button
            active={true}
            size={'small'}
            shape={'circle'}
            style={{ marginTop: -5 }}
          />
        </div>
      </div>
      <div className={styles.ownerClientContent}>
        <div className={styles.ownerImg}>
          <Skeleton.Avatar
            className={styles.avatarImg}
            active={true}
            shape={'circle'}
            size={'small'}
          />
        </div>
        <div className={styles.contactContent}>
          <div>
            <Skeleton.Avatar
              className={styles.avatarImg}
              active={true}
              shape={'circle'}
              size={'small'}
            />
          </div>
          <div className={styles.contactContentName}>
            <div className={styles.nameSection}>
              <Skeleton.Input
                style={{ width: 60 }}
                active={true}
                size={'small'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanCardSkeleton
