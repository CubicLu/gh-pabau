import React, { FC } from 'react'
import styles from './ClientDashboardLayout.module.less'

export const ClientDashboardLayout: FC = ({ children }) => (
  <div className={styles.clientDashboardLayout}>
    {/* ticker tiles */}
    <div>{children}</div>
    {/* acitivity part */}
    <div></div>
  </div>
)
