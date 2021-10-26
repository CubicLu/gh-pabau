import React, { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import styles from './index.module.less'
import Tile from '../../components/Journey/Tile'
import { ReactComponent as Waiting } from '../../assets/images/waiting.svg'
import { ReactComponent as InProgress } from '../../assets/images/in-progress.svg'
import { ReactComponent as Complete } from '../../assets/images/complete.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import Appointments from '../../components/Appointments/Appointments'
import { useGetCompanyAppointmentsByDateQuery } from '@pabau/graphql'
import { useUser } from '../../context/UserContext'
import { JourneyCalendar } from '@pabau/ui'
import { getImage } from '../../components/Uploaders/UploadHelpers/UploadHelpers'

interface JourneyP {
  modalVisible?: boolean
  handleClose?: () => void
}

const Journey: FC<JourneyP> = () => {
  const { t } = useTranslationI18()
  const [appointements, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(dayjs().format('MMM D YYYY'))
  const [filterStatus, setFilterStatus] = useState([])
  const [startDate, setStartDate] = useState<number>(
    Number.parseFloat(dayjs().format('YYYYMMDDHHmmss'))
  )
  const [endDate, setEndDate] = useState<number>(
    Number.parseFloat(dayjs().add(1, 'day').format('YYYYMMDDHHmmss'))
  )

  const { me } = useUser()

  const { data: appointmentsData } = useGetCompanyAppointmentsByDateQuery({
    variables: {
      startDate: startDate,
      endDate: endDate,
      companyId: me?.company,
    },
  })

  useEffect(() => {
    const startDate = Number.parseFloat(
      dayjs(selectedDate).format('YYYYMMDDHHmmss')
    )
    const endDate = Number.parseFloat(
      dayjs(selectedDate).add(1, 'day').format('YYYYMMDDHHmmss')
    )
    setStartDate(startDate)
    setEndDate(endDate)
  }, [selectedDate])

  useEffect(() => {
    if (appointmentsData?.findManyBooking?.length > 0) {
      const appointements = appointmentsData.findManyBooking
        .filter(
          (appt) => appt?.contact_id !== null && appt.status !== 'Cancelled'
        )
        .map((appt) => {
          return {
            key: appt.id.toString(),
            id: appt.id,
            time: dayjs(appt.start_date.toString()).format('HH:mm'),
            avatar:
              (appt?.Contact?.Avatar && getImage(appt?.Contact?.Avatar)) || '',
            clientName: `${appt?.Contact?.Fname || ''} ${
              appt?.Contact?.Lname || ''
            }`,
            serviceName: appt?.service,
            checkingStatus: appt.status,
            service_id: appt?.service_id,
            staffMember: `Dr. ${appt.CmStaffGeneral?.Fname} ${appt.CmStaffGeneral?.Lname}`,
            paymentStatus: 'unpaid',
            status: appt.status,
            date: appt.start_date,
          }
        })
      setAppointments(appointements)
    } else {
      setAppointments(null)
    }
  }, [appointmentsData])

  const onTileClick = (tile: string) => {
    setFilterStatus([tile])
  }

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
            filterStatus={filterStatus}
          />
        </div>
        <div className={styles.gridItems}>
          <Tile
            text={t('journey.modal.appointements.status.waiting')}
            count={
              (appointements?.length > 0 &&
                appointements.filter((appt) => appt?.status === 'Waiting')
                  ?.length) ||
              0
            }
            value="Waiting"
            onTileClick={onTileClick}
            icon={<Waiting />}
            filterStatus={filterStatus}
          />
          <Tile
            text={t('journey.modal.appointements.status.in.progress')}
            count={10}
            icon={<InProgress />}
          />
          <Tile
            text={t('journey.modal.appointements.status.complete')}
            count={
              (appointements?.length > 0 &&
                appointements.filter((appt) => appt?.status === 'Complete')
                  ?.length) ||
              0
            }
            value={'Complete'}
            onTileClick={onTileClick}
            icon={<Complete />}
            filterStatus={filterStatus}
          />
        </div>
      </div>
    </div>
  )
}

export default Journey
