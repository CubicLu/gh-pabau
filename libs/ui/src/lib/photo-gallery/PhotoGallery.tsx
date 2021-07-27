import React, { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import { BasicModal as Modal, Button } from '@pabau/ui'
import { Input } from 'antd'
import {
  LeftOutlined,
  CheckCircleFilled,
  SearchOutlined,
} from '@ant-design/icons'
import AlbumHover from './AlbumHover'
import { useTranslation } from 'react-i18next'
import { imageAlbums as defaultImageAlbums } from './mock'
import styles from './PhotoGallery.module.less'

export interface PhotoGalleryProps {
  title?: string
  visible: boolean
  onClose: () => void
  onAttached: (selected: ImageItem[]) => void
}

interface ImageItem {
  src: string
  name: string
}

interface Album {
  name: string
  items: ImageItem[]
}

const emptyAlbum: Album = {
  name: '',
  items: [],
}

const PhotoGalleryComponent: FC<PhotoGalleryProps> = ({
  visible,
  title,
  onClose,
  onAttached,
}) => {
  const { t } = useTranslation('common')
  const [searchStr, setSearchStr] = useState('')
  const [album, setAlbum] = useState<Album>(emptyAlbum)
  const [albumItems, setAlbumItems] = useState<Album[]>(defaultImageAlbums)
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([])

  const handleSelectImage = (item: ImageItem) => {
    const images = [...selectedImages]
    if (
      selectedImages.find((el) => el.name === item.name && el.src === item.src)
    ) {
      const index = selectedImages.findIndex(
        (el) => el.name === item.name && el.src === item.src
      )
      images.splice(index, 1)
      setSelectedImages(images)
    } else {
      setSelectedImages([...selectedImages, item])
    }
  }

  useEffect(() => {
    setAlbumItems(defaultImageAlbums)
    setAlbum(emptyAlbum)
  }, [])

  const photoGalleryTitle = (
    <div className={styles.photoGalleryTitle}>
      <div className={styles.backTo} onClick={() => onClose()}>
        <LeftOutlined />
      </div>
      <div className={styles.title}>{title || t('ui.photogallery.title')}</div>
    </div>
  )

  const assignToGroupTitle = (
    <div className={styles.photoGalleryTitle}>
      <div className={styles.backTo} onClick={() => onClose()}>
        <LeftOutlined />
      </div>
      <div className={styles.title}>{t('ui.photogallery.assigntogroup')}</div>
    </div>
  )

  return (
    <Modal
      visible={visible}
      title={album.name === '' ? photoGalleryTitle : assignToGroupTitle}
      footer={false}
      width={720}
      centered
      onCancel={() => onClose()}
    >
      <div className={styles.photogGalleryContainer}>
        {album.name === '' && (
          <div className={styles.albumsContainer}>
            <div className={styles.searchalbum}>
              <Input
                placeholder="Search"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
                addonAfter={<SearchOutlined />}
              />
            </div>
            <div className={styles.albumItems}>
              {albumItems.map((item, index) => (
                <div
                  className={styles.albumItem}
                  key={`album-item-${index}`}
                  onClick={() => setAlbum(item)}
                >
                  <AlbumHover
                    width="200px"
                    height="200px"
                    imageItems={item.items}
                  />
                  <p className={styles.albumTitle}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {album.name !== '' && (
          <div className={styles.imagesContainer}>
            {album.items.map((item, index) => (
              <div
                className={cn(
                  styles.imageItem,
                  selectedImages.find(
                    (el) => el.name === item.name && el.src === item.src
                  )
                    ? styles.selected
                    : ''
                )}
                key={`image-item-${index}`}
                style={{ backgroundImage: `url(${item.src})` }}
                onClick={() => handleSelectImage(item)}
              >
                <CheckCircleFilled className={styles.checkIcon} />
              </div>
            ))}
          </div>
        )}
        <div className={styles.photoGalleryFooter}>
          <div>
            {album.name !== '' && (
              <Button
                icon={<LeftOutlined />}
                onClick={() => setAlbum(emptyAlbum)}
              >
                {t('ui.photogallery.backtoalbum')}
              </Button>
            )}
          </div>
          <div>
            <Button
              type="primary"
              disabled={selectedImages.length === 0}
              onClick={() => onAttached(selectedImages)}
            >
              {selectedImages.length === 0
                ? t('ui.photogallery.attach')
                : t('ui.photogallery.attachphoto', {
                    count: selectedImages.length,
                    unit: selectedImages.length > 1 ? 'photos' : 'photo',
                  })}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export const PhotoGallery: FC<PhotoGalleryProps> = (props) => {
  const { visible } = props
  return visible ? <PhotoGalleryComponent {...props} /> : <div />
}

export default PhotoGallery
