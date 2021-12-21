import React, { FC } from 'react'
import styles from './Journey.module.less'
import Tile from './Tile'
import { ReactComponent as Waiting } from '../../assets/images/waiting.svg'
import { ReactComponent as InProgress } from '../../assets/images/in-progress.svg'
import { ReactComponent as Complete } from '../../assets/images/complete.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import Appointments from '../Appointments/Appointments'
import { JourneyAppointmentItem } from '../Appointments/AppointmentItem'
import { JourneyCalendar } from '@pabau/ui'

interface P {
  selectedDate: Date
  setSelectedDate: (date) => void
  appointements: JourneyAppointmentItem[]
  addInProgressAppt?: (id) => void
  allAppointments: JourneyAppointmentItem[]
  inProgressAppts?: number[]
  filterStatus?: string
  onTileClick?: (status) => void
}

const JourneyComponent: FC<P> = ({
  onTileClick,
  selectedDate,
  setSelectedDate,
  appointements,
  addInProgressAppt,
  allAppointments,
  inProgressAppts,
  filterStatus,
}) => {
  const { t } = useTranslationI18()

  return (
    <div className={styles.journeyContainer}>
      <div className={styles.calendarWrapper}>
        <JourneyCalendar
          activeDate={selectedDate}
          setActiveDate={(date) => setSelectedDate(date)}
        />
      </div>
      <div className={styles.grid}>
        <div className={styles.gridItems}>
          <Appointments
            appointments={appointements}
            addInProgressAppt={addInProgressAppt}
          />
        </div>
        <div className={styles.gridItems}>
          <Tile
            text={t('journey.modal.appointements.status.waiting')}
            count={
              (allAppointments?.length > 0 &&
                allAppointments.filter(
                  (appt) =>
                    appt?.status === 'waiting' &&
                    !inProgressAppts?.includes(appt.id)
                )?.length) ||
              0
            }
            name="waiting"
            onTileClick={onTileClick}
            icon={<Waiting />}
            filterStatus={filterStatus}
          />
          <Tile
            text={t('journey.modal.appointements.status.in.progress')}
            count={inProgressAppts?.length || 0}
            icon={<InProgress />}
            name="in-progress"
            onTileClick={onTileClick}
            filterStatus={filterStatus}
          />
          <Tile
            text={t('journey.modal.appointements.status.complete')}
            count={
              (allAppointments?.length > 0 &&
                allAppointments.filter((appt) => appt?.status === 'complete')
                  ?.length) ||
              0
            }
            name={'complete'}
            onTileClick={onTileClick}
            icon={<Complete />}
            filterStatus={filterStatus}
          />
        </div>
      </div>
    </div>
  )
}

export default JourneyComponent
