import React, { FC } from 'react'
import { Card, Tooltip, Skeleton } from 'antd'
import styles from './index.module.less'
import { StarOutlined } from '@ant-design/icons'
import { CustomScrollbar } from '@pabau/ui'
interface PathwaysCardProps {
  key: number
  icon: string
  title: string
  count: number
  description: string
  loading: boolean
}

export const PathwaysCard: FC<PathwaysCardProps> = ({
  key,
  icon,
  title,
  count,
  description,
  children,
  loading = false,
}) => {
  return (
    <div className={styles.listViewWrapper} key={key}>
      <Card>
        <div className={styles.cardTitle}>
          <div className={styles.iconWrap}>
            {loading ? (
              <Skeleton.Avatar active size="small" />
            ) : (
              <StarOutlined />
            )}
          </div>
          {children}
        </div>
        <div className={styles.contentTitle}>
          {loading ? (
            <Skeleton.Input
              active
              size="small"
              className={styles.heightInputWrap}
            />
          ) : (
            <>
              <Tooltip title={title}>
                <h5>{title}</h5>
              </Tooltip>
              <p>{count}</p>
            </>
          )}
        </div>
        <div className={styles.description}>
          {loading ? (
            <Skeleton.Input
              active
              size="small"
              className={styles.heightInput}
            />
          ) : (
            <CustomScrollbar
              autoHide={true}
              style={{ width: '200px', height: '54px' }}
            >
              {description}
            </CustomScrollbar>
          )}
        </div>
      </Card>
    </div>
  )
}
