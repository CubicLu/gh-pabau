import React, { FC } from 'react'
import styles from './ClientDashboardLayout.module.less'

interface P {
  cssClass?: string
}

export const ClientDashboardLayout: FC<P> = ({ children, cssClass }) => (
  <div className={styles.clientDashboardLayout}>
    {/* ticker tiles */}
    <div
      className={cssClass ? styles.cardCoustomWrapper : styles.childernWrapper}
    >
      {children}
    </div>
    {/* acitivity part */}
    <div></div>
  </div>
)
