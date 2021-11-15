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
import {
  PaymentStatus,
  AppointmentItemP,
} from '../../components/Appointments/AppointmentItem'

interface JourneyP {
  modalVisible?: boolean
  handleClose?: () => void
}

const dateFormat = 'YYYYMMDDHHmmss'

const Journey: FC<JourneyP> = () => {
  const { t } = useTranslationI18()
  const [appointements, setAppointments] = useState<AppointmentItemP[]>([])
  const [allAppointments, setAllAppointments] = useState<AppointmentItemP[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [inProgressAppts, setInprogressAppts] = useState<number[]>([])
  const [filterStatus, setFilterStatus] = useState<string>()
  const [startDate, setStartDate] = useState<number>(
    Number.parseFloat(dayjs().format(dateFormat))
  )
  const [endDate, setEndDate] = useState<number>(
    Number.parseFloat(dayjs().add(1, 'day').format(dateFormat))
  )

  const { me } = useUser()

  const { data: appointmentsData } = useGetCompanyAppointmentsByDateQuery({
    variables: {
      startDate: startDate,
      endDate: endDate,
      companyId: me?.company,
    },
  })

  const addInProgressAppt = (appt: number) => {
    setInprogressAppts((prevState) => {
      return [...prevState, appt]
    })
  }

  useEffect(() => {
    const startDate = Number.parseFloat(dayjs(selectedDate).format(dateFormat))
    const endDate = Number.parseFloat(
      dayjs(selectedDate).add(1, 'day').format(dateFormat)
    )
    setStartDate(startDate)
    setEndDate(endDate)
  }, [selectedDate])

  useEffect(() => {
    setInprogressAppts([])
    if (appointmentsData?.findManyBooking?.length > 0) {
      const allAppointements = appointmentsData.findManyBooking
        .filter((appt) => appt?.Contact !== null && appt.status !== 'Cancelled')
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
            staffMember: t('journey.modal.appointments.dr.name', {
              drName: `${appt.CmStaffGeneral?.Fname} ${appt.CmStaffGeneral?.Lname}`,
            }),
            paymentStatus: appt.InvSale
              ? PaymentStatus.paid
              : PaymentStatus.unpaid,
            status: appt.status.toLocaleLowerCase(),
            date: appt.start_date,
          }
        })
      setAllAppointments(allAppointements)
      const initialAppointments = allAppointements.filter(
        (appt) => appt.status !== 'complete'
      )
      setAppointments(initialAppointments)
    } else {
      setAppointments(null)
      setAllAppointments(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentsData])

  useEffect(() => {
    if (filterStatus === 'in-progress') {
      const filteredAppts = allAppointments.filter((appt) =>
        inProgressAppts?.includes(appt.id)
      )
      setAppointments(filteredAppts)
    } else {
      const filteredAppts = allAppointments.filter(
        (appt) =>
          appt.status === filterStatus && !inProgressAppts?.includes(appt.id)
      )
      setAppointments(filteredAppts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus])

  const onTileClick = (tile: string) => {
    setFilterStatus(tile)
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

export default Journey
