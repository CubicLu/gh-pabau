import React from 'react'
import { render } from '@testing-library/react'
import GalleryView from './GalleryView'

describe('GalleryView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GalleryView key={1} albumList={[] as never} images={[]} />
    )
    expect(baseElement).toBeTruthy()
  })
})
