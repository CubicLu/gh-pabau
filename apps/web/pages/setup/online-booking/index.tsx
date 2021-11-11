import {
  CalendarOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  ClockCircleOutlined,
  DownOutlined,
  FacebookOutlined,
  GlobalOutlined,
  InstagramOutlined,
  LineChartOutlined,
  MedicineBoxOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  FullScreenReportModal,
  OperationType,
  Pagination,
  Avatar,
} from '@pabau/ui'
import { Col, Row, Typography, Skeleton } from 'antd'
import classNames from 'classnames'
import Highcharts from 'highcharts'
import React, { FC, useEffect, useState, useMemo, useRef } from 'react'
import dayjs from 'dayjs'
import {
  Chart,
  HighchartsChart,
  HighchartsProvider,
} from 'react-jsx-highcharts'
import { useMedia } from 'react-use'
// import SkinHealth from '../../../assets/images/brands/SkinHealth.png'
import CommonHeader from '../../../components/CommonHeader'
import Layout from '../../../components/Layout/Layout'
import {
  AnalyticsTab,
  BuilderTab,
  defaultBuilderData,
  OnlineBookingBuilder,
  PaymentTab,
  PromoteTab,
} from '../../../components/Setup/OnlineBooking'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import Link from 'next/link'
import styles from './index.module.less'
import { useGetClientsAllAppointmentsQuery } from '@pabau/graphql'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
const { Title } = Typography
export interface OnlineBookingProps {
  builderSetting: OnlineBookingBuilder
}

