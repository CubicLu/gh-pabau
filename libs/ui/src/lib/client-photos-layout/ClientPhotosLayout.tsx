import React, { FC } from 'react'
import styles from './ClientPhotosLayout.module.less'
import { AlbumProps, GalleryView, ImageProps } from '@pabau/ui'

export interface ClientPhotosLayoutProps {
  albumList: AlbumProps
  images: ImageProps[]
  onAlbumClick?: (albumId: number, table: boolean) => void
  loadMorePhotos?: (albumId: number, page?: number) => void
  lazyLoading?: boolean
  pageLoading?: boolean
  gridImagesLimit?: number
  currentTablePage?: number
  tablePageSize?: number
  onPageChange?: (page: number) => void
  tableImages?: ImageProps[]
  onViewChange?: (view: boolean) => void
  pageSizeChange?: (size: number) => void
}

export const ClientPhotosLayout: FC<ClientPhotosLayoutProps> = ({
  albumList = {
    album: [],
    albumTitle: '',
    id: 0,
    albumImage: [],
    imageCount: 0,
  },
  images = [],
  onAlbumClick,
  loadMorePhotos,
  lazyLoading = false,
  pageLoading = false,
  gridImagesLimit = 20,
  currentTablePage = 1,
  tablePageSize = 20,
  onPageChange,
  tableImages = [],
  onViewChange,
  pageSizeChange,
}) => {
  return (
    <div className={styles.clientLayout}>
      <GalleryView
        albumList={albumList}
        images={images}
        onAlbumClick={onAlbumClick}
        loadMorePhotos={loadMorePhotos}
        lazyLoading={lazyLoading}
        pageLoading={pageLoading}
        gridImagesLimit={gridImagesLimit}
        currentTablePage={currentTablePage}
        tablePageSize={tablePageSize}
        onPageChange={onPageChange}
        tableImages={tableImages}
        onViewChange={onViewChange}
        pageSizeChange={pageSizeChange}
      />
    </div>
  )
}

export default ClientPhotosLayout
