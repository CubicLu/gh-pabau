import React, { FC } from 'react'
import { Skeleton } from 'antd'
import styles from './Footer.module.less'
const { Button } = Skeleton

export const WebinarSkeleton: FC = () => {
  return (
    <div className={styles.webinarSkeleton}>
      <div className={styles.webinarBox}>
        <div className={styles.webinarText}>
          <div className="title">
            <Skeleton active paragraph={{ rows: 0 }} />
          </div>
          <div className="name">
            <Skeleton active paragraph={{ rows: 0 }} />
          </div>
          <div className="times">
            <Skeleton active paragraph={{ rows: 0 }} />
            <Skeleton active paragraph={{ rows: 0 }} />
          </div>
          <div className="button">
            <Button active />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebinarSkeleton
