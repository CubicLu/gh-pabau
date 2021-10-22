import styles from './NextAppointments.module.less'
import { TickerTile } from '@pabau/ui'
import * as React from 'react'
import { ReactComponent as NoMedicalHistory } from '../../../../../libs/ui/src/assets/images/client-card/ticker/no-medical-history.svg'
import { useMedia } from 'react-use'

const noItemImage = <NoMedicalHistory />

const width = 177
const mobileWidth = 160
const height = 177
const mobileHeight = 160

//TODO: convert this to a useXxxQuery
const medicalHistory = []

const NextAppointments = () => {
  const isMobile = useMedia('(max-width: 576px)', false)
  // const { data } = useSomeQuery({
  //   variables: { id: Number(router.query['id']) },
  // })
  return (
    <div className={styles.medicalHistoryContainer}>
      <div>
        <TickerTile
          items={medicalHistory.map((item, index) => (
            <div
              key={`medical-history-item-${index}`}
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
                    key={`medical-history-description-${index}`}
                  >
                    {description}
                  </div>
                ))}
              </div>
              <div className={styles.date}>{item.date}</div>
            </div>
          ))}
          speed={8000}
          title="Medical history"
          isBlank={medicalHistory.length === 0}
          noItemText="No medical history"
          noItemImage={noItemImage}
        />
      </div>
    </div>
  )
}

export default NextAppointments
