import React, { FC, useEffect, useState } from 'react'
import { ImageViewer, ImageViewerAlbum } from '@pabau/ui'
import dayjs from 'dayjs'
import {
  useGetPhotoAlbumsQuery,
  useGetPhotoAlbumLazyQuery,
  useGetUncatPhotosQuery,
} from '@pabau/graphql'

export interface PhotoStudioProps {
  visible?: boolean
  setVisible?: () => void
  title?: string
  photoId?: number
  albumId?: number
  contactId: number
}

export const PhotoStudio: FC<PhotoStudioProps> = ({
  visible = false,
  setVisible,
  title,
  photoId,
  albumId,
  contactId,
}) => {
  const [totalAlbums, setTotalAlbums] = useState<ImageViewerAlbum[]>()
  const [currentAlbumData, setCurrentAlbumData] = useState<ImageViewerAlbum>()
  const [nonAlbumPhotos, setNonAlbumPhotos] = useState(null)

  const { data: dUnCatPhotos } = useGetUncatPhotosQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
    },
  })

  const { data: dAlbums, loading: dAlbumsLoading } = useGetPhotoAlbumsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
    },
  })

  const [
    getCurrentAlbumData,
    { data: dCurrentAlbum, loading: dCurrentAlbumloading },
  ] = useGetPhotoAlbumLazyQuery({
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (dUnCatPhotos?.findManyContactAttachment?.length > 0) {
      setNonAlbumPhotos(dUnCatPhotos?.findManyContactAttachment)
    }
  }, [dUnCatPhotos])

  useEffect(() => {
    if (dAlbums && !dAlbumsLoading) {
      const dt: ImageViewerAlbum[] = dAlbums?.findManyPhotoAlbum?.map((el) => {
        return {
          id: el?.id,
          name: el?.name,
          imageCount: el?.imageCount?.imageList,
        }
      })
      if (dUnCatPhotos?.findManyContactAttachment?.length) {
        dt.push({
          id: null,
          name: 'Uncategorized',
          imageCount: dUnCatPhotos?.findManyContactAttachment?.length,
        })
      }
      setTotalAlbums(dt)
    }
  }, [dAlbums, dAlbumsLoading, dUnCatPhotos])

  useEffect(() => {
    if (contactId) {
      let cAlbumId = albumId || null
      if (!cAlbumId && !photoId) {
        cAlbumId = dAlbums?.findManyPhotoAlbum?.[0]?.id
      }
      if (cAlbumId) {
        getCurrentAlbumData({
          variables: {
            albumId: cAlbumId,
            contactId: contactId,
          },
        })
      }
    }
  }, [dAlbums, photoId, albumId, contactId, getCurrentAlbumData])

  useEffect(() => {
    if (dCurrentAlbum && !dCurrentAlbumloading) {
      const imageList = dCurrentAlbum?.findFirstPhotoAlbum?.imageList?.map(
        (el) => {
          return {
            ...el,
            date: dayjs(new Date(el?.date * 1000)).format('YYYY-MM-DD'),
            origin: el?.origin?.includes('https')
              ? el?.origin
              : `https://cdn.pabau.com/cdn/attachments/${el?.origin}`,
          }
        }
      )
      const currentAlbum: ImageViewerAlbum = {
        id: dCurrentAlbum?.findFirstPhotoAlbum?.id,
        name: dCurrentAlbum?.findFirstPhotoAlbum?.name,
        imageCount: dCurrentAlbum?.findFirstPhotoAlbum?.imageCount?.imageList,
        imageList: imageList,
      }
      setCurrentAlbumData(currentAlbum)
    }
  }, [albumId, dCurrentAlbum, dCurrentAlbumloading, nonAlbumPhotos])

  useEffect(() => {
    if (!albumId && nonAlbumPhotos?.length > 0) {
      const imageList = nonAlbumPhotos?.map((el) => {
        return {
          ...el,
          date: dayjs(new Date(el?.date * 1000)).format('YYYY-MM-DD'),
          origin: el?.origin?.includes('https')
            ? el?.origin
            : `https://cdn.pabau.com/cdn/attachments/${el?.origin}`,
        }
      })
      const currentAlbum: ImageViewerAlbum = {
        id: null,
        name: 'Uncategorized',
        imageCount: nonAlbumPhotos?.length,
        imageList: imageList,
      }
      setCurrentAlbumData(currentAlbum)
    }
  }, [albumId, nonAlbumPhotos])

  const onAlbumSelect = (data) => {
    if (data?.id !== null) {
      getCurrentAlbumData({
        variables: {
          albumId: data?.id,
          contactId: contactId,
        },
      })
    } else {
      const imageList = nonAlbumPhotos?.map((el) => {
        return {
          ...el,
          date: dayjs(new Date(el?.date * 1000)).format('YYYY-MM-DD'),
          origin: el?.origin?.includes('https')
            ? el?.origin
            : `https://cdn.pabau.com/cdn/attachments/${el?.origin}`,
        }
      })
      const currentAlbum: ImageViewerAlbum = {
        id: null,
        name: 'Uncategorized',
        imageCount: nonAlbumPhotos?.length,
        imageList: imageList,
      }
      setCurrentAlbumData(currentAlbum)
    }
  }

  return (
    <ImageViewer
      visible={visible}
      albums={totalAlbums}
      currentAlbum={currentAlbumData}
      selectedPhotoId={photoId}
      onAlbumSelect={onAlbumSelect}
      onClose={setVisible}
      title={title || 'Title'}
    />
  )
}

export default PhotoStudio
