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
          imageCount: 0,
          id: 0,
        }}
        images={[]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
