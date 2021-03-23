import React from 'react'
import { render } from '@testing-library/react'
import UserImage from '../../assets/images/avatar-uploader.png'

import AvatarUploader from './AvatarUploader'

describe('AvatarUploader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AvatarUploader
        visible={false}
        title={'Edit Photo'}
        imageURL={UserImage}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
