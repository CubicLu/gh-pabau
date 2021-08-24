import React, { FC } from 'react'
import styles from './AlbumHover.module.less'

interface ImageItem {
  src: string
  name: string
}

export interface AlbumHoverProps {
  imageItems: ImageItem[]
  width?: string
  height?: string
}

export const AlbumHover: FC<AlbumHoverProps> = ({
  imageItems,
  width = '1fr',
  height = '1fr',
}) => {
  return (
    <div className={styles.albumHoverContainer} style={{ width, height }}>
      {imageItems.slice(0, 3).map((image, index) => (
        <div
          key={`album-hover-${index}`}
          style={{ backgroundImage: `url(${image.src})` }}
        />
      ))}
      {[0, 1, 2, 3].slice(0, 4 - imageItems.length - 1).map((_, index) => (
        <div key={`album-hover-${imageItems.length + index}`} />
      ))}
    </div>
  )
}

export default AlbumHover
