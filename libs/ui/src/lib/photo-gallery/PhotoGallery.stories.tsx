import React from 'react'
import PhotoGallery, { PhotoGalleryProps } from './PhotoGallery'

export default {
  component: PhotoGallery,
  title: 'UI/PhotoGallery',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const PhotoGalleryStory = ({ ...args }: PhotoGalleryProps) => (
  <PhotoGallery {...args} />
)

export const PhotoGalleryModal = PhotoGalleryStory.bind({})
PhotoGalleryModal.args = {
  title: 'Attach Image from the Photo Gallery',
  visible: true,
  onClose: () => {
    return
  },
}
