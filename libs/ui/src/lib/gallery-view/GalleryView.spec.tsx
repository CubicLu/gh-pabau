import React from 'react'
import { render } from '@testing-library/react'
import GalleryView from './GalleryView'

describe('GalleryView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GalleryView
        key={1}
        albumList={{
          albumImage: [],
          albumTitle: '',
          album: [],
          modifiedDate: '',
          imageCount: 0,
          id: 0,
        }}
        images={[]}
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
