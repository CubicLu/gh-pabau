import React, { FC, useRef } from 'react'
import { MyLottie as Lottie } from '@pabau/ui'
import emptyState from '../../assets/lottie/empty-state.json'
import styles from './ClientGiftVoucherLayout.module.less'

export interface ClientGiftVoucherLayoutProps {
  isEmpty?: boolean
}

export const ClientGiftVoucherLayout: FC<ClientGiftVoucherLayoutProps> = ({
  isEmpty,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className={styles.clientLayout} ref={ref}>
      {isEmpty && (
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
      )}
    </div>
  )
}

export default ClientGiftVoucherLayout
