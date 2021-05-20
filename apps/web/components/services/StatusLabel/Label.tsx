import { Button } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './Label.module.less'

export interface LP {
  type: string
}

const Label: FC<LP> = ({ type }) => {
  return (
    <div className={styles.statusLabel}>
      <div className={type === 'sell' ? styles.sell : styles.both}>
        <Button type="default" size="small">
          {type === 'sell' ? 'Sell only' : 'Book & Sell '}
        </Button>
      </div>
    </div>
  )
}

export default Label
