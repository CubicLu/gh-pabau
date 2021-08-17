import { SortOrder, useGetClientAppointmentsLazyQuery } from '@pabau/graphql'
import { Breadcrumb, ButtonLabel, Pagination, TabMenu } from '@pabau/ui'
import { Table, Typography } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ConnectSpeechBubble } from '../../assets/images/connect-speech-bubble.svg'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/ContextWrapper/context/ClientContext'
import TwoFactorAuthentication from '../../components/TwoFactorAuthentication/TwoFactorAuthentication'
import { useApptFormatter } from '../../hooks/useApptFormatter'
import styles from './appointments.module.less'

const { Title } = Typography

interface Appointment {
  id: string
  date: string
  time: string
  duration: string
  service: string
  doctor: {
    name: string
    avatar: string
  }
  status: string
}

const appointments: Appointment[] = []

export const Appointments = () => {
  const { t } = useTranslation('connect')
  const { formatAppts } = useApptFormatter()
  const [lang, setLang] = useState('en')
  const router = useRouter()
  const [upcomingList, setUpcomingList] = useState<Appointment[]>([])
  const [currentTab, setCurrentTab] = useState(0)
  const [pastList, setPastList] = useState<Appointment[]>([])
  const clientContext = useContext(ClientContext)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const [getClientAppointments] = useGetClientAppointmentsLazyQuery({
    onCompleted(response) {
      const mappedAppointments = formatAppts(response.findManyBooking)
      const upcomingAppts = mappedAppointments.filter(
        (appt) => appt.status === 'upcoming' && appt.type !== 'course'
      )
      const pastAppts = mappedAppointments.filter(
        (appt) => appt.status !== 'upcoming' && appt.type !== 'course'
      )

      setUpcomingList(upcomingAppts)
      setPastList(pastAppts)
      setPaginateData({
        ...paginateData,
        showingRecords: currentTab ? pastAppts.length : upcomingAppts.length,
        total: response.totalCount.length,
      })
    },
    onError(error) {
      console.log('getclientAppointmentsLazyQueryError', error)
    },
  })

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
                status === 'cancelled'
                  ? styles.buttonLabelCancelled
                  : styles.buttonLabel
              }
            />
          </div>
        )
      },
    },
  ]

  const handleChangeTab = (activeTab) => {
    if (activeTab === '0') {
      setPaginateData({
        ...paginateData,
        showingRecords: upcomingList.length,
      })
      setCurrentTab(0)
    } else if (activeTab === '1') {
      setPaginateData({
        ...paginateData,
        showingRecords: pastList.length,
      })
      setCurrentTab(1)
    }
  }

  // const handleNextPageData = (pageNumber) => {
  //   if (clientContext) {
  //     const skipValue =
  //       Number(pageNumber) === 1
  //         ? 0
  //         : paginateData.limit * paginateData.currentPage
  //     getClientAppointments({
  //       variables: {
  //         take: paginateData.limit,
  //         skip: skipValue,
  //         orderBy: SortOrder.Desc,
  //         contactId: clientContext[0].contact_id,
  //       },
  //     })

  //     setPaginateData({
  //       ...paginateData,
  //       currentPage: pageNumber,
  //     })
  //   }
  // }

  useEffect(() => {
    if (clientContext) {
      getClientAppointments({
        variables: {
          take: paginateData.limit,
          skip: 0,
          orderBy: SortOrder.Desc,
          contactId: clientContext[0].contact_id,
        },
      })

      setPaginateData({
        ...paginateData,
        currentPage: 1,
      })
    }
  }, [clientContext, paginateData, getClientAppointments])

  // useEffect(() => {
  // handleNextPageData(paginateData.currentPage)
  // }, [paginateData.limit, paginateData.currentPage, handleNextPageData])

  return (
    <TwoFactorAuthentication>
      <ConnectLayout
        onChangeLanguage={(val) => setLang(val)}
        clientContext={clientContext}
      >
        <div className={styles.appointments}>
          <div className={styles.appointmentsHeader}>
            <Breadcrumb
              breadcrumbItems={[
                {
                  breadcrumbName: t('connect.account.title'),
                  path: 'account',
                },
                {
                  breadcrumbName: t('connect.account.appointments'),
                  path: '',
                },
              ]}
            />
            <Title>{t('connect.account.appointments')}</Title>
          </div>
          <div className={styles.appointmentsMobileHeader}>
            <Title>{t('connect.account.appointments')}</Title>
          </div>
          <div className={styles.appointmentsContent}>
            <TabMenu
              menuItems={[
                t('connect.account.appointments.tab.upcoming'),
                t('connect.account.appointments.tab.past'),
              ]}
              tabPosition="top"
              minHeight="1px"
              onChange={(activeTab) => handleChangeTab(activeTab)}
            >
              <div className={styles.appointmentsTableContainer}>
                {upcomingList.length > 0 && (
                  <Table
                    dataSource={
                      upcomingList.map((item, index) => ({
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
                )}
                {upcomingList.length === 0 && (
                  <div className={styles.noItems}>
                    <div className={styles.noItemsImageContainer}>
                      <ConnectSpeechBubble className={styles.noItemsImage} />
                    </div>
                    <p className={styles.noItemsText}>
                      {t('connect.account.appointments.noupcoming')}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.appointmentsTableContainer}>
                {pastList.length > 0 && (
                  <Table
                    dataSource={
                      pastList.map((item, index) => ({
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
                )}
                {pastList.length === 0 && (
                  <div className={styles.noItems}>
                    <div className={styles.noItemsImageContainer}>
                      <ConnectSpeechBubble className={styles.noItemsImage} />
                    </div>
                    <p className={styles.noItemsText}>
                      {t('connect.account.appointments.nopast')}
                    </p>
                  </div>
                )}
              </div>
            </TabMenu>
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={10}
              showSizeChanger={false}
              pageSizeOptions={['10', '25', '50', '100']}
              onChange={(page) => {
                setPaginateData({
                  ...paginateData,
                  currentPage: page,
                })
              }}
              onPageSizeChange={(pageSize) => {
                setPaginateData({
                  ...paginateData,
                  limit: pageSize,
                })
              }}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
            />
          </div>
        </div>
      </ConnectLayout>
    </TwoFactorAuthentication>
  )
}

export default Appointments
