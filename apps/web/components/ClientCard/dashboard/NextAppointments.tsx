import styles from './NextAppointments.module.less'
import { TickerTile } from '@pabau/ui'
import * as React from 'react'
import { ReactComponent as NoAppointment } from './icons/no-appointment.svg'
import { useClientsGetNextAppointmentsQuery } from '@pabau/graphql'
import { useRouter } from 'next/router'

const noItemImage = <NoAppointment />

const NextAppointments = () => {
  const router = useRouter()
  const { data } = useClientsGetNextAppointmentsQuery({
    //TODO: calculcate start_date to now()
    variables: { id: Number(router.query['id']), start_date: 20210927000000 },
    fetchPolicy: 'no-cache',
    skip: !router.query['id'],
  })
  return (
    <div className={styles.nextAppointmentContainer}>
      <TickerTile
        items={data?.findFirstCmContact?.Booking?.map(
          //TODO: add image, title, description to the query and re-run `yarn` then remove the ": any"
          ({ id, image, title, description }: any) => (
            <div
              className={styles.tile}
              key={`next-appointment-item-${id}`}
              style={{ height: '72px' }}
            >
              <div className={styles.content}>
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                <div>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.description}>{description}</div>
                </div>
              </div>
            </div>
          )
        )}
        speed={4500}
        title="Next appointments"
        showCount={true}
        isBlank={data?.findFirstCmContact?.Booking?.length === 0}
        noItemText="No upcoming appointment"
        noItemImage={noItemImage}
      />
    </div>
  )
}

export default NextAppointments
