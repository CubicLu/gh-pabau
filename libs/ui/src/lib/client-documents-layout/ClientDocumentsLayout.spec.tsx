import { render } from '@testing-library/react'
import React from 'react'
import ClientDocumentsLayout from './ClientDocumentsLayout'

const folderList = {
  folder: [],
  id: 1,
  folderContent: [],
  contentCount: 0,
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
        paginateData={{
          currentPage: 0,
          onPageChange: () => false,
          onPageSizeChange: () => false,
          pageSize: 0,
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
