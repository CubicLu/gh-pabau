import React, { FC, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { cdnURL } from '../../../baseUrl'
import dayjs from 'dayjs'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import axios from 'axios'
import {
  FolderProps,
  FolderContentProps,
  ClientDocumentsLayout,
  UploadingImageProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { getDocument } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'

import {
  GetFolderDocumentsDocument,
  useGetFolderDocumentsQuery,
  useGetFolderDocumentsLazyQuery,
  CountFolderDocumentsDocument,
  useCountFolderDocumentsQuery,
  GetFoldersDocument,
  useGetFoldersQuery,
  useGetFoldersLazyQuery,
  useCreateContactPhotoMutation,
  useCreateOnePhotoAlbumMutation as useCreateFolderMutation,
  useUpdateOnePhotoAlbumMutation as useUpdateFolderMutation,
  useDeleteOnePhotoAlbumMutation as useDeleteFolderMutation,
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
      folderTitle: item?.name,
      modifiedDate: item?.modified_date || item?.creation_date,
      contentCount: item?.documentCount?.documentList,
      folderImage: item?.Photos?.map((el) => {
        return {
          id: el?.id,
          date: el?.date,
          img: !el?.linkref?.includes('http')
            ? attachmentsBaseUrl + el?.linkref
            : el?.linkref,
          isSensitive: false,
        }
      }),
      folder: item?.folders ? iterateTo(item?.folders) : [],
    }
  })
}

