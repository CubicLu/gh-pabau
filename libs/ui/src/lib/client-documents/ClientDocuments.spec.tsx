import { render } from '@testing-library/react'
import React from 'react'

import ClientDocuments from './ClientDocuments'

const folderList = {
  folder: [],
  id: 1,
  folderContent: [],
  folderTitle: 'Folders',
}
describe('ClientDocuments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientDocuments
        folderList={folderList}
        folderDocuments={[]}
        setUploadingDocs={() => false}
        uploadingDocs={[]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
