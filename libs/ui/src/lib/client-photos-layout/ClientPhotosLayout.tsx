import React, { FC, useState, useEffect } from 'react'
import styles from './ClientPhotosLayout.module.less'
import { AlbumProps, GalleryView, ImageProps } from '@pabau/ui'
import backMassage from '../../assets/images/gallery-album/image1.jpg'
import backPlain from '../../assets/images/gallery-album/image2.jpg'
import sholder from '../../assets/images/gallery-album/image3.png'
import eyeDark from '../../assets/images/gallery-album/image4.png'
import handsMassage from '../../assets/images/gallery-album/image5.jpg'
import necked from '../../assets/images/gallery-album/image6.jpg'
import backMassage2 from '../../assets/images/gallery-album/image8.jpg'
import back from '../../assets/images/gallery-album/image9.jpg'
import face from '../../assets/images/gallery-album/image11.jpg'
import facial from '../../assets/images/gallery-album/image12.jpg'
import backs from '../../assets/images/gallery-album/image10.jpg'

export interface ClientPhotosLayoutProps {
  isEmpty?: boolean
  albumList?: AlbumProps
  unCatImagesAlbum?: ImageProps[]
}

export const ClientPhotosLayout: FC<ClientPhotosLayoutProps> = ({
  albumList,
  unCatImagesAlbum = [],
}) => {
  return (
    <div className={styles.clientLayout}>
      <GalleryView
        albumList={albumList as AlbumProps}
        images={unCatImagesAlbum}
        listImages={unCatImagesAlbum}
      />
    </div>
  )
}

export default ClientPhotosLayout
