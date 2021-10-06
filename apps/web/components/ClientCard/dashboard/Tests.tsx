import styles from '../../../../../libs/ui/src/lib/client-dashboard-layout/ClientDashboardLayout.module.less'
import { TickerTile } from '@pabau/ui'
import React from 'react'
import { ReactComponent as NoTest } from '../../assets/images/client-card/ticker/no-test.svg'
import { useMedia } from 'react-use'

const noItemImage = <NoTest />

const width = 177
const mobileWidth = 160
const height = 177
const mobileHeight = 160

//TODO: convert this to a useXxxQuery
const tests = []

export const Tests = () => {
  const isMobile = useMedia('(max-width: 576px)', false)

  return (
    <div className={styles.testsContainer}>
      <div>
        <TickerTile
          title="Tests"
          items={tests.map((item, index) => (
            <div
              key={`test-item-${index}`}
              className={styles.squareTile}
              style={{
                width: `${(isMobile ? mobileWidth : width) - 32}px`,
                height: `${(isMobile ? mobileHeight : height) - 64}px`,
              }}
            >
              <div>
                {item.descriptions.map((description, index) => (
                  <div
                    className={styles.description}
                    key={`test-description-${index}`}
                  >
                    {description}
                  </div>
                ))}
              </div>
              <div>
                <div className={styles.tester}>{item.tester}</div>
                <div className={styles.date}>{item.date}</div>
              </div>
            </div>
          ))}
          speed={5000}
          showCount={true}
          isBlank={tests.length === 0}
          noItemText="No tests"
          noItemImage={noItemImage}
        />
      </div>
    </div>
  )
}