export const Index: FC<OnlineBookingProps> = ({
  builderSetting = defaultBuilderData,
}) => {
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 767px)', false)
  const [getStarted, setGetStarted] = useState(false)
  const [builder, setBuilder] = useState<OnlineBookingBuilder>(
    defaultBuilderData
  )

  const [bookingActivities, setBookingActivities] = useState([])
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        skip: paginateData.offset,
        take: paginateData.limit,
      },
    }
    return queryOptions
  }, [paginateData.offset, paginateData.limit])

  const { data, loading } = useGetClientsAllAppointmentsQuery(getQueryVariables)

  useEffect(() => {
    if (data?.findManyBooking) {
      const bookingData = data?.findManyBooking.map((booking) => {
        return {
          id: booking.id,
          status: t('setup.online-booking.activity.appointment.booked.title', {
            fname: `${booking?.Contact?.Fname}`,
          }),
          time: dayjs(booking.create_date.toString()).format('hh:mm A'),
          details: t('setup.online-booking.activity.appointment.booked.text', {
            time: `${dayjs(booking.start_date.toString()).format(
              'ddd D MMM hh:mm A'
            )}`,
            serviceCount: `${booking.service}`,
            staffname: `${booking?.CmStaffGeneral?.Fname} ${booking?.CmStaffGeneral?.Lname}`,
          }),
          userImage: booking?.CmStaffGeneral?.User?.image
            ? getImage(booking?.CmStaffGeneral?.User?.image)
            : '',
          contact_id: booking?.contact_id,
          contact: { ...booking?.Contact },
          CmStaffGeneral: { ...booking?.CmStaffGeneral },
        }
      })
      setBookingActivities(bookingData)
      setPaginateData({
        ...paginateData,
        total: data?.totalCount,
        showingRecords: data?.findManyBooking?.length,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    setBuilder(builderSetting)
  }, [builderSetting])

  useEffect(() => {
    if (bookingsLayoutRef.current) {
      bookingsLayoutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.currentPage, paginateData.limit])
  const onPressPromote = () => {
    console.log('onPressPromote')
  }

  const bookingsLayoutRef = useRef(null)
  const trends = [
    {
      id: 1,
      icon: <CalendarOutlined style={{ color: '#55B2D3' }} />,
      title: 'Online Bookings',
      total: '1',
      increasing: true,
      percentage: 100,
    },
    {
      id: 2,
      icon: <MedicineBoxOutlined style={{ color: '#55B2D3' }} />,
      title: 'Cross Sells (Service)',
      total: '£ 498.00',
      increasing: false,
      percentage: 100,
    },
    {
      id: 3,
      icon: <ShoppingCartOutlined style={{ color: '#55B2D3' }} />,
      title: 'Cross Sells (Retail)',
      total: '£ 498.00',
      increasing: true,
      percentage: 100,
    },
    {
      id: 4,
      icon: <ClockCircleOutlined style={{ color: '#55B2D3' }} />,
      title: 'Out of hours bookings ',
      total: '1',
      increasing: true,
      percentage: 100,
    },
    {
      id: 5,
      icon: <LineChartOutlined style={{ color: '#55B2D3' }} />,
      title: 'Out of hours revenue',
      total: '£ 498.00',
      increasing: true,
      percentage: 100,
    },
  ]

  const tips = [
    {
      id: 1,
      title: 'Enable services reviews',
      description:
        'On avarage clients that showed a decrease in dropoffs by 8.3%',
    },
    {
      id: 2,
      title: 'Enable avatars',
      description:
        '92% of patients we asked preferred to see a photo of the person they were booking',
    },
    {
      id: 3,
      title: 'Enable deposits',
      description: 'Enabling deposits reduced no shows by 70%',
    },
    {
      id: 4,
      title: 'Enabling upsells',
      description:
        'On average, having upselling enabled increases the avarage spend per online booking by 32%',
    },
    {
      id: 5,
      title: 'Mobile Powered',
      description:
        '49% of your online bookings come via mobile, we are optimized, are you?',
    },
  ]

  const GetStarted = () => {
    return (
      <div className={styles.getStarted}>
        <Row justify="space-between">
          <Col span={24}>
            <div className={styles.onlineBookingMonthContainer}>
              <Title level={5}>
                {t('setup.online-booking.online-bookings-by-month')}
              </Title>
              <HighchartsProvider Highcharts={Highcharts}>
                <HighchartsChart
                  chart={{ type: 'line' }}
                  xAxis={{
                    categories: [
                      'MAR 21',
                      'APR 21',
                      'MAY 21',
                      'JUN 21',
                      'JUL 21',
                      'AUG 21',
                      'SEP 21',
                    ],
                    labels: {
                      style: { color: '#9292A3', fontSize: '12px' },
                    },
                  }}
                  yAxis={{}}
                  series={[
                    {
                      type: 'area',
                      data: [1200, 1800, 2500, 5000, 1250, 3000, 1400],
                      color: '#54B2D3',
                      fillColor: '#E3F2F9',
                    },
                  ]}
                >
                  <Chart height="300px" type="area" />
                </HighchartsChart>
              </HighchartsProvider>
            </div>
          </Col>

          <Col
            span={15}
            className={styles.screenColumn}
            ref={bookingsLayoutRef}
          >
            <div className={styles.campaignContainer}>
              <div>
                <div className={styles.icon}>
                  {/* <Image src={SkinHealth} alt="companyLogo" /> */}
                </div>
                <Title level={4} className={styles.name}>
                  The Skin Clinic - London
                </Title>
                <DownOutlined style={{ fontSize: 18, color: '#9292A3' }} />
              </div>
              <div>
                <Button onClick={onPressPromote}>
                  <NotificationOutlined />
                  Promote
                </Button>
              </div>
            </div>
            <div className={styles.bookingActivityContainer}>
              <Title level={5}>
                {t('setup.online-booking.booking-activity')}
              </Title>
              {!loading
                ? bookingActivities.map((e, i) => {
                    return (
                      <div className={styles.item} key={i}>
                        <div className={styles.image}>
                          <Avatar
                            src={e.userImage}
                            name={`${e?.CmStaffGeneral?.Fname} ${e?.CmStaffGeneral?.Lname}`}
                            size="large"
                          />
                        </div>
                        <div className={styles.content}>
                          <div>
                            <span className={styles.status}>{e.status}</span>
                            <span className={styles.time}>{e.time}</span>
                          </div>
                          <div>
                            <span className={styles.description}>
                              {e.details}{' '}
                              <Link href={'/clients/' + e?.contact_id}>
                                <a>
                                  {e.contact.Fname} {e.contact.Lname}
                                </a>
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : [...Array.from({ length: 10 })].map((e, i) => {
                    return (
                      <div className={styles.item} key={i}>
                        <div className={styles.image}>
                          <Skeleton.Avatar size="large" active />
                        </div>
                        <div className={styles.content}>
                          <div className={styles.skeletonTitle}>
                            <Skeleton
                              className={styles.status}
                              paragraph={false}
                              active
                            />

                            <Skeleton
                              className={styles.time}
                              paragraph={false}
                              active
                            />
                          </div>
                          <div>
                            <Skeleton
                              className={styles.description}
                              paragraph={false}
                              active
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>
            <div className={styles.pagination}>
              <Pagination
                total={paginateData.total}
                defaultPageSize={10}
                customClass={styles.paginationWrap}
                showSizeChanger={false}
                className={styles.paginationNav}
                onChange={onPaginationChange}
                pageSizeOptions={['10', '25', '50', '100']}
                onPageSizeChange={(pageSize) => {
                  setPaginateData({
                    ...paginateData,
                    limit: pageSize,
                    offset: 0,
                    currentPage: 1,
                  })
                }}
                pageSize={paginateData.limit}
                current={paginateData.currentPage}
                showingRecords={paginateData.showingRecords}
              />
            </div>
          </Col>
          <Col span={8} className={styles.screenColumn}>
            <div className={styles.bookingContainer}>
              <Title level={5}>{t('setup.online-booking.bookings')}</Title>
              <div className={styles.item}>
                <div>
                  <GlobalOutlined style={{ color: '#55B2D3' }} />
                  <span>Website</span>
                  <QuestionCircleOutlined />
                </div>
                <span>1221</span>
              </div>
              <div className={styles.item}>
                <div>
                  <FacebookOutlined style={{ color: '#3576CF' }} />
                  <span>Facebook</span>
                  <QuestionCircleOutlined />
                </div>
                <span>853</span>
              </div>
              <div className={styles.item}>
                <div>
                  <InstagramOutlined style={{ color: '#CF3A56' }} />
                  <span>Instagram</span>
                  <QuestionCircleOutlined />
                </div>
                <span>2567</span>
              </div>
              <Button
                type="primary"
                onClick={() => setGetStarted(true)}
                block
                style={{ marginTop: 20 }}
              >
                Customize
              </Button>
            </div>
            <div className={styles.trendContainer}>
              <Title level={5}>{t('setup.online-booking.trends')}</Title>
              {trends.map((e, i) => {
                return (
                  <div className={styles.item} key={i}>
                    <div>
                      {e.icon}
                      <span className={styles.title}>{e.title}</span>
                      <QuestionCircleOutlined />
                    </div>
                    <div>
                      <span className={styles.total}>{e.total}</span>
                      <span className={styles.indicator}>
                        {e.increasing ? (
                          <CaretUpOutlined style={{ color: '#65CD98' }} />
                        ) : (
                          <CaretDownOutlined style={{ color: '#CF3A56' }} />
                        )}
                      </span>
                      <span
                        className={classNames(
                          styles.percentage,
                          e.increasing
                            ? styles.percentageIncreasing
                            : styles.percentageDecreasing
                        )}
                      >
                        {e.percentage}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={styles.tipsContainer}>
              <Title level={5}>{t('setup.online-booking.tips')}</Title>
              <p>{t('setup.online-booking.tips-description')}</p>

              {tips.map((e, i) => {
                return (
                  <div className={styles.item} key={i}>
                    <div className={styles.left}>
                      <ThunderboltOutlined className={styles.icon} />
                    </div>
                    <div className={styles.right}>
                      <span className={styles.title}>{e.title}</span>
                      <span className={styles.description}>
                        {e.description}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Col>
        </Row>
        {/* <img src={onlineBookingBg} alt="" />
        <p className={styles.getStartedTitle}>Modifiy your online booking</p>
        <p className={styles.getStartedDesc}>
          Modify online booking by how it looks, takes payments, collects
          analytics and more
        </p>
        <Button type="primary" onClick={() => setGetStarted(true)}>
          Set up now
        </Button> */}
      </div>
    )
  }
  return (
    <>
      <Layout>
        <CommonHeader
          title={t('setup.online-booking.online-booking')}
          isLeftOutlined
          reversePath="/setup"
        />
        <div className={styles.onlineBookingContainer}>
          {!getStarted && (
            <>
              {!isMobile && (
                <div className={styles.onlineBookingHeader}>
                  <Breadcrumb
                    items={[
                      {
                        breadcrumbName: t('setup.online-booking.setup'),
                        path: 'setup',
                      },
                      {
                        breadcrumbName: t(
                          'setup.online-booking.online-booking'
                        ),
                        path: 'setup/online-booking',
                      },
                    ]}
                  />
                  <Title level={4}>
                    {t('setup.online-booking.online-booking')}
                  </Title>
                </div>
              )}
              <GetStarted />
            </>
          )}
        </div>
      </Layout>
      {getStarted && (
        <FullScreenReportModal
          visible={getStarted}
          title="Edit Online Booking"
          subMenu={['Builder', 'Payment', 'Analytics', 'Promote']}
          operations={[
            OperationType.active,
            OperationType.reset,
            OperationType.cancel,
            OperationType.create,
          ]}
          resetBtnText="Reset to defaults"
          // cancelBtnText="Cancel"
          createBtnText="Save changes"
          onBackClick={() => setGetStarted(false)}
          onCreate={() => setGetStarted(false)}
          onCancel={() => setGetStarted(false)}
          enableCreateBtn={true}
          activated={true}
        >
          <BuilderTab builder={builder} />
          <PaymentTab />
          <AnalyticsTab />
          <PromoteTab />
        </FullScreenReportModal>
      )}
    </>
  )
}

export default Index
