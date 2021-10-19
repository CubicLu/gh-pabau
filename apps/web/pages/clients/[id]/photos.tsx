import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { cdnURL } from '../../../baseUrl'
import dayjs from 'dayjs'
import { useUser } from '../../../context/UserContext'
import { AlbumProps, ImageProps, ClientPhotosLayout } from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import {
  useGetPhotoAlbumsQuery,
  GetPhotoAlbumsDocument,
  useGetAlbumPhotosQuery,
  useCountAlbumPhotosQuery,
  useCreateOnePhotoAlbumMutation,
  useUpdateOnePhotoAlbumMutation,
  useDeleteOnePhotoAlbumMutation,
} from '@pabau/graphql'
const attachmentsBaseUrl = `${cdnURL}/cdn/attachments/`

const Photos = () => {
  const router = useRouter()
  const { me } = useUser()
  const [albums, setAlbums] = useState<AlbumProps>()
  const [albumId, setAlbumId] = useState<number>(0)
  const [currAlbumImages, setCurrAlbumImages] = useState<ImageProps[]>(null)
  const [paginatedData, setPaginatedData] = useState({
    perPage: 50,
    currentPage: 1,
  })

  const { data: albumsData, loading: albumsLoading } = useGetPhotoAlbumsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
    },
  })

  const {
    data: albumImages,
    loading: albumImagesLoading,
  } = useGetAlbumPhotosQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
      albumId: albumId,
      skip: (paginatedData?.currentPage - 1) * paginatedData?.perPage,
      take: paginatedData?.perPage,
    },
  })

  const { data: unCatImagesCount } = useCountAlbumPhotosQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
      albumId: 0,
    },
  })

  const [createAlbum] = useCreateOnePhotoAlbumMutation()
  const [updateAlbum] = useUpdateOnePhotoAlbumMutation()
  const [deleteAlbum] = useDeleteOnePhotoAlbumMutation()

  useEffect(() => {
    const iterateTo = (dataArr) => {
      return dataArr?.map((item) => {
        return {
          id: item?.id,
          albumTitle: item?.name,
          modifiedDate: item?.modified_date || item?.creation_date,
          imageCount: item?.imageCount?.imageList,
          albumImage: item?.Photos?.map((el) => {
            return {
              id: el?.id,
              date: el?.date,
              img: !el?.linkref?.includes('http')
                ? attachmentsBaseUrl + el?.linkref
                : el?.linkref,
              isSensitive: false,
            }
          }),
          album: item?.albums ? iterateTo(item?.albums) : [],
        }
      })
    }
    if (albumsData?.findManyPhotoAlbum && !albumsLoading) {
      const innerAlbums = iterateTo(albumsData?.findManyPhotoAlbum)
      const cAlbums = {
        id: 0,
        albumTitle:
          unCatImagesCount?.aggregateContactAttachment?.count?._all > 0
            ? 'Uncategorized'
            : '',
        imageCount:
          unCatImagesCount?.aggregateContactAttachment?.count?._all || 0,
        albumImage: [],
        modifiedDate: '',
        album: innerAlbums,
      }
      setAlbums(cAlbums)
    }
  }, [albumsData, albumsLoading, unCatImagesCount])

  useEffect(() => {
    if (albumImages?.findManyContactAttachment && !albumImagesLoading) {
      const images = albumImages?.findManyContactAttachment?.map((el) => {
        return {
          id: el?.id,
          img: !el?.origin?.includes('http')
            ? attachmentsBaseUrl + el?.origin
            : el?.origin,
          date: el?.date,
          isSensitive: false,
        }
      })
      setCurrAlbumImages(images)
    }
  }, [albumImages, albumImagesLoading])

  const onAlbumCreate = (album: string) => {
    createAlbum({
      variables: {
        data: {
          album_name: album,
          creation_date: dayjs().format('YYYY-MM-DD'),
          modified_date: dayjs().format('YYYY-MM-DD'),
          Contact: {
            connect: {
              ID: Number(router.query.id),
            },
          },
          Company: {
            connect: {
              id: me?.company,
            },
          },
        },
      },
      refetchQueries: [
        {
          query: GetPhotoAlbumsDocument,
          variables: {
            contactId: router.query.id ? Number(router.query.id) : 0,
          },
        },
      ],
    })
  }

  const onAlbumUpdate = (album: AlbumProps) => {
    updateAlbum({
      variables: {
        where: {
          id: album?.id,
        },
        data: {
          album_name: { set: album?.albumTitle },
          modified_date: { set: dayjs().format('YYYY-MM-DD') },
        },
      },
      refetchQueries: [
        {
          query: GetPhotoAlbumsDocument,
          variables: {
            contactId: router.query.id ? Number(router.query.id) : 0,
          },
        },
      ],
    })
  }

  const onAlbumDelete = (album: AlbumProps) => {
    if (album.imageCount <= 0) {
      deleteAlbum({
        variables: {
          where: {
            id: album?.id,
          },
        },
        refetchQueries: [
          {
            query: GetPhotoAlbumsDocument,
            variables: {
              contactId: router.query.id ? Number(router.query.id) : 0,
            },
          },
        ],
      })
    } else {
      console.log('KUCH TO GARH BARH HY')
    }
  }

  return (
    <ClientCardLayout clientId={Number(router.query.id)} activeTab="photos">
      <ClientPhotosLayout
        albumList={albums}
        images={currAlbumImages}
        onAlbumClick={(id) => {
          if (id !== albumId) {
            setAlbumId(id)
            setPaginatedData({
              ...paginatedData,
              currentPage: 1,
            })
          }
        }}
        loading={albumImagesLoading}
        paginateData={{
          currentPage: paginatedData?.currentPage,
          pageSize: paginatedData?.perPage,
          onPageChange: (page) => {
            setPaginatedData({ ...paginatedData, currentPage: page })
          },
          onPageSizeChange: (size) => {
            setPaginatedData({
              ...paginatedData,
              perPage: size,
            })
          },
        }}
        onAlbumCreate={onAlbumCreate}
        onAlbumUpdate={onAlbumUpdate}
        onAlbumDelete={onAlbumDelete}
      />
    </ClientCardLayout>
  )
}

export default Photos
