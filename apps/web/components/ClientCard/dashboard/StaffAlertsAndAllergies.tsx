import styles from '../../../../../libs/ui/src/lib/client-dashboard-layout/ClientDashboardLayout.module.less'
import { TickerTile } from '@pabau/ui'
import React from 'react'
import { ReactComponent as NoAlert } from '../../../../../libs/ui/src/assets/images/client-card/ticker/no-alert.svg'

const noItemImage = <NoAlert />

//TODO: convert this to a useXxxQuery
const alerts = []

export const StaffAlertsAndAllergies = () => (
  <div className={styles.alertsContainer}>
    <TickerTile
      title="Staff Alerts & Allergies"
      items={[
        <div
          key={'alert-tile-1'}
          className={styles.tile}
          style={{ width: '100%' }}
        >
          <div className={styles.staffAlerts}>
            <div className={styles.content}>
              {alerts.map((item, index) => (
                <div className={styles.staffAlert} key={`staff-alert-${index}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>,
      ]}
      noItemText="No alerts"
      noItemImage={noItemImage}
      isBlank={alerts.length === 0}
      speed={2500}
    />
  </div>
)
