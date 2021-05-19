import React from 'react'
import { render } from '@testing-library/react'

import DocumentUploadModal from './DocumentUploadModal'

describe('DocumentUploadModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DocumentUploadModal
        title={'Example title'}
        visible={true}
        avatarSrc={'example src'}
        userName={'Example username'}
        position={'top'}
        folderOptions={[{ name: 'Folder1', value: 'Value1' }]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
