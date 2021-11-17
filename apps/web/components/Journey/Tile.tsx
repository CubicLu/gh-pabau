import React, { FC } from 'react'
import styles from './Tile.module.less'
import classNames from 'classnames'

interface TileP {
  icon?: React.ReactNode
  text: string
  count: number
  name?: string
  onTileClick?: (tile: string) => void
  filterStatus?: string
}

const Tile: FC<TileP> = ({
  icon,
  text,
  count,
  name,
  onTileClick,
  filterStatus,
}) => {
  return (
    <div
      className={classNames(styles.tileContainer, {
        [styles.selectedTile]: name === filterStatus,
      })}
      onClick={() => onTileClick?.(name)}
    >
      <div className={styles.iconCenter}>{icon}</div>
      <div className={styles.textContainer}>
        <span>{text}</span>
        <p>{count}</p>
      </div>
    </div>
  )
}

export default Tile
