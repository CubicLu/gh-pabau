import { render } from '@testing-library/react'
import React from 'react'
import { AlbumProps, ImageProps } from '@pabau/ui'
import ClientPhotosLayout from './ClientPhotosLayout'

describe('ClientPhotosLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientPhotosLayout
        images={[] as ImageProps[]}
        albumList={{} as AlbumProps}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
