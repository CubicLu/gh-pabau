import React, { FC, useRef } from 'react'
import { MyLottie as Lottie } from '@pabau/ui'
import emptyState from '../../assets/lottie/empty-state.json'
import styles from './ClientFinancialsLayout.module.less'

export const ClientFinancialsLayout: FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.clientLayout} ref={ref}>
      <Lottie
        options={{
          loop: true,
          autoPlay: true,
          animationData: emptyState,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
      />
    </div>
  )
}

export default ClientFinancialsLayout
