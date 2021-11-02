import { render } from '@testing-library/react'
import React from 'react'
import { AlbumProps, ImageProps } from '@pabau/ui'
import ClientPhotosLayout from './ClientPhotosLayout'

describe('ClientPhotosLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientPhotosLayout
        images={[] as ImageProps[]}
        albumList={
          {
            album: [],
            albumImage: [],
            albumTitle: '',
            id: 0,
            imageCount: 0,
            modifiedDate: '',
          } as AlbumProps
        }
        paginateData={{
          pageSize: 10,
          currentPage: 1,
          onPageChange: () => false,
          onPageSizeChange: () => false,
        }}
        uploadingImages={[]}
        setUploadingImages={() => false}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
