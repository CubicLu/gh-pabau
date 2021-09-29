import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ClientPhotosLayout, AlbumProps } from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useGetPhotoAlbumsQuery, useGetUncatPhotosQuery } from '@pabau/graphql'
const attachmentsBaseUrl = 'https://cdn.pabau.com/cdn/attachments/'

const Photos = () => {
  const router = useRouter()
  const [albums, setAlbums] = useState<AlbumProps>()
  const [nonAlbumImages, setNonAlbumImages] = useState<AlbumProps>()

  const { data: albumsData, loading: albumsLoading } = useGetPhotoAlbumsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
    },
  })

  const {
    data: nonAlbumsData,
    loading: nonAlbumsLoading,
  } = useGetUncatPhotosQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
    },
  })

  useEffect(() => {
    const iterateTo = (dataArr) => {
      return dataArr?.map((item) => {
        return {
          id: item?.id,
          albumTitle: item?.name,
          albumImages: item?.Photos?.map((el) => {
            return {
              id: el?.id,
              img: attachmentsBaseUrl + el?.linkref,
            }
          }),
          albums: item?.albums ? iterateTo(item?.albums) : [],
        }
      })
    }
    if (albumsData?.findManyPhotoAlbum && !albumsLoading) {
      const d = iterateTo(albumsData?.findManyPhotoAlbum)
      const cAlbums = {
        id: 'null',
        albumTitle: 'Album',
        albumImages: [],
        albums: d,
      }
      setAlbums(cAlbums)
    }
  }, [albumsData, albumsLoading])

  useEffect(() => {
    if (nonAlbumsData?.findManyContactAttachment && !nonAlbumsLoading) {
      const cNonAlbum = {
        id: 0,
        albumTitle: 'Uncategorized',
        albumImages: nonAlbumsData?.findManyContactAttachment?.map((el) => {
          return {
            id: el?.id,
            img: attachmentsBaseUrl + el?.origin,
            isSensitive: false,
          }
        }),
        albums: [],
      }
      setNonAlbumImages(cNonAlbum)
    }
  }, [nonAlbumsData, nonAlbumsLoading])

  return (
    <ClientCardLayout clientId={Number(router.query.id)} activeTab="photos">
      <ClientPhotosLayout
        albumList={albums}
        unCatImagesAlbum={nonAlbumImages}
      />
    </ClientCardLayout>
  )
}

export default Photos