const folderFinder = (folders, folderId) => {
  const folder = folders?.find((el) => {
    if (el?.id === folderId) {
      return el
    } else if (el?.folder) folderFinder?.(el?.folder, folderId)
    return null
  })
  return folder
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
  const [folders, setFolders] = useState<FolderProps>()
  const [folderId, setFolderId] = useState<number>(0)
  const [currFolderDocuments, setCurrFolderDocuments] = useState<
    FolderContentProps[]
  >(null)
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

  const [multipeDelDocs, setMultipleDelDocs] = useState(0)
  const [singleDocDelLoading, setSingleDocDelLoading] = useState(false)
  const [docsDeleteLoading, setDocsDeleteLoading] = useState(false)
  const [movingDocsOnFolderCreate, setMovingDocsOnFolderCreate] = useState<
    number[]
  >([])

  const [folderCreateLoading, setFolderCreateLoading] = useState(false)
  const [folderUpdateLoading, setFolderUpdateLoading] = useState(false)
  const [folderDeleteLoading, setFolderDeleteLoading] = useState(false)

  const contactId = useMemo(() => {
    return router.query.id ? Number(router.query.id) : 0
  }, [router.query.id])

  const variables = useMemo(() => {
    return {
      contactId: contactId,
      folderId: folderId,
      skip: (paginatedData?.currentPage - 1) * paginatedData?.perPage,
      take: paginatedData?.perPage,
    }
  }, [folderId, contactId, paginatedData?.currentPage, paginatedData?.perPage])

  const { data: foldersData, loading: foldersLoading } = useGetFoldersQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
    },
  })

  const {
    data: folderDocuments,
    loading: folderDocsLoading,
  } = useGetFolderDocumentsQuery({
    fetchPolicy: 'network-only',
    variables: variables,
  })

  const { data: unCatImagesCount } = useCountFolderDocumentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
      folderId: folderId,
    },
  })

  const [
    getFolderDocsManually,
    { data: manualFolderDocs, loading: manualFolderDocsLoading },
  ] = useGetFolderDocumentsLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getFoldersManually,
    { data: manualFolders, loading: manualFoldersLoading },
  ] = useGetFoldersLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [createFolder] = useCreateFolderMutation({
    onCompleted({ createOnePhotoAlbum: data }) {
      const cFolders = { ...folders }
      cFolders?.folder?.push({
        id: data?.id,
        folderTitle: data?.album_name,
        modifiedDate: data?.modified_date,
        contentCount: 0,
        folderContent: [],
        folder: [],
      })
      setFolders(cFolders)
      setFolderCreateLoading(false)
      Notification(
        NotificationType?.success,
        `${data?.album_name} created successfully!`
      )

      if (movingDocsOnFolderCreate?.length > 0) {
        const moveImages = [...movingDocsOnFolderCreate]
        onDocumentsMove(data?.id, moveImages)
        setMovingDocsOnFolderCreate([])
      }
    },
    onError(error) {
      setFolderCreateLoading(false)
      Notification(NotificationType?.error, error?.message)
    },
  })
  const [updateFolder] = useUpdateFolderMutation({
    onCompleted({ updateOnePhotoAlbum: data }) {
      const cFolders = { ...folders }
      const idx = cFolders?.folder?.findIndex((el) => el?.id === data?.id)
      if (idx !== -1) {
        cFolders?.folder?.splice(idx, 1, {
          id: data?.id,
          folderTitle: data?.album_name,
          modifiedDate: data?.modified_date,
          contentCount: cFolders[idx]?.imageCount,
          folderContent: cFolders[idx]?.albumImage,
          folder: cFolders[idx]?.album,
        })
        setFolders(cFolders)
      }
      setFolderUpdateLoading(false)
      Notification(
        NotificationType?.success,
        `${data?.album_name} updated successfully!`
      )
    },
    onError(error) {
      setFolderUpdateLoading(false)
      Notification(NotificationType?.error, error?.message)
    },
  })
  const [deleteFolder] = useDeleteFolderMutation({
    onCompleted({ deleteOnePhotoAlbum: data }) {
      const cFolders = { ...folders }
      const idx = cFolders?.folder?.findIndex((el) => el?.id === data?.id)
      if (idx !== -1) {
        cFolders?.folder?.splice(idx, 1)
        setFolders(cFolders)
      }
      setFolderDeleteLoading(false)
      Notification(
        NotificationType?.success,
        `${data?.album_name} deleted successfully!`
      )
    },
    onError(error) {
      setFolderDeleteLoading(false)
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
    createUncategorizedDocument,
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

  const [deleteOneDocument] = useDeleteContactPhotoMutation({
    onCompleted({ deleteContactAttachmentPhoto: data }) {
      setSingleDocDelLoading(() => false)
      if (data?.success) {
        const id = data?.photo
        const cAddedFiles = [...uploadingFiles]
        const idx = cAddedFiles?.findIndex((el) => el?.id === id)
        if (idx !== -1) {
          cAddedFiles.splice(idx, 1)
          setUploadingFiles(cAddedFiles)
        }
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
      }
      Notification(
        NotificationType.success,
        t('ui.clientcard.photos.notification.delete.success', {
          count: 1,
          suffix: '',
        })
      )
    },
    onError() {
      setSingleDocDelLoading(() => false)
      Notification(
        NotificationType.error,
        t('ui.clientcard.photos.notification.delete.error', {
          count: 1,
          suffix: '',
        })
      )
    },
  })

  const [deleteManyDocuments] = useDeleteManyContactPhotoMutation({
    onCompleted({ deleteManyContactAttachmentPhoto: data }) {
      if (data.success && data.count === multipeDelDocs) {
        Notification(
          NotificationType.success,
          t('ui.clientcard.photos.notification.delete.success', {
            count: data?.count,
            suffix: data?.count > 1 ? 's' : '',
          })
        )
        setDocsDeleteLoading(() => false)
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
        setDocsDeleteLoading(() => false)
        const leftCount = multipeDelDocs - data.count
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
      setDocsDeleteLoading(() => false)
      Notification(
        NotificationType.error,
        t('ui.clientcard.photos.notification.delete.error', {
          count: multipeDelDocs,
          suffix: multipeDelDocs > 1 ? 's' : '',
        })
      )
    },
  })

  const [moveDocumentToFolder] = useMoveContactAttachmentsMutation({
    onCompleted({ moveAttachments: data }) {
      if (data?.success && data?.album !== 0) {
        if (document.querySelector(`#tar${data?.album}`)) {
          document
            ?.querySelector(`#tar${data?.album}`)
            ?.classList?.remove('dropEffect')
        }

        const tarAlbum = folderFinder?.(folders?.folder, data?.album)
        Notification(
          NotificationType?.success,
          `Image moved and ${
            tarAlbum?.folderTitle || 'album'
          } updated succesfully!`
        )
      } else {
        Notification(
          NotificationType?.success,
          `Image moved and uncategorized folder updated succesfully!`
        )
      }
    },
    onError(error) {
      Notification(NotificationType?.error, error?.message)
    },
  })

  useEffect(() => {
    if (foldersData?.findManyPhotoAlbum && !foldersLoading) {
      const innerFolders = iterateTo(foldersData?.findManyPhotoAlbum)
      const cFolders = {
        id: 0,
        folderTitle:
          unCatImagesCount?.aggregateContactAttachment?.count?._all > 0
            ? 'Uncategorized'
            : '',
        contentCount:
          unCatImagesCount?.aggregateContactAttachment?.count?._all || 0,
        folderContent: [],
        modifiedDate: '',
        folder: innerFolders,
      }
      setFolders(cFolders)
      setMultipleDelDocs(0)
    }
  }, [foldersData, foldersLoading, unCatImagesCount])

  useEffect(() => {
    if (folderDocuments?.findManyContactAttachment && !folderDocsLoading) {
      setCurrFolderDocuments([])
      const docs = folderDocuments?.findManyContactAttachment?.map((el) => {
        return {
          id: el?.id,
          folderData: getDocument?.(el?.url),
          dateTime: el?.date,
          isSensitive: false,
        }
      })
      setTimeout(() => {
        setCurrFolderDocuments(docs)
      }, 0)
      setMultipleDelDocs(0)
    }
  }, [folderDocuments, folderDocsLoading])

  useEffect(() => {
    if (
      manualFolderDocs?.findManyContactAttachment &&
      !manualFolderDocsLoading
    ) {
      setCurrFolderDocuments(null)
      setTimeout(() => {
        const docs = manualFolderDocs?.findManyContactAttachment?.map((el) => {
          return {
            id: el?.id,
            folderData: getDocument?.(el?.url),
            dateTime: el?.date,
            isSensitive: false,
          }
        })
        setCurrFolderDocuments(docs)
      }, 0)
    }
  }, [manualFolderDocs, manualFolderDocsLoading])

  useEffect(() => {
    if (manualFolders?.findManyPhotoAlbum && !manualFoldersLoading) {
      const innerAlbums = iterateTo(manualFolders?.findManyPhotoAlbum)
      const cFolders = {
        id: 0,
        folderTitle:
          unCatImagesCount?.aggregateContactAttachment?.count?._all > 0
            ? 'Uncategorized'
            : '',
        contentCount:
          unCatImagesCount?.aggregateContactAttachment?.count?._all || 0,
        folderContent: [],
        modifiedDate: '',
        folder: innerAlbums,
      }
      setFolders(cFolders)
    }
  }, [manualFolders, manualFoldersLoading, unCatImagesCount])

  const onFolderCreate = (
    folder: string,
    moveDocs: FolderContentProps[] = []
  ) => {
    if (moveDocs?.length > 0) {
      setMovingDocsOnFolderCreate(moveDocs?.map((el) => Number(el?.id)))
    }
    setFolderCreateLoading(true)
    createFolder({
      variables: {
        data: {
          album_name: folder,
          album_type: 'documents',
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
      refetchQueries: [
        {
          query: GetFoldersDocument,
          variables: {
            contactId: contactId,
          },
        },
      ],
    })
  }

  const onFolderUpdate = (folder: FolderProps) => {
    setFolderUpdateLoading(true)
    updateFolder({
      variables: {
        where: {
          id: Number(folder?.id),
        },
        data: {
          album_name: { set: folder?.folderTitle },
          modified_date: { set: dayjs().format('YYYY-MM-DD') },
        },
      },
      refetchQueries: [
        {
          query: GetFoldersDocument,
          variables: {
            contactId: contactId,
          },
        },
      ],
    })
  }

  const onFolderDelete = (folder: FolderProps) => {
    setFolderDeleteLoading(true)
    if (folder.contentCount <= 0) {
      deleteFolder({
        variables: {
          where: {
            id: Number(folder?.id),
          },
        },
        refetchQueries: [
          {
            query: GetFoldersDocument,
            variables: {
              contactId: contactId,
            },
          },
        ],
      })
    } else {
      // This block will be used when we get delete whole folder along with its nested folders and docs by Martin
    }
  }

  const onDocumentUpload = async (fileData: UploadingImageProps) => {
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
                    album_id: folderId,
                    attachment_type: 'contact',
                    contact_id: contactId,
                    date: dayjs().unix(),
                    image_url: data?.path,
                    uploaded_by: me?.user,
                    company_id: me?.company,
                  },
                  refetchQueries: [
                    {
                      query: GetFoldersDocument,
                      variables: {
                        contactId: contactId,
                      },
                    },
                    {
                      query: GetFolderDocumentsDocument,
                      variables: variables,
                    },
                  ],
                })
              }
              if (fileData?.albumId === 0) {
                createUncategorizedDocument({
                  variables: {
                    attachment_type: 'contact',
                    contact_id: contactId,
                    date: dayjs().unix(),
                    image_url: data?.path,
                    uploaded_by: me?.user,
                    company_id: me?.company,
                  },
                  refetchQueries: [
                    {
                      query: GetFoldersDocument,
                      variables: {
                        contactId: contactId,
                      },
                    },
                    {
                      query: GetFolderDocumentsDocument,
                      variables: variables,
                    },
                    {
                      query: CountFolderDocumentsDocument,
                      variables: {
                        contactId: contactId,
                        folderId: 0,
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

  const onDocumentRemove = (docIds: number[]) => {
    if (docIds?.length > 0) {
      if (docIds?.length === 1) {
        const cAddedFiles = [...uploadingFiles]
        const idx = cAddedFiles?.findIndex((el) => el?.id === docIds[0])
        if (idx !== -1) {
          const cFile = cAddedFiles[idx]
          cFile.loading = true
          cAddedFiles.splice(idx, 1, cFile)
          setUploadingFiles(cAddedFiles)
        }
        const cCurrAlbumImages = [...currFolderDocuments]
        const cImageIndex = cCurrAlbumImages?.findIndex(
          (el) => el?.id === docIds[0]
        )
        setSingleDocDelLoading(() => true)
        deleteOneDocument({
          variables: {
            id: docIds[0],
          },
          refetchQueries: [
            {
              query: GetFoldersDocument,
              variables: {
                contactId: contactId,
              },
            },
            cImageIndex !== -1 && {
              query: GetFolderDocumentsDocument,
              variables: variables,
            },
            folderId === 0 && {
              query: CountFolderDocumentsDocument,
              variables: {
                contactId: contactId,
                folderId: 0,
              },
            },
          ],
        })
      } else {
        setMultipleDelDocs(docIds?.filter((el) => el !== 0)?.length)
        setDocsDeleteLoading(() => true)
        deleteManyDocuments({
          variables: {
            ids: docIds,
          },
          refetchQueries: [
            {
              query: GetFoldersDocument,
              variables: {
                contactId: contactId,
              },
            },
            {
              query: GetFolderDocumentsDocument,
              variables: variables,
            },
            folderId === 0 && {
              query: CountFolderDocumentsDocument,
              variables: {
                contactId: contactId,
                folderId: 0,
              },
            },
          ],
        })
      }
    }
  }

  const onDocumentsMove = (folder: number, docs: number[]) => {
    if ((folder === 0 || folder) && docs?.length > 0) {
      moveDocumentToFolder({
        variables: {
          album: folder,
          images: docs,
        },
        refetchQueries: [
          {
            query: GetFoldersDocument,
            variables: {
              contactId: contactId,
            },
          },
          {
            query: GetFolderDocumentsDocument,
            variables: variables,
          },
          folderId === 0 && {
            query: CountFolderDocumentsDocument,
            variables: {
              contactId: contactId,
              folderId: 0,
            },
          },
        ],
      })
    }
  }

  const openPhotoStudio = (folder: number, image: number) => {
    setStudioAlbumId(folder)
    setStudioImageId(image)
    setShowPhotoStudio((e) => !e)
  }

  return (
    <>
      <ClientCardLayout
        clientId={Number(router.query.id)}
        activeTab="documents"
      >
        <ClientDocumentsLayout
          folderList={folders}
          folderDocuments={currFolderDocuments}
          onFolderClick={(id) => {
            if (id !== folderId) {
              setFolderId(id)
              setPaginatedData({
                ...paginatedData,
                currentPage: 1,
              })
            }
          }}
          loading={folderDocsLoading}
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
          onFolderCreate={onFolderCreate}
          folderCreateLoading={folderCreateLoading}
          onFolderUpdate={onFolderUpdate}
          folderUpdateLoading={folderUpdateLoading}
          onFolderDelete={onFolderDelete}
          folderDeleteLoading={folderDeleteLoading}
        />
        {/* <ClientPhotosLayout
          onImageUpload={onDocumentUpload}
          onImageRemove={onDocumentRemove}
          onUploadCancel={onUploadCancel}
          uploadingImages={uploadingFiles}
          setUploadingImages={setUploadingFiles}
          onImagesMove={onDocumentsMove}
          openImageStudio={openPhotoStudio}
          imagesDeleteLoading={docsDeleteLoading}
          singleImageDelLoading={singleDocDelLoading}
        /> */}
      </ClientCardLayout>
      {/* {router.query.id && showPhotoStudio && (
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
            getFolderDocsManually({
              variables: {
                contactId: router.query.id ? Number(router.query.id) : 0,
                albumId: folderId,
                skip: (paginatedData?.currentPage - 1) * paginatedData?.perPage,
                take: paginatedData?.perPage,
              },
            })
            getFoldersManually({
              variables: {
                contactId: router.query.id ? Number(router.query.id) : 0,
              },
            })
          }}
        />
      )} */}
    </>
  )
}

export default Photos
