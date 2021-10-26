/**
 * This is a Pabau Appointments
 */

import React, { FC } from 'react'
import AppointmentItem, { AppointmentItemP } from './AppointmentItem'
import styles from './Appointments.module.less'

interface P {
  date?: Date | string
  appointments?: AppointmentItemP[]
}

export const Appointments: FC<P> = ({ date, appointments }) => {
  return (
    <div
      className={styles.appointmentContainer}
      style={{
        border: appointments?.length > 0 ? '1px solid #f4f5f7' : 'none',
      }}
    >
      {appointments &&
        appointments?.length > 0 &&
        appointments.map((appt) => {
          return <AppointmentItem key={appt.key} {...appt} />
        })}
    </div>
  )
}

export default Appointments