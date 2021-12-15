import './IntegrationCard.module.less'
import React, { FC } from 'react'
import styles from './IntegrationCard.module.less'
import { CheckOutlined, PictureOutlined } from '@ant-design/icons'
export interface IntegrationCardProps {
  id?: string
  name?: string
  logo?: string
  discription?: string
  onClick?: () => void
}

export const IntegrationCard: FC<IntegrationCardProps> = ({
  id,
  name,
  logo,
  discription,
  onClick,
}) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemBox}>
        <span className={styles.checkWrap}>
          <CheckOutlined />
        </span>
        <div className={styles.img}>
          {logo ? (
            <div>
              {' '}
              <PictureOutlined />{' '}
            </div>
          ) : (
            <img src={logo} alt={''} />
          )}
        </div>
        <h5>{name}</h5>
        <p>{discription}</p>
      </div>
    </div>
  )
}

export default IntegrationCard
