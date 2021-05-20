import React from 'react'
import { render } from '@testing-library/react'

import CopyEmbedCodeModal from './CopyEmbedCodeModal'

describe('CopyEmbedCodeModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CopyEmbedCodeModal
        modalWidth={400}
        visible={true}
        onClose={() => {
          return true
        }}
        onDownloadImg={() => {
          return true
        }}
        onEmailInput={() => {
          return true
        }}
        code={'example code'}
        title={'example title'}
        subTitle={'example sub title'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
