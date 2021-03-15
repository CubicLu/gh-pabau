import React from 'react'
import { StaffPerformanceReview, TabMenu } from '@pabau/ui'
import Assessment from './Assessment'
import PeerFeedback from './PeerFeedback'
import styles from './Performance.module.less'

const Performance = () => {
  return (
    <div className={styles.performanceMainWrapper}>
      <h4>Performance</h4>
      <div className={styles.performanceCustom}>
        <StaffPerformanceReview
          reviewDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
        />
      </div>
      <TabMenu
        className={styles.tabSetPerformance}
        tabPosition={'top'}
        menuItems={['Peer Feedback', 'Assessment']}
      >
        <PeerFeedback />
        <Assessment />
      </TabMenu>
    </div>
  )
}

export default Performance
