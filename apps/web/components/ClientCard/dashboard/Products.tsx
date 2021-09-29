import styles from '../../../../../libs/ui/src/lib/client-dashboard-layout/ClientDashboardLayout.module.less'
import { TickerTile } from '@pabau/ui'
import React from 'react'
import { ReactComponent as NoProduct } from '../../assets/images/client-card/ticker/no-product.svg'
import { useMedia } from 'react-use'

const noProduct = <NoProduct />

const width = 177
const mobileWidth = 160
const height = 177
const mobileHeight = 160

//TODO: convert this to a useXxxQuery
const products = []

export const Products = () => {
  const isMobile = useMedia('(max-width: 576px)', false)

  return (
    <div className={styles.productsContainer}>
      <div>
        <TickerTile
          title="Products"
          items={products.map((item, index) => (
            <div
              key={`product-item-${index}`}
              className={styles.squareTile}
              style={{
                width: `${(isMobile ? mobileWidth : width) - 32}px`,
                height: `${(isMobile ? mobileHeight : height) - 64}px`,
              }}
            >
              <div>
                {item.descriptions.map((description, index) => (
                  <div
                    className={styles.description}
                    key={`product-description-${index}`}
                  >
                    {description}
                  </div>
                ))}
              </div>
              <div className={styles.date}>{item.date}</div>
            </div>
          ))}
          speed={3000}
          showDots={true}
          isBlank={products.length === 0}
          noItemText="No products"
          noItemImage={noProduct}
        />
      </div>
    </div>
  )
}
