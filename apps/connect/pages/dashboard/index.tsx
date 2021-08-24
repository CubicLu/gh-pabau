import { HistoryOutlined, ScheduleOutlined } from '@ant-design/icons'
import { SortOrder, useGetClientAppointmentsLazyQuery } from '@pabau/graphql'
import { ButtonLabel } from '@pabau/ui'
import { Table } from 'antd'
import { useRouter } from 'next/router'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ConnectCalendar } from '../../assets/images/connect-calendar.svg'
import { ReactComponent as ConnectNotification } from '../../assets/images/connect-notification.svg'
import { ReactComponent as ConnectSpeechBubble } from '../../assets/images/connect-speech-bubble.svg'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/ContextWrapper/context/ClientContext'
import { useApptFormatter } from '../../hooks/useApptFormatter'
import styles from './dashboard.module.less'

interface Notification {
  date: string
  content: ReactNode
}

const defualtNotifications: Notification[] = [
  {
    date: '1 hour ago',
    content:
      'The clinician will be in the conference in 5 minutes. You need a quiet place to talk and good wifi or 4G.',
  },
  {
    date: '3 hours ago',
    content: 'Your appointment is in 2 days',
  },
  {
    date: '4 days ago',
    content: (
      <>
        You successfully booked an Acne Consultation appointment with Dr. Alisa
        Moor. To see appointment details <a href="/">click here</a>
      </>
    ),
  },
]

