import { render } from '@testing-library/react'
import React from 'react'
import ClientDocumentsLayout from './ClientDocumentsLayout'

const folderList = {
  folder: [],
  id: 1,
  folderContent: [],
  folderTitle: 'Folders',
}
describe('ClientDocumentsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientDocumentsLayout
        folderList={folderList}
        folderDocuments={[]}
        setUploadingDocs={() => false}
        uploadingDocs={[]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
