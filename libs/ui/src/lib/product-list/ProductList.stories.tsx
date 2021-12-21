import React, { FC } from 'react'
import ProductListComponent, { ProductListProps } from './ProductList'
import product from '../../assets/images/product-sell.svg'

export default {
  component: ProductListComponent,
  title: 'Modals/ProductList',
  args: {
    modalVisible: false,
    data: [
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: true,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: true,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
      {
        productName: 'Embryolisse Moisturizers',
        image: product,
        verified: false,
      },
    ],
    paginateData: {
      total: 50,
      offset: 1,
      limit: 10,
      currentPage: 51,
      showingRecords: 10,
      defaultPageSize: 10,
      showSizeChanger: false,
    },
  },
}

const ProductListStory: FC<ProductListProps> = ({
  modalVisible,
  data,
  paginateData,
}) => (
  <ProductListComponent
    modalVisible={modalVisible}
    data={data}
    paginateData={paginateData}
  />
)

export const ProductList = ProductListStory
