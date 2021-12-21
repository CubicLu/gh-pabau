import React from 'react'
import { render } from '@testing-library/react'

import ProductList from './ProductList'

describe('ProductList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ProductList
        data={[]}
        paginateData={{
          total: 50,
          offset: 1,
          limit: 10,
          currentPage: 51,
          showingRecords: 10,
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        modalVisible={true}
        handleClose={() => {
          return
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
