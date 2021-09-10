import AvatarUploader from '../../../../web/components/Uploaders/AvatarUploader/AvatarUploader'
import ImageSelectorModal from '../../../../web/components/Uploaders/ImageSelectorModal/ImageSelectorModal'
import React, { FC, useState } from 'react'
import { Avatar, Layout } from '@pabau/ui'
import AvatarImage from '../../../assets/images/setting-avatar.png'
import useWindowSize from '../../../hooks/useWindowSize'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [userImage, setUserImage] = useState<string>(AvatarImage)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(true)
  const size = useWindowSize()
  const uploadPhoto = () => {
    setShowAvatarUploader(true)
  }
  const { t } = useTranslationI18()

  const handleChange = (key, value) => {
    console.log(value)
  }

  const list = [
    {
      key: '1',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['a'],
    },
    {
      key: '2',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['b'],
    },
    {
      key: '3',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['c'],
    },
    {
      key: '4',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['d'],
    },
    {
      key: '5',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['d'],
    },
    {
      key: '6',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['e'],
    },
    {
      key: '7',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['e'],
    },
    {
      key: '8',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['e'],
    },
    {
      key: '9',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['e'],
    },
    {
      key: '10',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['f'],
    },
    {
      key: '11',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['f'],
    },
    {
      key: '12',
      path: 'cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      url: 'https://nano.pabau.me/cdn/file_attachments/3470/avatar_photo/testfilename5.png',
      tags: ['v'],
    },
  ]

  const handleImage = (imageData) => {
    console.log(imageData)
    handleChangeImage(imageData.url)
  }

  const handleModalUpload = (imageData) => {
    console.log(imageData)
  }

  const handleChangeImage = (image: string) => {
    setUserImage(image)
  }

  return (
    <Layout>
      <div onClick={uploadPhoto}>
        <Avatar
          src={userImage}
          size={size.width > 767 ? 128 : 88}
          name={'Zhen'}
          edit={true}
        />
      </div>
      <AvatarUploader
        visible={showAvatarUploader}
        title={'Upload Profile Photo'}
        imageURL={
          'https://crm.pabau.com/cdn/file_attachments/8420/avatar_photos/20200619021356.jpeg'
        }
        onCancel={() => setShowAvatarUploader(false)}
        shape={'rectangle'}
        width={400}
        height={250}
        section={'avatar_photos'}
        type={'file_attachments'}
        successHandler={handleImage}
      />

      <ImageSelectorModal
        visible={showImageSelector}
        initialSearch=""
        onCancel={() => setShowImageSelector(false)}
        onOk={(image) => {
          setShowImageSelector(false)
          handleChange('selectedImage', image.url)
        }}
        attachButtonText={t('ui.imageselector.attach')}
        title={t('ui.imageselector.title')}
        chooseButtonText={t('ui.imageselector.choose')}
        imgList={list}
        section="product_photo"
        type="file_attachments"
        successHandler={handleModalUpload}
      />
    </Layout>
  )
}

export default Index
