import React from 'react'
import { render } from '@testing-library/react'

import ModalWithImage from './ModalWithImage'

describe('ModalWithImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ModalWithImage
        visible={true}
        title={'Example title'}
        imageUrl={'image url example'}
        description={['Example description']}
        onCancel={() => {
          return true
        }}
        onEnable={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
