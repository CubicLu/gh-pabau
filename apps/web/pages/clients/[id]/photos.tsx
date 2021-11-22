import React, { FC, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { cdnURL } from '../../../baseUrl'
import dayjs from 'dayjs'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import axios from 'axios'
import {
  AlbumProps,
  ImageProps,
  ClientPhotosLayout,
  UploadingImageProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import PhotoStudio from '../../../components/ClientCard/PhotoStudio'
import {
  useGetAlbumPhotosQuery,
  GetAlbumPhotosDocument,
  useGetPhotoAlbumsQuery,
  GetPhotoAlbumsDocument,
  useCountAlbumPhotosQuery,
  CountAlbumPhotosDocument,
  useGetAlbumPhotosLazyQuery,
  useGetPhotoAlbumsLazyQuery,
  useCreateContactPhotoMutation,
  useCreateOnePhotoAlbumMutation,
  useUpdateOnePhotoAlbumMutation,
  useDeleteContactAlbumMutation,
  useMoveContactAttachmentsMutation,
  useCreateContactPhotoWithoutAlbumMutation,
  useDeleteManyContactPhotoMutation,
  useDeleteContactPhotoMutation,
} from '@pabau/graphql'

const baseURL = `${cdnURL}/v2/api/contact/`
const attachmentsBaseUrl = `${cdnURL}/cdn/attachments/`

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

const albumFinder = (albums, albumId) => {
  const album = albums?.find((el) => {
    if (el?.id === albumId) {
      return el
    } else if (el?.album) albumFinder?.(el?.album, albumId)
    return null
  })
  return album
}

const Photos: FC = () => {
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization:
        localStorage?.getItem('token') &&
        `Bearer ${localStorage?.getItem('token')?.replaceAll('"', '')}`,
    },
  })

  const { t } = useTranslationI18()
  const router = useRouter()
  const { me } = useUser()
  const [albums, setAlbums] = useState<AlbumProps>()
  const [albumId, setAlbumId] = useState<number>(0)
  const [currAlbumImages, setCurrAlbumImages] = useState<ImageProps[]>(null)
  const [showPhotoStudio, setShowPhotoStudio] = useState(false)
  const [studioAlbumId, setStudioAlbumId] = useState<number>(0)
  const [studioImageId, setStudioImageId] = useState<number>(0)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingImageProps[]>(
    []
  )
  const [paginatedData, setPaginatedData] = useState({
    perPage: 50,
    currentPage: 1,
  })

  const [multipleDelImages, setMultipleDelImages] = useState(0)
  const [singleImgDelLoading, setSingleImgDelLoading] = useState(false)
  const [imagesDeleteLoading, setImagesDeleteLoading] = useState(false)
  const [movingImagesOnAlbumCreate, setMovingImagesOnAlbumCreate] = useState<
    number[]
  >([])

  const [albumCreateLoading, setAlbumCreateLoading] = useState(false)
  const [albumUpdateLoading, setAlbumUpdateLoading] = useState(false)
  const [albumDeleteLoading, setAlbumDeleteLoading] = useState(false)

  const contactId = useMemo(() => {
    return router.query.id ? Number(router.query.id) : 0
  }, [router.query.id])

  const variables = useMemo(() => {
    return {
      contactId: contactId,
      albumId: albumId,
      skip: (paginatedData?.currentPage - 1) * paginatedData?.perPage,
      take: paginatedData?.perPage,
    }
  }, [albumId, contactId, paginatedData?.currentPage, paginatedData?.perPage])

  const { data: albumsData, loading: albumsLoading } = useGetPhotoAlbumsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
    },
  })

  const {
    data: albumImages,
    loading: albumImagesLoading,
  } = useGetAlbumPhotosQuery({
    fetchPolicy: 'network-only',
    variables: variables,
  })

  const { data: unCatImagesCount } = useCountAlbumPhotosQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
      albumId: albumId,
    },
  })

  const [
    getAlbumPhotosManually,
    { data: manualAlbumPhotos, loading: manualAlbumPhotosLoading },
  ] = useGetAlbumPhotosLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getPhotoAlbumsManually,
    { data: manualPhotoAlbums, loading: manualPhotoAlbumsLoading },
  ] = useGetPhotoAlbumsLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [createAlbum] = useCreateOnePhotoAlbumMutation({
    onCompleted({ createOnePhotoAlbum: data }) {
      const cAlbums = { ...albums }
      cAlbums?.album?.push({
        id: data?.id,
        albumTitle: data?.album_name,
        modifiedDate: data?.modified_date,
        imageCount: 0,
        albumImage: [],
        album: [],
      })
      setAlbums(cAlbums)
      setAlbumCreateLoading(false)
      Notification(
        NotificationType?.success,
        `${data?.album_name} created successfully!`
      )

      if (movingImagesOnAlbumCreate?.length > 0) {
        const moveImages = [...movingImagesOnAlbumCreate]
        onImagesMove(data?.id, moveImages)
        setMovingImagesOnAlbumCreate([])
      }
    },
    onError(error) {
      setAlbumCreateLoading(false)
      Notification(NotificationType?.error, error?.message)
    },
  })
  const [updateAlbum] = useUpdateOnePhotoAlbumMutation({
    onCompleted({ updateOnePhotoAlbum: data }) {
      const cAlbums = { ...albums }
      const idx = cAlbums?.album?.findIndex((el) => el?.id === data?.id)
      if (idx !== -1) {
        cAlbums?.album?.splice(idx, 1, {
          id: data?.id,
          albumTitle: data?.album_name,
          modifiedDate: data?.modified_date,
          imageCount: cAlbums[idx]?.imageCount,
          albumImage: cAlbums[idx]?.albumImage,
          album: cAlbums[idx]?.album,
        })
        setAlbums(cAlbums)
      }
      setAlbumUpdateLoading(false)
      Notification(
        NotificationType?.success,
        `${data?.album_name} updated successfully!`
      )
    },
    onError(error) {
      setAlbumUpdateLoading(false)
      Notification(NotificationType?.error, error?.message)
    },
  })
  const [deleteAlbum] = useDeleteContactAlbumMutation({
    onCompleted({ deleteContactAlbum: data }) {
      const cAlbums = { ...albums }
      const idx = cAlbums?.album?.findIndex((el) => el?.id === data?.album)
      if (idx !== -1 && data?.success) {
        const cAlbum = cAlbums?.album?.[idx]
        cAlbums?.album?.splice(idx, 1)
        setAlbums(cAlbums)
        Notification(
          NotificationType?.success,
          `${cAlbum?.albumTitle} deleted successfully!`
        )
      } else {
        const cAlbum = cAlbums?.album?.[idx]
        Notification(
          NotificationType?.error,
          `${cAlbum?.albumTitle} couldn't deleted!`
        )
      }
      setAlbumDeleteLoading(false)
    },
    onError(error) {
      setAlbumDeleteLoading(false)
      Notification(NotificationType?.error, error?.message)
    },
  })

  const [createAttachmentInAlbum] = useCreateContactPhotoMutation({
    onCompleted({ createOneContactAttachment: data }) {
      const path = data?.linkref
      const cAddedFiles = [...uploadingFiles]
      const idx = cAddedFiles?.findIndex((el) => el?.uploadedPath === path)
      if (idx !== -1) {
        const cFile = cAddedFiles[idx]
        cFile.id = data?.id
        cFile.loading = false
        cFile.isUploadCompleted = true
        cAddedFiles.splice(idx, 1, cFile)
        setUploadingFiles(cAddedFiles)
      }
    },
  })

  const [
    createAttachmentOutOfAlbum,
  ] = useCreateContactPhotoWithoutAlbumMutation({
    onCompleted({ createOneContactAttachment: data }) {
      const path = data?.linkref
      const cAddedFiles = [...uploadingFiles]
      const idx = cAddedFiles?.findIndex((el) => el?.uploadedPath === path)
      if (idx !== -1) {
        const cFile = cAddedFiles[idx]
        cFile.id = data?.id
        cFile.loading = false
        cFile.isUploadCompleted = true
        cAddedFiles.splice(idx, 1, cFile)
        setUploadingFiles(cAddedFiles)
      }
    },
  })

  const [deleteOneAttachment] = useDeleteContactPhotoMutation({
    onCompleted({ deleteContactAttachment: data }) {
      setSingleImgDelLoading(() => false)
      if (data?.success) {
        const id = data?.photo
        const cAddedFiles = [...uploadingFiles]
        const idx = cAddedFiles?.findIndex((el) => el?.id === id)
        if (idx !== -1) {
          cAddedFiles.splice(idx, 1)
          setUploadingFiles(cAddedFiles)
        }
        Notification(
          NotificationType.success,
          t('ui.clientcard.photos.notification.delete.success', {
            count: 1,
            suffix: '',
          })
        )
      } else {
        const id = data?.photo
        const cAddedFiles = [...uploadingFiles]
        const idx = cAddedFiles?.findIndex((el) => el?.id === id)
        if (idx !== -1) {
          const cFile = cAddedFiles[idx]
          cFile.loading = false
          cAddedFiles.splice(idx, 1, cFile)
          setUploadingFiles(cAddedFiles)
        }
        Notification(
          NotificationType.error,
          t('ui.clientcard.photos.notification.delete.error', {
            count: 1,
            suffix: '',
          })
        )
      }
    },
    onError() {
      setSingleImgDelLoading(() => false)
      Notification(
        NotificationType.error,
        t('ui.clientcard.photos.notification.delete.error', {
          count: 1,
          suffix: '',
        })
      )
    },
  })

  const [deleteManyAttachments] = useDeleteManyContactPhotoMutation({
    onCompleted({ deleteManyContactAttachment: data }) {
      if (data.success && data.count === multipleDelImages) {
        Notification(
          NotificationType.success,
          t('ui.clientcard.photos.notification.delete.success', {
            count: data?.count,
            suffix: data?.count > 1 ? 's' : '',
          })
        )
        setImagesDeleteLoading(() => false)
      } else {
        if (data.count > 0) {
          Notification(
            NotificationType.success,
            t('ui.clientcard.photos.notification.delete.success', {
              count: data?.count,
              suffix: data?.count > 1 ? 's' : '',
            })
          )
        }
        setImagesDeleteLoading(() => false)
        const leftCount = multipleDelImages - data.count
        Notification(
          NotificationType.error,
          t('ui.clientcard.photos.notification.delete.error', {
            count: leftCount,
            suffix: leftCount > 1 ? 's' : '',
          })
        )
      }
    },
    onError() {
      setImagesDeleteLoading(() => false)
      Notification(
        NotificationType.error,
        t('ui.clientcard.photos.notification.delete.error', {
          count: multipleDelImages,
          suffix: multipleDelImages > 1 ? 's' : '',
        })
      )
    },
  })

  const [moveImageToAlbum] = useMoveContactAttachmentsMutation({
    onCompleted({ moveAttachments: data }) {
      if (data?.success && data?.album !== 0) {
        if (document.querySelector(`#tar${data?.album}`)) {
          document
            ?.querySelector(`#tar${data?.album}`)
            ?.classList?.remove('dropEffect')
        }

        const tarAlbum = albumFinder?.(albums?.album, data?.album)
        Notification(
          NotificationType?.success,
          `Image moved and ${
            tarAlbum?.albumTitle || 'album'
          } updated succesfully!`
        )
      } else {
        Notification(
          NotificationType?.success,
          `Image moved and uncategorized album updated succesfully!`
        )
      }
    },
    onError(error) {
      Notification(NotificationType?.error, error?.message)
    },
  })

  useEffect(() => {
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
      setMultipleDelImages(0)
    }
  }, [albumsData, albumsLoading, unCatImagesCount])

  useEffect(() => {
    if (albumImages?.findManyContactAttachment && !albumImagesLoading) {
      setCurrAlbumImages([])
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
      setTimeout(() => {
        setCurrAlbumImages(images)
      }, 0)
      setMultipleDelImages(0)
    }
  }, [albumImages, albumImagesLoading])

  useEffect(() => {
    if (
      manualAlbumPhotos?.findManyContactAttachment &&
      !manualAlbumPhotosLoading
    ) {
      setCurrAlbumImages(null)
      setTimeout(() => {
        const images = manualAlbumPhotos?.findManyContactAttachment?.map(
          (el) => {
            return {
              id: el?.id,
              img: !el?.origin?.includes('http')
                ? attachmentsBaseUrl + el?.origin
                : el?.origin,
              date: el?.date,
              isSensitive: false,
            }
          }
        )
        setCurrAlbumImages(images)
      }, 0)
    }
  }, [manualAlbumPhotos, manualAlbumPhotosLoading])

  useEffect(() => {
    if (manualPhotoAlbums?.findManyPhotoAlbum && !manualPhotoAlbumsLoading) {
      const innerAlbums = iterateTo(manualPhotoAlbums?.findManyPhotoAlbum)
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
  }, [manualPhotoAlbums, manualPhotoAlbumsLoading, unCatImagesCount])

  const onAlbumCreate = (album: string, moveImages: ImageProps[] = []) => {
    if (moveImages?.length > 0) {
      setMovingImagesOnAlbumCreate(moveImages?.map((el) => el?.id))
    }
    setAlbumCreateLoading(true)
    createAlbum({
      variables: {
        data: {
          album_name: album,
          creation_date: dayjs().format('YYYY-MM-DD'),
          modified_date: dayjs().format('YYYY-MM-DD'),
          Contact: {
            connect: {
              ID: contactId,
            },
          },
          Company: {
            connect: {
              id: me?.company,
            },
          },
        },
      },
    })
  }

  const onAlbumUpdate = (album: AlbumProps) => {
    setAlbumUpdateLoading(true)
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
    })
  }

  const onAlbumDelete = (album: AlbumProps) => {
    setAlbumDeleteLoading(true)
    deleteAlbum({
      variables: {
        id: album?.id,
      },
      refetchQueries: [
        {
          query: GetPhotoAlbumsDocument,
          variables: {
            contactId: contactId,
          },
        },
      ],
    })
  }

  const onImageUpload = async (fileData: UploadingImageProps) => {
    const cAddedFiles = [...uploadingFiles]
    const idx = cAddedFiles?.findIndex((el) => el?.id === fileData?.id)
    if (idx !== -1) {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      const config = {
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          const percAddedFiles = [...uploadingFiles]
          const percIdx = percAddedFiles?.findIndex(
            (el) => el?.id === fileData?.id
          )
          if (percIdx !== -1) {
            const percFile = percAddedFiles[percIdx]
            percFile.uploadPercentage = percentCompleted
            percAddedFiles.splice(percIdx, 1, percFile)
            setUploadingFiles(percAddedFiles)
          }
        },
        cancelToken: source.token,
      }
      const data = new FormData()
      data.append('File', fileData?.file)

      const upStartFiles = [...uploadingFiles]
      const upStartIdx = upStartFiles?.findIndex(
        (el) => el?.id === fileData?.id
      )
      if (upStartIdx !== -1) {
        const uppFile = upStartFiles[upStartIdx]
        uppFile.isUploadStarted = true
        uppFile.uploadPercentage = 0
        uppFile.cancelToken = source
        uppFile.isFailed = false
        upStartFiles.splice(upStartIdx, 1, uppFile)
        setUploadingFiles(upStartFiles)
      }

      await api
        .post('upload-photo', data, config)
        .then((res) => {
          const data = JSON.parse(JSON.stringify(res.data))
          if (data?.success) {
            const upCompFiles = [...uploadingFiles]
            const upCompIdx = upCompFiles?.findIndex(
              (el) => el?.id === fileData?.id
            )
            if (upCompIdx !== -1) {
              const uppCompFile = upCompFiles[upCompIdx]
              uppCompFile.uploadedPath = data?.path
              uppCompFile.loading = true
              upCompFiles.splice(upCompIdx, 1, uppCompFile)
              setUploadingFiles(upCompFiles)
              if (fileData?.albumId > 0) {
                createAttachmentInAlbum({
                  variables: {
                    album_id: albumId,
                    attachment_type: 'contact',
                    attachment_title: uppCompFile.name,
                    contact_id: contactId,
                    date: dayjs().unix(),
                    image_url: data?.path,
                    uploaded_by: me?.user,
                    company_id: me?.company,
                  },
                  refetchQueries: [
                    {
                      query: GetPhotoAlbumsDocument,
                      variables: {
                        contactId: contactId,
                      },
                    },
                    {
                      query: GetAlbumPhotosDocument,
                      variables: variables,
                    },
                  ],
                })
              }
              if (fileData?.albumId === 0) {
                createAttachmentOutOfAlbum({
                  variables: {
                    attachment_type: 'contact',
                    attachment_title: uppCompFile.name,
                    contact_id: contactId,
                    date: dayjs().unix(),
                    image_url: data?.path,
                    uploaded_by: me?.user,
                    company_id: me?.company,
                  },
                  refetchQueries: [
                    {
                      query: GetPhotoAlbumsDocument,
                      variables: {
                        contactId: contactId,
                      },
                    },
                    {
                      query: GetAlbumPhotosDocument,
                      variables: variables,
                    },
                    {
                      query: CountAlbumPhotosDocument,
                      variables: {
                        contactId: contactId,
                        albumId: 0,
                      },
                    },
                  ],
                })
              }
            }
          } else {
            const files = [...uploadingFiles]
            const fileIdx = files?.findIndex((el) => el?.id === fileData?.id)
            if (fileIdx !== -1) {
              const file = files[fileIdx]
              file.isFailed = true
              files.splice(fileIdx, 1, file)
              setUploadingFiles(files)
            }
          }
        })
        .catch(() => {
          const files = [...uploadingFiles]
          const fileIdx = files?.findIndex((el) => el?.id === fileData?.id)
          if (fileIdx !== -1) {
            const file = files[fileIdx]
            file.isFailed = true
            files.splice(fileIdx, 1, file)
            setUploadingFiles(files)
          }
        })
    }
  }

  const onUploadCancel = async (fileData: UploadingImageProps) => {
    const cAddedFiles = [...uploadingFiles]
    const idx = cAddedFiles?.findIndex((el) => el?.id === fileData?.id)
    if (idx !== -1) {
      await fileData?.cancelToken?.cancel()
      cAddedFiles.splice(idx, 1)
      setUploadingFiles(cAddedFiles)
    }
  }

  const onImageRemove = (imageIds: number[]) => {
    if (imageIds?.length > 0) {
      if (imageIds?.length === 1) {
        const cAddedFiles = [...uploadingFiles]
        const idx = cAddedFiles?.findIndex((el) => el?.id === imageIds[0])
        if (idx !== -1) {
          const cFile = cAddedFiles[idx]
          cFile.loading = true
          cAddedFiles.splice(idx, 1, cFile)
          setUploadingFiles(cAddedFiles)
        }
        const cCurrAlbumImages = [...currAlbumImages]
        const cImageIndex = cCurrAlbumImages?.findIndex(
          (el) => el?.id === imageIds[0]
        )
        setSingleImgDelLoading(() => true)
        deleteOneAttachment({
          variables: {
            id: imageIds[0],
          },
          refetchQueries: [
            {
              query: GetPhotoAlbumsDocument,
              variables: {
                contactId: contactId,
              },
            },
            cImageIndex !== -1 && {
              query: GetAlbumPhotosDocument,
              variables: variables,
            },
            albumId === 0 && {
              query: CountAlbumPhotosDocument,
              variables: {
                contactId: contactId,
                albumId: 0,
              },
            },
          ],
        })
      } else {
        setMultipleDelImages(imageIds?.filter((el) => el !== 0)?.length)
        setImagesDeleteLoading(() => true)
        deleteManyAttachments({
          variables: {
            ids: imageIds,
          },
          refetchQueries: [
            {
              query: GetPhotoAlbumsDocument,
              variables: {
                contactId: contactId,
              },
            },
            {
              query: GetAlbumPhotosDocument,
              variables: variables,
            },
            albumId === 0 && {
              query: CountAlbumPhotosDocument,
              variables: {
                contactId: contactId,
                albumId: 0,
              },
            },
          ],
        })
      }
    }
  }

  const onImagesMove = (album: number, images: number[]) => {
    if ((album === 0 || album) && images?.length > 0) {
      moveImageToAlbum({
        variables: {
          album: album,
          images: images,
        },
        refetchQueries: [
          {
            query: GetPhotoAlbumsDocument,
            variables: {
              contactId: contactId,
            },
          },
          {
            query: GetAlbumPhotosDocument,
            variables: variables,
          },
          albumId === 0 && {
            query: CountAlbumPhotosDocument,
            variables: {
              contactId: contactId,
              albumId: 0,
            },
          },
        ],
      })
    }
  }

  const openPhotoStudio = (album: number, image: number) => {
    setStudioAlbumId(album)
    setStudioImageId(image)
    setShowPhotoStudio((e) => !e)
  }

  return (
    <>
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
          albumCreateLoading={albumCreateLoading}
          onAlbumUpdate={onAlbumUpdate}
          albumUpdateLoading={albumUpdateLoading}
          onAlbumDelete={onAlbumDelete}
          albumDeleteLoading={albumDeleteLoading}
          onImageUpload={onImageUpload}
          onImageRemove={onImageRemove}
          onUploadCancel={onUploadCancel}
          uploadingImages={uploadingFiles}
          setUploadingImages={setUploadingFiles}
          onImagesMove={onImagesMove}
          openImageStudio={openPhotoStudio}
          imagesDeleteLoading={imagesDeleteLoading}
          singleImgDelLoading={singleImgDelLoading}
        />
      </ClientCardLayout>
      {router.query.id && showPhotoStudio && (
        <PhotoStudio
          visible={showPhotoStudio}
          contactId={Number(router.query.id)}
          albumId={studioAlbumId}
          photoId={studioImageId}
          setVisible={() => {
            setShowPhotoStudio((e) => !e)
            setStudioAlbumId(0)
            setStudioImageId(0)
          }}
          fetchFunc={() => {
            getAlbumPhotosManually({
              variables: {
                contactId: router.query.id ? Number(router.query.id) : 0,
                albumId: albumId,
                skip: (paginatedData?.currentPage - 1) * paginatedData?.perPage,
                take: paginatedData?.perPage,
              },
            })
            getPhotoAlbumsManually({
              variables: {
                contactId: router.query.id ? Number(router.query.id) : 0,
              },
            })
          }}
        />
      )}
    </>
  )
}

export default Photos
