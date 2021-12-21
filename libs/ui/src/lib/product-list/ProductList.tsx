import React, { FC, useState } from 'react'
import styles from './ProductList.module.less'
import { Pagination, Search, Button, FullScreenReportModal } from '@pabau/ui'
import { ReactComponent as Check } from '../../assets/images/circle-check.svg'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface CustomIconComponentProps {
  width: string | number
  height: string | number
  fill: string
  viewBox?: string
  className?: string
  style?: React.CSSProperties
}

interface ProductsListData {
  name: string
  image: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
  verified: boolean
}

interface PaginateDataProps {
  total?: number
  offset?: number
  limit?: number
  currentPage?: number
  showingRecords: number
  defaultPageSize?: number
  showSizeChanger?: boolean
}

export interface ProductListProps {
  data: ProductsListData[]
  paginateData: PaginateDataProps
  modalVisible?: boolean
  handleClose?: () => void
  handleSelect?: (index) => void
}

export const ProductList: FC<ProductListProps> = ({
  data,
  paginateData,
  modalVisible = false,
  handleClose,
  handleSelect,
}) => {
  const { t } = useTranslation('common')

  const [productData, setProductData] = useState([...data])
  const verifyCount = () => {
    const productDataLength = data.filter((item) => item.verified)?.length
    return productDataLength > 0 ? `(${productDataLength})` : ''
  }
  const handleSelectData = () => {
    handleSelect?.(data)
    productData.filter((item) => item.verified)?.length > 0 && handleClose?.()
  }
  return (
    <FullScreenReportModal
      visible={modalVisible}
      onCancel={handleClose}
      operations={[]}
      title={t('ui.productlist.addproductmodal.title')}
      onBackClick={handleClose}
    >
      <div className={styles.modalProductsBody}>
        <div className={styles.mainProduct}>
          <div className={styles.mainProductContent}>
            <div className={styles.productSearchWrap}>
              <h1>{t('ui.productlist.addproductmodal.titleproductslist')}</h1>
              <div className={styles.productSearch}>
                <Search
                  placeHolder={t(
                    'ui.productlist.addproductmodal.search.placeholder'
                  )}
                />
                <Button type={'primary'} onClick={handleSelectData}>{`${t(
                  'ui.productlist.addproductmodal.selectlabel'
                )} ${verifyCount()}`}</Button>
              </div>
            </div>
            <div className={styles.mainListing}>
              {productData?.map((singleProduct, index) => {
                return (
                  <div
                    className={
                      (singleProduct.verified &&
                        classNames(styles.productList, styles.active)) ||
                      classNames(styles.productList)
                    }
                    key={index}
                    onClick={() => {
                      data[index].verified
                        ? (data[index].verified = false)
                        : (data[index].verified = true)
                      setProductData([...data])
                    }}
                  >
                    {singleProduct.verified && (
                      <div className={styles.verifiedIcon}>
                        <Check />
                      </div>
                    )}
                    <div className={styles.productCard}>
                      {singleProduct.image}
                    </div>
                    <h3>{singleProduct.name}</h3>
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination
            total={paginateData?.total}
            defaultPageSize={paginateData?.defaultPageSize}
            showSizeChanger={paginateData?.showSizeChanger}
            pageSize={paginateData?.limit}
            current={paginateData?.currentPage}
            showingRecords={paginateData.showingRecords}
          />
        </div>
      </div>
    </FullScreenReportModal>
  )
}

export default ProductList
