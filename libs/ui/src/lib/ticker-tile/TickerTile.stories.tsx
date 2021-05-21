import React, { FC } from 'react'
import TickerTile, { TickerTileProps } from './TickerTile'
import styles from './TickerTile.module.less'

export default {
  component: TickerTile,
  title: 'UI/Ticker Tile',
  parameters: {},
  args: {},
  argTypes: {},
}

const TickerTileStory: FC<TickerTileProps> = (args) => {
  return (
    <div style={{ width: '200px', height: '200px' }}>
      <TickerTile {...args} />
    </div>
  )
}

export const Basic = TickerTileStory.bind({})
Basic.args = {
  items: [
    <div key="1" className={styles.sbTile}>
      <div>
        <div className={styles.description}>
          History of germ cell tumor ICD 10
        </div>
      </div>
      <div className={styles.date}>21 Mar</div>
    </div>,
    <div key="2" className={styles.sbTile}>
      <div>
        <div className={styles.description}>Ibuprofen</div>
        <div className={styles.description}>Paracetomol</div>
      </div>
      <div className={styles.date}>22 Mar</div>
    </div>,
  ],
  speed: 3000,
  title: 'Medical history',
}
