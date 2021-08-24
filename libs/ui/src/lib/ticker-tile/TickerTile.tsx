import { Carousel } from 'antd'
import cn from 'classnames'
import React, { FC, ReactNode, useRef, useState } from 'react'
import { CarouselRef } from 'antd/lib/carousel'
import styles from './TickerTile.module.less'

export interface TickerTileProps {
  title: string
  items: ReactNode[]
  speed: number
  showCount?: boolean
  showDots?: boolean
  isBlank?: boolean
  noItemText?: string
  noItemImage?: ReactNode
}

export const TickerTile: FC<TickerTileProps> = ({
  title,
  items,
  speed,
  showCount,
  showDots,
  noItemText,
  noItemImage,
  isBlank,
}) => {
  const ref = useRef<CarouselRef>(null)
  const [cardNumber, setCardNumber] = useState(0)

  const handleChangeDetailsCard = (val) => {
    if (!!ref && ref.current) {
      ref.current.goTo(val)
      setCardNumber(val)
    }
  }
  return (
    <div className={styles.tickerTileContainer}>
      <div className={styles.tickerTileTitle}>{title}</div>
      <div className={styles.tickerTileContent}>
        {!isBlank &&
          items.length === 1 &&
          items.map((tile, index) => (
            <div className={styles.tickerTile} key={`ticker-tile-${index}`}>
              {tile}
            </div>
          ))}
        {!isBlank && items.length > 1 && (
          <Carousel
            dotPosition="right"
            autoplay={true}
            autoplaySpeed={speed}
            afterChange={(current) => setCardNumber(current)}
            ref={ref}
          >
            {items.map((tile, index) => (
              <div className={styles.tickerTile} key={`ticker-tile-${index}`}>
                {tile}
              </div>
            ))}
          </Carousel>
        )}
        {!isBlank && showCount && (
          <div className={styles.tickerCount}>{items.length}</div>
        )}
        {!isBlank && showDots && (
          <div className={styles.tickerDots}>
            {items.map((_, index) => (
              <div
                key={`ticker-dot-${index}`}
                className={cn(
                  styles.tickerDot,
                  cardNumber === index ? styles.active : ''
                )}
                onClick={() => handleChangeDetailsCard(index)}
              />
            ))}
          </div>
        )}
        {isBlank && (
          <div className={styles.noItem}>
            {noItemImage && noItemImage}
            <span>{noItemText || ''}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TickerTile
