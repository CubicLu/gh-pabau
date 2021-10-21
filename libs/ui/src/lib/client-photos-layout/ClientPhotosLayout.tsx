import React, { FC } from 'react'
import styles from './ClientPhotosLayout.module.less'
import { GalleryView, GalleryProps } from '@pabau/ui'

export const ClientPhotosLayout: FC<GalleryProps> = ({
  albumList = {
    album: [],
    albumTitle: '',
    id: 0,
    albumImage: [],
    modifiedDate: '',
    imageCount: 0,
  },
  images = [],
  ...props
}) => {
  return (
    <div className={styles.clientLayout}>
      <GalleryView albumList={albumList} images={images} {...props} />
    </div>
  )
}

export default ClientPhotosLayout
