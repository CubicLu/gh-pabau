import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AlbumProps, ImageProps, ClientPhotosLayout } from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import {
  useGetPhotoAlbumsQuery,
  useGetAlbumPhotosQuery,
  useCountAlbumPhotosQuery,
} from '@pabau/graphql'
const attachmentsBaseUrl = 'https://cdn.pabau.com/cdn/attachments/'

const Photos = () => {
  const router = useRouter()
  const [albums, setAlbums] = useState<AlbumProps>()
  const [albumId, setAlbumId] = useState<number>(0)
  const [currAlbumImages, setCurrAlbumImages] = useState<ImageProps[]>(null)
  const [tableImages, setTableImages] = useState<ImageProps[]>(null)
  const [listView, setListView] = useState(false)

  const [lazyLoading, setLazyLoading] = useState({
    perPage: 32,
    currentPage: 1,
  })

  const [paginatedData, setPaginatedData] = useState({
    perPage: 20,
    currentPage: 1,
  })

  const { data: albumsData, loading: albumsLoading } = useGetPhotoAlbumsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
    },
  })

  const {
    data: lazyAlbumImages,
    loading: lazyAlbumImagesLoading,
  } = useGetAlbumPhotosQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: router.query.id ? Number(router.query.id) : 0,
      albumId: albumId,
      skip: (lazyLoading?.currentPage - 1) * lazyLoading?.perPage,
      take: lazyLoading?.perPage,
    },
  })

  const {
    data: paginatedAlbumImages,
    loading: paginatedAlbumImagesLoading,
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
              img: !el?.linkref?.includes('href')
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
        album: innerAlbums,
      }
      setAlbums(cAlbums)
    }
  }, [albumsData, albumsLoading, unCatImagesCount])

  useEffect(() => {
    if (
      lazyAlbumImages?.findManyContactAttachment &&
      !lazyAlbumImagesLoading &&
      !listView
    ) {
      const images = lazyAlbumImages?.findManyContactAttachment?.map((el) => {
        return {
          id: el?.id,
          img: !el?.origin?.includes('href')
            ? attachmentsBaseUrl + el?.origin
            : el?.origin,
          date: el?.date,
          isSensitive: false,
        }
      })
      const cImages = currAlbumImages || []
      setCurrAlbumImages([...cImages, ...images])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyAlbumImages, lazyAlbumImagesLoading, listView])

  useEffect(() => {
    if (
      paginatedAlbumImages?.findManyContactAttachment &&
      !paginatedAlbumImagesLoading &&
      listView
    ) {
      const images = paginatedAlbumImages?.findManyContactAttachment?.map(
        (el) => {
          return {
            id: el?.id,
            img: !el?.origin?.includes('href')
              ? attachmentsBaseUrl + el?.origin
              : el?.origin,
            date: el?.date,
            isSensitive: false,
          }
        }
      )
      setTableImages(images)
    }
  }, [listView, paginatedAlbumImages, paginatedAlbumImagesLoading])

  return (
    <ClientCardLayout clientId={Number(router.query.id)} activeTab="photos">
      <ClientPhotosLayout
        albumList={albums}
        images={currAlbumImages}
        onAlbumClick={(id, listView) => {
          if (id !== albumId) {
            setAlbumId(id)
            if (listView) {
              setTableImages([])
              setPaginatedData({
                ...paginatedData,
                currentPage: 1,
              })
            } else {
              setCurrAlbumImages([])
              setLazyLoading({
                ...lazyLoading,
                currentPage: 1,
              })
            }
          }
        }}
        loadMorePhotos={(id, page = null) => {
          setAlbumId(id)
          if (page) {
            setPaginatedData({
              ...paginatedData,
              currentPage: page,
            })
          } else {
            setLazyLoading({
              ...lazyLoading,
              currentPage: lazyLoading.currentPage + 1,
            })
          }
        }}
        onViewChange={(view) => {
          if (!view) {
            setCurrAlbumImages([])
            setLazyLoading({
              ...lazyLoading,
              currentPage: 1,
            })
          } else {
            setTableImages(null)
            setPaginatedData({
              ...paginatedData,
              currentPage: 1,
            })
          }
          setListView(view)
        }}
        currentTablePage={paginatedData?.currentPage}
        tablePageSize={paginatedData?.perPage}
        onPageChange={(page) =>
          setPaginatedData({ ...paginatedData, currentPage: page })
        }
        lazyLoading={lazyAlbumImagesLoading}
        pageLoading={paginatedAlbumImagesLoading}
        gridImagesLimit={lazyLoading?.perPage}
        tableImages={tableImages}
        pageSizeChange={(perPage) => {
          setPaginatedData({ ...paginatedData, currentPage: 1, perPage })
        }}
      />
    </ClientCardLayout>
  )
}

export default Photos
