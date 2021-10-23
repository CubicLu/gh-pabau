import React, { FC } from 'react'
import { Card } from 'antd'
import styles from './index.module.less'

interface PathwaysCardProps {
  key: number
  icon: string
  title: string
  count: number
  description: string
}

export const PathwaysCard: FC<PathwaysCardProps> = ({
  key,
  icon,
  title,
  count,
  description,
  children,
}) => {
  return (
    <div className={styles.listViewWrapper} key={key}>
      <Card>
        {children}
        <p>{icon}</p>
        <p>{title}</p>
        <p>{count}</p>
        <p>{description}</p>
      </Card>
    </div>
  )
}
