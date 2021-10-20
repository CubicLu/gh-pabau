import React, { FC } from 'react'
import styles from './Tile.module.less'

interface TileP {
  icon: React.ReactNode
  text: string
  count: number
}

const Tile: FC<TileP> = ({ icon, text, count }) => {
  return (
    <div className={styles.tileContainer}>
      <div className={styles.iconCenter}>{icon}</div>
      <div className={styles.textContainer}>
        <span>{text}</span>
        <p>{count}</p>
      </div>
    </div>
  )
}

export default Tile
