import { render } from '@testing-library/react'
import React from 'react'
import ImageViewer from './ImageViewer'

describe('ImageViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ImageViewer
        visible={false}
        title=""
        albums={[]}
        onClose={() => {
          return
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
