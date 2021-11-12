import React, { FC, useEffect, useState } from 'react'
import { Typography, Card, Select, Popover } from 'antd'
import { Button, Input } from '@pabau/ui'
import { useUser } from '../../context/UserContext'
import Layout from '../../components/Layout/Layout'
import useDebounce from '../../hooks/useDebounce'
import PhotoStudio from '../../components/ClientCard/PhotoStudio'
import {
  useCountAlbumPhotosQuery,
  useGetPhotoAlbumLazyQuery,
  useGetPhotoAlbumsLazyQuery,
  useGetAlbumPhotosLazyQuery,
} from '@pabau/graphql'

export const Index: FC = () => {
  const user = useUser()
  const [showPhotoStudio, setShowPhotoStudio] = useState(false)

  const [userAlbums, setUserAlbums] = useState(null)
  const [albumPhotos, setAlbumPhotos] = useState(null)

  const [contactId, setContactId] = useState(
    10552384
    // 23936780
    // 22459581
  )
  const [albumId, setAlbumId] = useState(null)
  const [photoId, setPhotoId] = useState(null)
  const debouncedContactId = useDebounce(contactId, 500)

  const { data: unCatPhotosCount } = useCountAlbumPhotosQuery({
    variables: {
      albumId: 0,
      contactId: debouncedContactId,
    },
  })

  const [
    getUncategorizedPhotos,
    { data: unCatPhotos, loading: unCatPhotosLoading },
  ] = useGetAlbumPhotosLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getPhotos,
    { data: photos, loading: photosLoading },
  ] = useGetPhotoAlbumLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getAlbums,
    { data: albums, loading: albumsLoading },
  ] = useGetPhotoAlbumsLazyQuery({
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (debouncedContactId) {
      getAlbums({
        variables: {
          contactId: debouncedContactId,
        },
      })
      getUncategorizedPhotos({
        variables: {
          contactId: debouncedContactId,
          albumId: 0,
          skip: 0,
          take: unCatPhotosCount?.aggregateContactAttachment?.count?._all || 25,
        },
      })
    }
  }, [
    debouncedContactId,
    getAlbums,
    getUncategorizedPhotos,
    unCatPhotosCount?.aggregateContactAttachment?.count?._all,
  ])

  useEffect(() => {
    setPhotoId(null)
    if (albums?.findManyPhotoAlbum?.length > 0) {
      setUserAlbums(albums?.findManyPhotoAlbum)
    } else {
      setUserAlbums([])
      setAlbumId(null)
    }
  }, [albums])

  useEffect(() => {
    if (albumId === null) {
      setAlbumPhotos(unCatPhotos?.findManyContactAttachment)
    }
  }, [albumId, unCatPhotos])

  useEffect(() => {
    setAlbumPhotos(photos?.findFirstPhotoAlbum?.imageList)
  }, [photos])

  const setPath = (path) => {
    path = path?.includes('http')
      ? path
      : `https://cdn.pabau.com/cdn/attachments/${path}`
    const pathArr = path.split('photos/')
    if (pathArr?.length) {
      pathArr[1] = `thumb_${pathArr[1]}`
    }
    path = pathArr.join('photos/')
    return path
  }

  return (
    <Layout {...user}>
      <Card>
        <Typography.Title>Photo Studio</Typography.Title>
        <div style={{ maxWidth: '300px', paddingLeft: '22px' }}>
          <Input
            label="Contact"
            type="number"
            placeHolderText="Contact"
            text={contactId.toString()}
            onChange={(data) => setContactId(Number(data))}
            style={{ marginBottom: '20px' }}
          />
          <Select
            style={{ width: '100%', marginBottom: '20px' }}
            value={albumId}
            onChange={(value) => {
              setAlbumId(value)
              if (value && contactId) {
                setAlbumPhotos(null)
                getPhotos({
                  variables: {
                    contactId: contactId,
                    albumId: Number(value),
                  },
                })
              }
            }}
            placeholder="Album"
          >
            {userAlbums?.length > 0 &&
              userAlbums?.map((el) => (
                <Select.Option key={el?.id} value={el?.id}>
                  {el?.name}
                </Select.Option>
              ))}
          </Select>
          <Popover
            placement="bottomRight"
            trigger="click"
            content={
              <div
                style={{
                  width: '320px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '10px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {albumPhotos?.length > 0
                  ? albumPhotos?.map((el) => (
                      <div
                        key={el?.id}
                        style={{
                          position: 'relative',
                          width: '75px',
                          height: '75px',
                          padding: '5px',
                        }}
                      >
                        <img
                          src={setPath(el?.origin)}
                          alt="ph"
                          style={{
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                          }}
                          onClick={() => setPhotoId(el?.id)}
                        />
                      </div>
                    ))
                  : 'No Photo'}
              </div>
            }
          >
            <Button type="primary">Select Image</Button>
            <div style={{ maxWidth: '150px' }}>
              {photoId && (
                <img
                  style={{ width: '100%', margin: '20px 0px' }}
                  src={
                    albumPhotos
                      ?.find((el) => el?.id === photoId)
                      ?.origin?.includes('http')
                      ? albumPhotos?.find((el) => el?.id === photoId)?.origin
                      : `https://cdn.pabau.com/cdn/attachments/${
                          albumPhotos?.find((el) => el?.id === photoId)?.origin
                        }`
                  }
                  alt="ph"
                />
              )}
            </div>
          </Popover>
          <Button
            disabled={
              !contactId || albumsLoading || photosLoading || unCatPhotosLoading
            }
            style={{ width: '100%', marginTop: '20px' }}
            type="primary"
            loading={albumsLoading || photosLoading}
            onClick={() => setShowPhotoStudio(() => !showPhotoStudio)}
          >
            Show Studio
          </Button>
        </div>
      </Card>
      {showPhotoStudio && (
        <PhotoStudio
          contactId={contactId}
          albumId={albumId}
          photoId={photoId}
          visible={showPhotoStudio}
          setVisible={() => setShowPhotoStudio(() => false)}
        />
      )}
    </Layout>
  )
}

export default Index
