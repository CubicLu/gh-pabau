/**
 * This is a Pabau Appointments
 */

import React, { FC } from 'react'
import AppointmentItem, { AppointmentItemP } from './AppointmentItem'
import styles from './Appointments.module.less'

interface P {
  appointments?: AppointmentItemP[]
  addInProgressAppt?: (appt: number) => void
}

export const Appointments: FC<P> = ({ appointments, addInProgressAppt }) => {
  return (
    <div>
      {appointments && appointments?.length > 0 && (
        <div className={styles.appointmentContainer}>
          {appointments.map((appt) => {
            return (
              <AppointmentItem
                key={appt.key}
                {...appt}
                addInProgressAppt={addInProgressAppt}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Appointments
