import React, { FC } from 'react'
import AppointmentItem, { JourneyAppointmentItem } from './AppointmentItem'
import styles from './Appointments.module.less'

interface P {
  appointments?: JourneyAppointmentItem[]
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
