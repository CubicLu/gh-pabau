import React, { FC, useEffect, useState } from 'react'
import { ImageViewer, ImageViewerAlbum, UploadingImageProps } from '@pabau/ui'
import { useUser } from '../../../context/UserContext'
import axios from 'axios'
import dayjs from 'dayjs'
import { cdnURL } from '../../../baseUrl'
import {
  useGetPhotoAlbumsQuery,
  useGetPhotoAlbumLazyQuery,
  useGetAllAlbumPhotosLazyQuery,
  useCreateContactPhotoMutation,
  useCreateContactPhotoWithoutAlbumMutation,
  useDeleteContactPhotoMutation,
} from '@pabau/graphql'

export interface PhotoStudioProps {
  visible?: boolean
  setVisible?: () => void
  title?: string
  photoId?: number
  albumId?: number
  contactId: number
  fetchFunc?: () => void
}

export const PhotoStudio: FC<PhotoStudioProps> = ({
  visible = false,
  setVisible,
  title,
  photoId,
  albumId,
  contactId,
  fetchFunc,
}) => {
  const cdn = `${cdnURL}/cdn/attachments/`
  const baseURL = `${cdnURL}/v2/api/contact/`
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization:
        localStorage?.getItem('token') &&
        `Bearer ${localStorage?.getItem('token')?.replaceAll('"', '')}`,
    },
  })

  const user = useUser()
  const [totalAlbums, setTotalAlbums] = useState<ImageViewerAlbum[]>()
  const [currentAlbumData, setCurrentAlbumData] = useState<ImageViewerAlbum>()
  const [nonAlbumPhotos, setNonAlbumPhotos] = useState(null)
  const [uploadingImages, setUploadingImages] = useState<
    UploadingImageProps[]
  >()

  const [createAttachmentInAlbum] = useCreateContactPhotoMutation({
    onCompleted({ createOneContactAttachment: data }) {
      const path = data?.linkref
      const cAddedFiles = [...uploadingImages]
      const idx = cAddedFiles?.findIndex((el) => el?.uploadedPath === path)
      if (idx !== -1) {
        const cFile = cAddedFiles[idx]
        cFile.id = data?.id
        cFile.loading = false
        cFile.isUploadCompleted = true
        cAddedFiles.splice(idx, 1, cFile)
        setUploadingImages(cAddedFiles)
        getCurrentAlbumData({
          variables: {
            albumId: currentAlbumData?.id,
            contactId: contactId,
          },
        })
      }
      if (data?.album_id === albumId) fetchFunc?.()
    },
  })

  const [
    createAttachmentOutOfAlbum,
  ] = useCreateContactPhotoWithoutAlbumMutation({
    onCompleted({ createOneContactAttachment: data }) {
      const path = data?.linkref
      const cAddedFiles = [...uploadingImages]
      const idx = cAddedFiles?.findIndex((el) => el?.uploadedPath === path)
      if (idx !== -1) {
        const cFile = cAddedFiles[idx]
        cFile.id = data?.id
        cFile.loading = false
        cFile.isUploadCompleted = true
        cAddedFiles.splice(idx, 1, cFile)
        setUploadingImages(cAddedFiles)
        getUncatAlbumPhotos({
          variables: {
            contactId: contactId,
            albumId: 0,
          },
        })
      }
      if (data?.album_id === albumId) fetchFunc?.()
    },
  })

  const [deleteAttachmentInAlbum] = useDeleteContactPhotoMutation({
    onCompleted({ deleteContactAttachmentPhoto: data }) {
      if (data.success) {
        const id = data?.photo
        const cAddedFiles = [...uploadingImages]
        const idx = cAddedFiles?.findIndex((el) => el?.id === id)
        if (idx !== -1) {
          const cFile = cAddedFiles[idx]
          cAddedFiles.splice(idx, 1)
          setUploadingImages(cAddedFiles)
          const cCurrAlbumData = { ...currentAlbumData }
          const cIdx = cCurrAlbumData?.imageList?.findIndex(
            (el) => el?.id === cFile?.id
          )
          if (cIdx !== -1) {
            if (cCurrAlbumData.imageCount) {
              cCurrAlbumData.imageCount = cCurrAlbumData.imageCount - 1
            }
            cCurrAlbumData.imageList.splice(cIdx, 1)
            setCurrentAlbumData(cCurrAlbumData)
          }
        }
      } else {
        const id = data?.photo
        const cAddedFiles = [...uploadingImages]
        const idx = cAddedFiles?.findIndex((el) => el?.id === id)
        if (idx !== -1) {
          const cFile = cAddedFiles[idx]
          cFile.loading = false
          cAddedFiles.splice(idx, 1, cFile)
          setUploadingImages(cAddedFiles)
        }
      }
    },
  })

  const [
    getUncatAlbumPhotos,
    { data: dUnCatPhotos },
  ] = useGetAllAlbumPhotosLazyQuery({
    fetchPolicy: 'network-only',
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
    getUncatAlbumPhotos({
      variables: {
        contactId: contactId,
        albumId: 0,
      },
    })
  }, [contactId, getUncatAlbumPhotos])

  useEffect(() => {
    setNonAlbumPhotos(dUnCatPhotos?.findManyContactAttachment)
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
            origin: el?.origin?.includes('http')
              ? el?.origin
              : `${cdn}${el?.origin}`,
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
  }, [albumId, cdn, dCurrentAlbum, dCurrentAlbumloading, nonAlbumPhotos])

  useEffect(() => {
    if (!albumId && nonAlbumPhotos) {
      const imageList = nonAlbumPhotos?.map((el) => {
        return {
          ...el,
          date: dayjs(new Date(el?.date * 1000)).format('YYYY-MM-DD'),
          origin: el?.origin?.includes('http')
            ? el?.origin
            : `${cdn}${el?.origin}`,
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
  }, [albumId, cdn, nonAlbumPhotos])

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
          origin: el?.origin?.includes('http')
            ? el?.origin
            : `${cdn}${el?.origin}`,
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

  const uploadImage = async (fileData) => {
    const cAddedFiles = [...uploadingImages]
    const idx = cAddedFiles?.findIndex((el) => el?.id === fileData?.id)
    if (idx !== -1) {
      const config = {
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          const percAddedFiles = [...uploadingImages]
          const percIdx = percAddedFiles?.findIndex(
            (el) => el?.id === fileData?.id
          )
          if (percIdx !== -1) {
            const percFile = percAddedFiles[percIdx]
            percFile.uploadPercentage = percentCompleted
            percAddedFiles.splice(percIdx, 1, percFile)
            setUploadingImages(percAddedFiles)
          }
        },
      }
      const data = new FormData()
      data.append('File', fileData?.file)

      const upStartFiles = [...uploadingImages]
      const upStartIdx = upStartFiles?.findIndex(
        (el) => el?.id === fileData?.id
      )
      if (upStartIdx !== -1) {
        const uppFile = upStartFiles[upStartIdx]
        uppFile.isUploadStarted = true
        upStartFiles.splice(upStartIdx, 1, uppFile)
        setUploadingImages(upStartFiles)
      }

      await api
        .post('upload-photo', data, config)
        .then((res) => {
          const data = JSON.parse(JSON.stringify(res.data))
          const upCompFiles = [...uploadingImages]
          const upCompIdx = upCompFiles?.findIndex(
            (el) => el?.id === fileData?.id
          )
          if (upCompIdx !== -1) {
            const uppCompFile = upCompFiles[upCompIdx]
            uppCompFile.uploadedPath = data?.path
            uppCompFile.loading = true
            upCompFiles.splice(upCompIdx, 1, uppCompFile)
            setUploadingImages(upCompFiles)
            if (fileData?.albumId > 0) {
              createAttachmentInAlbum({
                variables: {
                  album_id: currentAlbumData?.id,
                  attachment_type: 'contact',
                  contact_id: contactId,
                  date: dayjs().unix(),
                  image_url: data?.path,
                  uploaded_by: user?.me?.user,
                  company_id: user?.me?.company,
                },
              })
            }
            if (fileData?.albumId === 0) {
              createAttachmentOutOfAlbum({
                variables: {
                  attachment_type: 'contact',
                  contact_id: contactId,
                  date: dayjs().unix(),
                  image_url: data?.path,
                  uploaded_by: user?.me?.user,
                  company_id: user?.me?.company,
                },
              })
            }
          }
        })
        .catch((error) => console.log(error?.message))
    }
  }

  const removeImage = async (imageId: number) => {
    const cAddedFiles = [...uploadingImages]
    const idx = cAddedFiles?.findIndex((el) => el?.id === imageId)
    if (idx !== -1) {
      const cFile = cAddedFiles[idx]
      cFile.loading = true
      cAddedFiles.splice(idx, 1, cFile)
      setUploadingImages(cAddedFiles)

      deleteAttachmentInAlbum({
        variables: {
          id: imageId,
        },
      })
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
      uploadingImages={uploadingImages}
      setUploadingImages={setUploadingImages}
      uploadImage={uploadImage}
      removeImage={removeImage}
      loading={dAlbumsLoading || dCurrentAlbumloading}
    />
  )
}

export default PhotoStudio
