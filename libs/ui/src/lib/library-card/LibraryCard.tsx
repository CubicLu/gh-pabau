import React, { FC, useRef } from 'react'
import { PabauPlus } from '@pabau/ui'
import { FileProtectOutlined } from '@ant-design/icons'
import styles from './LibraryCard.module.less'

export interface LibraryCardProps {
  isPlus?: boolean
  title: string | number
  bundleCount?: number
  onClick?: () => void
}

export const LibraryCard: FC<LibraryCardProps> = ({
  isPlus = false,
  title,
  bundleCount = 0,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const onCardClick = (e) => {
    if (e.target !== cardRef?.current) {
      return
    }
    onClick?.()
  }

  return (
    <div className={styles.libraryCard} ref={cardRef} onClick={onCardClick}>
      <div>
        <span>
          <FileProtectOutlined color="#9292A3;" />
        </span>
        {isPlus && <PabauPlus label="Plus" modalType="Care" />}
      </div>
      <h4>{title}</h4>
      <p>{bundleCount}</p>
    </div>
  )
}

export default LibraryCard
