import React from 'react'
import styles from './LeadsStages.module.less'
import { KanbanCard } from '@pabau/ui'

export const LeadsSkeleton = () => {
  const grid = 4
  return (
    <div
      style={{
        padding: `0 ${grid * 1} ${grid * 1}`,
        margin: `0 0 ${grid}px 0`,
        width: `100%`,
        gap: '15px',
      }}
    >
      {[
        ...Array.from({ length: 4 }).map((v, i) => (
          <div key={`${i}-canban-card`} className={styles.cardWrapper}>
            <KanbanCard isLoading={true} />
          </div>
        )),
      ]}
    </div>
  )
}

export default LeadsSkeleton
