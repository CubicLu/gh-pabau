import React, { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import styles from './index.module.less'
import Tile from '../../components/Journey/Tile'
import { ReactComponent as Waiting } from '../../assets/images/waiting.svg'
import { ReactComponent as InProgress } from '../../assets/images/in-progress.svg'
import { ReactComponent as Arrived } from '../../assets/images/arrived.svg'
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

const Journey: FC<JourneyP> = ({ modalVisible = true, handleClose }) => {
  const { t } = useTranslationI18()
  const [appointements, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
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
      const appointements = appointmentsData.findManyBooking.map((appt) => {
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
          checkingStatus: 'Not Checked-in',
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
            date="2021-10-21T12:10:28+05:30"
            appointments={appointements}
          />
        </div>
        <div className={styles.gridItems}>
          <Tile
            text={t('journey.modal.appointements.status.waiting')}
            count={1}
            icon={<Waiting />}
          />
          <Tile
            text={t('journey.modal.appointements.status.in.progress')}
            count={10}
            icon={<InProgress />}
          />
          <Tile
            text={t('journey.modal.appointements.status.arrived')}
            count={3}
            icon={<Arrived />}
          />
          <Tile
            text={t('journey.modal.appointements.status.complete')}
            count={32}
            icon={<Complete />}
          />
        </div>
      </div>
    </div>
  )
}

export default Journey