export const Dashboard = (props) => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)
  const router = useRouter()
  const [appointments, setAppointments] = useState([])
  const [upcomingAppointment, setUpcomingAppointment] = useState(null)
  const [notifications, setNotifications] = useState<Notification[]>(
    defualtNotifications
  )

  const { formatAppts } = useApptFormatter()
  const columns = [
    {
      title: t('connect.dashboard.column.date'),
      dataIndex: 'date',
      key: 'date',
      width: '215px',
    },
    {
      title: t('connect.dashboard.column.time'),
      dataIndex: 'time',
      key: 'time',
      width: '95px',
    },
    {
      title: t('connect.dashboard.column.duration'),
      dataIndex: 'duration',
      key: 'duartion',
      width: '108px',
    },
    {
      title: t('connect.dashboard.column.service'),
      dataIndex: 'service',
      key: 'service',
      width: '274px',
    },
    {
      title: t('connect.dashboard.column.doctor'),
      dataIndex: 'doctor',
      key: 'doctor',
      width: '212px',
      // eslint-disable-next-line react/display-name
      render: (doctor) => {
        const { name, avatar } = doctor
        return (
          <div className={styles.activityDoctor}>
            <div
              className={styles.activityDoctorAvatar}
              style={{ backgroundImage: `url(${avatar})` }}
            />
            <span className={styles.activityDoctorName}>{name}</span>
          </div>
        )
      },
    },
    {
      title: t('connect.dashboard.column.status'),
      dataIndex: 'status',
      key: 'status',
      width: '254px',
      // eslint-disable-next-line react/display-name
      render: (status) => {
        return (
          <div className={styles.buttonLabelContainer}>
            <ButtonLabel
              text={
                status === 'upcoming'
                  ? t('connect.dashboard.column.status.upcoming')
                  : status === 'past'
                  ? t('connect.dashboard.column.status.past')
                  : t('connect.dashboard.column.status.cancelled')
              }
              type={
                status === 'upcoming'
                  ? 'success'
                  : status === 'past'
                  ? 'warning'
                  : undefined
              }
              className={
                status === 'cancelled' ? styles.buttonLabelCancelled : ''
              }
            />
          </div>
        )
      },
    },
  ]

  const [getClientAppointments] = useGetClientAppointmentsLazyQuery({
    onCompleted(response) {
      const mappedAppointments = formatAppts(response.findManyBooking)
      const temp_upcomingAppointment = mappedAppointments.find(
        (appt) => appt.status === 'upcoming'
      )
      setUpcomingAppointment(temp_upcomingAppointment)
      setAppointments(mappedAppointments)
    },
    onError(error) {
      console.log('getclientAppointmentsLazyQueryError', error)
    },
  })

  useEffect(() => {
    setNotifications(defualtNotifications)
    if (clientContext) {
      getClientAppointments({
        variables: {
          take: 10,
          skip: 0,
          orderBy: SortOrder.Desc,
          contactId: clientContext[0].contact_id,
        },
      })
    }
  }, [clientContext, getClientAppointments])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.connectDashboard}>
        <h1 className={styles.connectDashboardTitle}>
          {t('connect.dashboard.title')}
        </h1>
        <div className={styles.connectDashboardContent}>
          <div>
            <div className={styles.connectDashboardSection}>
              <p className={styles.connectDashboardSectionHeader}>
                {t('connect.dashboard.upcoming.appointments')}
              </p>
              <div className={styles.connectDashboardSectionBody}>
                {!upcomingAppointment && (
                  <div className={styles.noItems}>
                    <div className={styles.noItemsImageContainer}>
                      <ConnectCalendar className={styles.noItemsImage} />
                    </div>
                    <p className={styles.noItemsText}>
                      {t('connect.dashboard.upcoming.appointments.no')}
                    </p>
                  </div>
                )}
                {upcomingAppointment && (
                  <div className={styles.upcomingAppointment}>
                    <div className={styles.upcomingAppointmentHeader}>
                      <div
                        className={styles.userAvatar}
                        style={{
                          backgroundImage: `url(${upcomingAppointment.doctor.avatar})`,
                        }}
                      />
                      <div className={styles.userInfo}>
                        <p className={styles.userName}>
                          {upcomingAppointment.doctor.name}
                        </p>
                        <p className={styles.userPosition}>
                          {upcomingAppointment.doctor.title}
                        </p>
                      </div>
                    </div>
                    <div className={styles.upcomingAppointmentBody}>
                      <div className={styles.upcomingAppointmentItem}>
                        <p className={styles.upcomingAppointmentItemTitle}>
                          {t('connect.dashboard.service')}
                        </p>
                        <p className={styles.upcomingAppointmentItemContent}>
                          {upcomingAppointment.service}
                        </p>
                      </div>
                      <div className={styles.upcomingAppointmentItem}>
                        <p className={styles.upcomingAppointmentItemTitle}>
                          {t('connect.dashboard.column.date')}
                        </p>
                        <p className={styles.upcomingAppointmentItemContent}>
                          {upcomingAppointment.date}
                        </p>
                      </div>
                      <div className={styles.upcomingAppointmentItem}>
                        <p className={styles.upcomingAppointmentItemTitle}>
                          {t('connect.dashboard.address')}
                        </p>
                        <p className={styles.upcomingAppointmentItemContent}>
                          {upcomingAppointment.address_street}
                        </p>
                        <p className={styles.upcomingAppointmentItemContent}>
                          {upcomingAppointment.address_postcode}
                        </p>
                        <p className={styles.upcomingAppointmentItemContent}>
                          {upcomingAppointment.address_city}
                        </p>
                      </div>
                      <div className={styles.upcomingAppointmentItem}>
                        <p className={styles.upcomingAppointmentItemTitle}>
                          {t('connect.dashboard.column.time')}
                        </p>
                        <p className={styles.upcomingAppointmentItemContent}>
                          {`${upcomingAppointment.time} - ${upcomingAppointment.time_to}`}
                        </p>
                        <div className={styles.upcomingAppointmentItemDuration}>
                          <HistoryOutlined />
                          <span className={styles.duration}>
                            {upcomingAppointment.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.connectDashboardSection}>
              <p className={styles.connectDashboardSectionHeader}>
                {t('connect.dashboard.notifications')}
              </p>
              <div className={styles.connectDashboardSectionBody}>
                {notifications.length === 0 && (
                  <div className={styles.noItems}>
                    <div className={styles.noItemsImageContainer}>
                      <ConnectNotification className={styles.noItemsImage} />
                    </div>
                    <p className={styles.noItemsText}>
                      {t('connect.dashboard.notifications.no')}
                    </p>
                  </div>
                )}
                {notifications.length > 0 && (
                  <div className={styles.notifications}>
                    {notifications.map((notification, index) => (
                      <div
                        className={styles.notificationItem}
                        key={`notificaiton-${index}`}
                      >
                        <div>
                          <ScheduleOutlined />
                        </div>
                        <div>
                          <p className={styles.notificationDate}>
                            {notification.date}
                          </p>
                          <p className={styles.notificationContent}>
                            {notification.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.connectDashboardSection}>
            <p className={styles.connectDashboardSectionHeader}>
              {t('connect.dashboard.appointments.activity')}
            </p>
            <div className={styles.connectDashboardSectionBody}>
              {appointments.length === 0 && (
                <div className={styles.noItems}>
                  <div className={styles.noItemsImageContainer}>
                    <ConnectSpeechBubble className={styles.noItemsImage} />
                  </div>
                  <p className={styles.noItemsText}>
                    {t('connect.dashboard.appointments.activity.no')}
                  </p>
                </div>
              )}
              {appointments.length > 0 && (
                <div className={styles.appointmentActivity}>
                  <Table
                    dataSource={
                      appointments.map((item, index) => ({
                        ...item,
                        key: index,
                      })) as never[]
                    }
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    onRow={(record, index) => {
                      return {
                        onClick: (event) => {
                          router.push(
                            `/account/appointments/appointment-details/${record['id']}`
                          )
                        },
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default Dashboard
