import { render } from '@testing-library/react'
import React from 'react'

import ClientDocuments from './ClientDocuments'

const folderList = {
  folder: [],
  id: 1,
  folderContent: [],
  contentCount: 0,
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
