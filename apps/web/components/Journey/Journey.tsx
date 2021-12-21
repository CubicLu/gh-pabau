import React, { FC, useEffect, useState } from 'react'
import { FullScreenReportModal as FullScreenModal } from '@pabau/ui'
import dayjs from 'dayjs'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import styles from './Journey.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import {
  PaymentStatus,
  JourneyAppointmentItem,
} from '../Appointments/AppointmentItem'
import { useGetCompanyAppointmentsByDateQuery } from '@pabau/graphql'
import { useUser } from '../../context/UserContext'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { CloseOutlined } from '@ant-design/icons'
import JourneyComponent from './JourneyComponent'

interface P {
  modalVisible?: boolean
  handleClose?: () => void
  withModal?: boolean
}

const dateFormat = 'YYYYMMDDHHmmss'

const Journey: FC<P> = ({
  modalVisible = true,
  handleClose,
  withModal = true,
}) => {
  const { t } = useTranslationI18()
  const [appointements, setAppointments] = useState<JourneyAppointmentItem[]>(
    []
  )
  const [allAppointments, setAllAppointments] = useState<
    JourneyAppointmentItem[]
  >([])
  const [filterStatus, setFilterStatus] = useState<string>()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [inProgressAppts, setInprogressAppts] = useState<number[]>([])
  const [startDate, setStartDate] = useState<number>(
    Number.parseFloat(dayjs().format(dateFormat))
  )
  const [endDate, setEndDate] = useState<number>(
    Number.parseFloat(dayjs().add(1, 'day').format(dateFormat))
  )

  const { me } = useUser()

  const { data: appointmentsData } = useGetCompanyAppointmentsByDateQuery({
    pollInterval: 5000,
    variables: {
      startDate: startDate,
      endDate: endDate,
      companyId: me?.company,
    },
  })

  const addInProgressAppt = (appt: number) => {
    !inProgressAppts.includes(appt) &&
      setInprogressAppts((prevState) => {
        return [...prevState, appt]
      })
  }

  useEffect(() => {
    selectedDate.setHours(0, 0, 0)
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
            serviceColour: appt?.CompanyService?.color,
            service_id: appt?.service_id,
            staffMember: t('journey.modal.appointments.dr.name', {
              drName: `${appt.CmStaffGeneral?.Fname} ${appt.CmStaffGeneral?.Lname}`,
            }),
            paymentStatus:
              appt?.InvSale?.paid_amount > 0
                ? PaymentStatus.paid
                : PaymentStatus.unpaid,
            status: appt.status.toLocaleLowerCase(),
            date: appt.start_date,
          }
        })
      setAppointments(
        appointements.filter((appt) => appt.status !== 'complete')
      )
      setAllAppointments(appointements)
    } else {
      setAppointments(null)
      setAllAppointments(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentsData])

  const renderHeaderCenter = () => (
    <div className={styles.headerCenter}>
      <span>{dayjs(selectedDate).format('MMMM YYYY')}</span>
    </div>
  )

  const renderHeaderLeft = () => (
    <div className={styles.headerLeft}>
      <CloseOutlined
        onClick={() => handleClose()}
        style={{ marginRight: 10, marginTop: 10 }}
      />
      <div className={styles.logoContainer}>
        <SkinHealth />
      </div>
    </div>
  )

  useEffect(() => {
    if (filterStatus === 'in-progress') {
      const filteredAppts = allAppointments.filter((appt) =>
        inProgressAppts?.includes(appt.id)
      )
      setAppointments(filteredAppts)
    } else if (filterStatus) {
      const filteredAppts = allAppointments.filter(
        (appt) =>
          appt.status === filterStatus && !inProgressAppts?.includes(appt.id)
      )
      setAppointments(filteredAppts)
    } else {
      setAppointments(
        allAppointments?.filter((appt) => appt.status !== 'complete')
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus])

  const onTileClick = (tile: string) => {
    if (filterStatus === tile) {
      setFilterStatus(null)
    } else {
      setFilterStatus(tile)
    }
  }

  return withModal ? (
    <FullScreenModal
      visible={modalVisible}
      title={renderHeaderLeft()}
      center={renderHeaderCenter()}
      hideBackIcon
      operations={[]}
      onBackClick={() => {
        handleClose()
      }}
      footer={true}
    >
      <JourneyComponent
        allAppointments={allAppointments}
        appointements={appointements}
        filterStatus={filterStatus}
        selectedDate={selectedDate}
        setSelectedDate={(date) => setSelectedDate(date)}
        addInProgressAppt={(appt) => addInProgressAppt(appt)}
        inProgressAppts={inProgressAppts}
        onTileClick={onTileClick}
      />
    </FullScreenModal>
  ) : (
    <JourneyComponent
      allAppointments={allAppointments}
      appointements={appointements}
      filterStatus={filterStatus}
      selectedDate={selectedDate}
      setSelectedDate={(date) => setSelectedDate(date)}
      addInProgressAppt={(appt) => addInProgressAppt(appt)}
      inProgressAppts={inProgressAppts}
      onTileClick={onTileClick}
    />
  )
}

export default Journey
