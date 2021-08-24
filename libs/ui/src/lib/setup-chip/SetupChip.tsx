import React, { FC, ReactElement } from 'react'
import { Skeleton } from 'antd'

import styles from './SetupChip.module.less'

export interface SetupChipProps {
  title: string
  subTitle: string
  count: string
  image: ReactElement
  onClick: (index: string) => void
  error?: boolean
  loading?: boolean
}

export const SetupChip: FC<SetupChipProps> = ({
  title,
  subTitle,
  image,
  count,
  onClick,
  error = false,
  loading,
}) => {
  return (
    <div className={styles.chipBox} onClick={() => onClick(title)}>
      <div className={styles.chipImage}>{image}</div>
      <div>
        <div className={styles.chipTitle}>{title}</div>
        {loading && (
          <Skeleton.Input
            style={{ width: 120, height: 15 }}
            size={'small'}
            active={true}
          />
        )}
        {!error && !loading && (
          <div className={styles.chipSubTitle}>{`${count} ${subTitle}`}</div>
        )}
      </div>
    </div>
  )
}

export default SetupChip
