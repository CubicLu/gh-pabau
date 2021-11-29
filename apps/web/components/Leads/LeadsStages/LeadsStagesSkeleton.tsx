import React from 'react'
import { Skeleton } from 'antd'
import styles from './LeadsStages.module.less'

export const LeadsStagesSkeleton = () => {
  const getItems = (count) => Array.from({ length: count }, (v, k) => k)

  const allLeadStage = () => {
    const leadStage = getItems(7)
    return (
      <div className={styles.cardMainWrapper}>
        {leadStage.map((index) => {
          return (
            <div key={`stages ${index}`} className={styles.leadStageWrapper}>
              <div className={styles.leadStage}>
                <div className={styles.leadStageTitlemain}>
                  <div className={styles.leadStageTitle}>
                    <div className={styles.leadStageName}>
                      <Skeleton.Input
                        active={true}
                        style={{ width: 90, height: '16px' }}
                        size={`small`}
                      />
                    </div>
                    <div className={styles.leadCount}>
                      <Skeleton.Input
                        active={true}
                        style={{
                          width: 55,
                          marginBottom: '3px',
                          height: '12px',
                        }}
                        size={`small`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <div className={styles.dragableWrapper}>
        <div className={styles.leadStage}>{allLeadStage()}</div>
      </div>
    </div>
  )
}

export default LeadsStagesSkeleton
