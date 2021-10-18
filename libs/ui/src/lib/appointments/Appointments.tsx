/**
 * This is a Pabau Appointments
 */

import React, { FC } from 'react'
import AppointmentItem, { AppointmentItemP } from './AppointmentItem'
import styles from './Appointments.module.less'

interface P {
  date?: Date
  appointments?: AppointmentItemP[]
}

export const Appointments: FC<P> = ({ date, appointments }) => {
  return (
    <div className={styles.appointmentContainer}>
      {appointments &&
        appointments?.length > 0 &&
        appointments?.map((appt, i) => {
          return <AppointmentItem key={i} {...appt} />
        })}
    </div>
  )
}

export default Appointments
