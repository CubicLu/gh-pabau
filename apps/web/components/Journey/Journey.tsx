import React, { FC, useEffect, useState } from 'react'
import { FullScreenReportModal as FullScreenModal } from '@pabau/ui'
import dayjs from 'dayjs'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import styles from './Journey.module.less'
import Tile from './Tile'
import { ReactComponent as Waiting } from '../../assets/images/waiting.svg'
import { ReactComponent as InProgress } from '../../assets/images/in-progress.svg'
import { ReactComponent as Complete } from '../../assets/images/complete.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import Appointments from '../Appointments/Appointments'
import { useGetCompanyAppointmentsByDateQuery } from '@pabau/graphql'
import { useUser } from '../../context/UserContext'
import { JourneyCalendar } from '@pabau/ui'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'

interface JourneyP {
  modalVisible?: boolean
  handleClose?: () => void
}

const dateFormat = 'YYYYMMDDHHmmss'
// eslint-disable-next-line unicorn/prefer-set-has
const notInProgressStatuses = ['waiting', 'cancelled', 'complete']

const Journey: FC<JourneyP> = ({ modalVisible = true, handleClose }) => {
  const { t } = useTranslationI18()
  const [appointements, setAppointments] = useState([])
  const [allAppointments, setAllAppointments] = useState([])
  const [filterStatus, setFilterStatus] = useState<string>()
  const [selectedDate, setSelectedDate] = useState(dayjs().format('MMM D YYYY'))
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

  useEffect(() => {
    const startDate = Number.parseFloat(dayjs(selectedDate).format(dateFormat))
    const endDate = Number.parseFloat(
      dayjs(selectedDate).add(1, 'day').format(dateFormat)
    )
    setStartDate(startDate)
    setEndDate(endDate)
  }, [selectedDate])

  useEffect(() => {
    if (appointmentsData?.findManyBooking?.length > 0) {
      const appointements = appointmentsData.findManyBooking
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
            staffMember: `Dr. ${appt.CmStaffGeneral?.Fname} ${appt.CmStaffGeneral?.Lname}`,
            paymentStatus: appt.InvSale ? 'paid' : 'unpaid',
            status: appt.status.toLocaleLowerCase(),
            date: appt.start_date,
          }
        })
      setAppointments(appointements)
      setAllAppointments(appointements)
    } else {
      setAppointments(null)
    }
  }, [appointmentsData])

  const renderHeaderCenter = () => (
    <div className={styles.headerCenter}>
      <span>{dayjs(selectedDate).format('MMMM YYYY')}</span>
    </div>
  )

  const renderHeaderLogo = () => (
    <div className={styles.logoContainer}>
      <SkinHealth />
    </div>
  )

  useEffect(() => {
    if (filterStatus === 'in-progress') {
      const filteredAppts = allAppointments.filter(
        (appt) => !notInProgressStatuses.includes(appt.status)
      )
      setAppointments(filteredAppts)
    } else {
      const filteredAppts = allAppointments.filter(
        (appt) => appt.status === filterStatus
      )
      setAppointments(filteredAppts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus])

  const onTileClick = (tile: string) => {
    setFilterStatus(tile)
  }

  return (
    <FullScreenModal
      visible={modalVisible}
      title={renderHeaderLogo()}
      center={renderHeaderCenter()}
      hideBackIcon
      operations={[]}
      onBackClick={() => {
        handleClose()
      }}
      footer={true}
    >
      <div className={styles.journeyContainer}>
        <div className={styles.calendarWrapper}>
          <JourneyCalendar
            activeDate={selectedDate}
            setActiveDate={(date) => setSelectedDate(date)}
          />
        </div>
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <Appointments appointments={appointements} />
          </div>
          <div className={styles.gridItems}>
            <Tile
              text={t('journey.modal.appointements.status.waiting')}
              count={
                (allAppointments?.length > 0 &&
                  allAppointments.filter((appt) => appt?.status === 'waiting')
                    ?.length) ||
                0
              }
              name="waiting"
              onTileClick={onTileClick}
              icon={<Waiting />}
              filterStatus={filterStatus}
            />
            <Tile
              text={t('journey.modal.appointements.status.in.progress')}
              count={
                (allAppointments?.length > 0 &&
                  allAppointments.filter(
                    (appt) => !notInProgressStatuses.includes(appt.status)
                  )?.length) ||
                0
              }
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
    </FullScreenModal>
  )
}

export default Journey
