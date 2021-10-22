import { TickerTile } from '@pabau/ui'
import React from 'react'
import { useMedia } from 'react-use'
import { ReactComponent as NoMedication } from '../../../../../libs/ui/src/assets/images/client-card/ticker/no-medication.svg'
import styles from './common.module.less'

const noItemImage = <NoMedication />

const width = 177
const mobileWidth = 160
const height = 177
const mobileHeight = 160

//TODO: convert this to a useXxxQuery
const medications = []

export const Medications = () => {
  const isMobile = useMedia('(max-width: 576px)', false)

  return (
    <div className={styles.medicationsContainer}>
      <div>
        <TickerTile
          items={medications.map((item, index) => (
            <div
              key={`medication-item-${index}`}
              className={styles.squareTile}
              style={{
                width: `${(isMobile ? mobileWidth : width) - 32}px`,
                height: `${(isMobile ? mobileHeight : height) - 64}px`,
              }}
            >
              <div>
                {item.descriptions.map((description, index) => (
                  <React.Fragment key={`medication-description-${index}`}>
                    <div className={styles.descriptionTitle}>
                      {description.name}
                    </div>
                    <div className={styles.descriptionContent}>
                      {description.amount}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className={styles.date}>{item.date}</div>
            </div>
          ))}
          speed={3500}
          title="Medications"
          isBlank={medications.length === 0}
          noItemText="No medications"
          noItemImage={noItemImage}
        />
      </div>
    </div>
  )
}
