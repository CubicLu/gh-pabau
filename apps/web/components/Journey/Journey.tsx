import React, { FC, useEffect, useState } from 'react'
import { FullScreenReportModal as FullScreenModal } from '@pabau/ui'
import dayjs from 'dayjs'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import styles from './Journey.module.less'
import Tile from './Tile'
import { ReactComponent as Waiting } from '../../assets/images/waiting.svg'
import { ReactComponent as InProgress } from '../../assets/images/in-progress.svg'
import { ReactComponent as Arrived } from '../../assets/images/arrived.svg'
import { ReactComponent as Complete } from '../../assets/images/complete.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import Appointments from '../Appointments/Appointments'
import clientImg from '../../assets/images/avatar.png'
import { useMedia } from 'react-use'
import { useGetCompanyAppointmentsByDateQuery } from '@pabau/graphql'
import { useUser } from '../../context/UserContext'

interface JourneyP {
  modalVisible?: boolean
  handleClose?: () => void
}

export const appointmentData = [
  {
    key: '1',
    time: '10:30',
    avatar: clientImg,
    clientName: 'Ralph Edwards',
    serviceName: 'Ablation Skin Blemish - CO2 Laser',
    serviceColor: '#ffadfe',
    checkingStatus: 'Not Checked-in',
    staffMember: 'Dr. Emilly Connor',
    paymentStatus: 'paid',
    status: 'waiting',
    date: '2021-10-21T12:10:28+05:30',
  },
  {
    key: '2',
    time: '10:30',
    avatar: clientImg,
    clientName: 'Sylvia Cole',
    serviceName: 'botox 1 area',
    serviceColor: '#388E3C',
    checkingStatus: 'Not Checked-in',
    staffMember: 'Dr. Emilly Connor',
    paymentStatus: 'paid',
    status: 'waiting',
    date: '2021-10-21T12:10:28+05:30',
  },
  {
    key: '3',
    time: '10:30',
    avatar: clientImg,
    clientName: 'Bessie Cooper',
    serviceName: 'Facial Reconstruction',
    checkingStatus: 'Not Checked-in',
    serviceColor: '#ffadfe',
    staffMember: 'Dr. Emilly Connor',
    paymentStatus: 'unpaid',
    status: 'waiting',
    date: '2021-10-21T12:10:28+05:30',
  },
]

const Journey: FC<JourneyP> = ({ modalVisible = true, handleClose }) => {
  const { t } = useTranslationI18()
  const isTablet = useMedia('(max-width: 1024px)', false)
  const [appointements, setAppointments] = useState([])
  console.log('isTablet', isTablet)

  const { me } = useUser()

  const { data: appointmentsData } = useGetCompanyAppointmentsByDateQuery({
    variables: {
      startDate: 20180725120000,
      companyId: me?.company,
    },
  })

  console.log('appointmentsData', appointmentsData)

  useEffect(() => {
    if (appointmentsData?.findManyBooking?.length > 0) {
      const appointements = appointmentsData.findManyBooking.map((appt) => {
        return {
          key: appt.id.toString(),
          id: appt.id,
          time: '10:30',
          avatar: appt?.Contact?.Avatar || '',
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
    }
  }, [appointmentsData])

  const renderHeaderCenter = () => (
    <div className={styles.headerCenter}>
      <span>{dayjs().format('MMMM YYYY')}</span>
      <p>Skin Health Clinic</p>
    </div>
  )

  const renderHeaderLogo = () => (
    <div className={styles.logoContainer}>
      <SkinHealth />
    </div>
  )

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
    </FullScreenModal>
  )
}

export default Journey
