import React, { FC, useRef } from 'react'
import { MyLottie as Lottie } from '@pabau/ui'
import emptyState from '../../assets/lottie/empty-state.json'
import styles from './ClientMedicalHistoryLayout.module.less'

export interface ClientMedicalHistoryLayoutProps {
  isEmpty?: boolean
}

export const ClientMedicalHistoryLayout: FC<ClientMedicalHistoryLayoutProps> =
  ({ isEmpty }) => {
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

export default ClientMedicalHistoryLayout
