import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
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
import SkinHealth from '../../../../assets/images/brands/SkinHealth.png'
import CommonHeader from '../../../CommonHeader'
import Layout from '../../../Layout/Layout'
import { defaultBuilderData } from '../../OnlineBooking'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import Link from 'next/link'
import styles from './index.module.less'
import { useGetClientsAllAppointmentsQuery } from '@pabau/graphql'
import { getImage } from '../../../Uploaders/UploadHelpers/UploadHelpers'
import { tips, trends } from './ClientPageData'
const { Title } = Typography

interface ClientBookingProps {
  breadcrumbName: string
  path: string
  setup: string
  titleBooking: string
  onlineTitleBooking: string
  stats?: any
}

export interface OnlineBookingProps {
  builderSetting?: OnlineBookingProps
  isClientArea?: boolean
  isOnlineBooking?: boolean
  pageData?: ClientBookingProps
}
export const LayoutArea: FC<OnlineBookingProps> = ({
  children,
  pageData,
  builderSetting = defaultBuilderData,
}) => {
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 767px)', false)
  const [getStarted, setGetStarted] = useState(false)
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
    if (bookingsLayoutRef.current) {
      bookingsLayoutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.currentPage, paginateData.limit])
  const onPressPromote = () => {
    return
  }

  const bookingsLayoutRef = useRef(null)

  const GetStarted = () => {
    return (
      <div className={styles.getStarted}>
        <Row justify="space-between">
          <Col span={24}>
            <div className={styles.onlineBookingMonthContainer}>
              <Title level={5}>{pageData.onlineTitleBooking}</Title>
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
              <div className={styles.svgButton}>
                <div className={styles.icon}>
                  <img src={SkinHealth} alt="companyLogo" />
                </div>
                <Title level={4} className={styles.name}>
                  The Skin Clinic - London
                </Title>
                <DownOutlined />
              </div>
              <div>
                <Button onClick={onPressPromote}>
                  <NotificationOutlined />
                  Promote
                </Button>
              </div>
            </div>
            <div className={styles.bookingActivityContainer}>
              <Title level={5}>{pageData.titleBooking}</Title>
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
              <div>
                {pageData.stats.map((el, i) => (
                  <div className={styles.item} key={i}>
                    <div>
                      {el.statIcon}
                      {el.statName}
                      <span>{el.statQuestion}</span>
                    </div>
                    <span>{el.statValue}</span>
                  </div>
                ))}
              </div>
              <div className={styles.antButton}>
                <Button
                  type="primary"
                  onClick={() => setGetStarted(true)}
                  block
                >
                  Customize
                </Button>
              </div>
            </div>
            <div className={styles.trendContainer}>
              <Title level={5}>{t('setup.online-booking.trends')}</Title>
              {trends.map((e, i) => {
                return (
                  <div className={styles.item} key={i}>
                    <div>
                      <span className={styles.itemInner}>{e.icon}</span>
                      <span className={styles.title}>{e.title}</span>
                      <QuestionCircleOutlined />
                    </div>
                    <div>
                      <span className={styles.total}>{e.total}</span>
                      <span className={styles.indicator}>
                        {e.increasing ? (
                          <CaretUpOutlined className={styles.increase} />
                        ) : (
                          <CaretDownOutlined className={styles.decrease} />
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
      </div>
    )
  }
  return (
    <>
      <Layout>
        <CommonHeader
          title={pageData.breadcrumbName}
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
                        breadcrumbName: pageData.setup,
                        path: pageData.setup,
                      },
                      {
                        breadcrumbName: pageData.breadcrumbName,
                        path: pageData.path,
                      },
                    ]}
                  />
                  <Title level={4}>{pageData.breadcrumbName}</Title>
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
          title="Edit Client Area"
          subMenu={['Builder', 'Payment', 'Analytics', 'Promote']}
          operations={[
            OperationType.active,
            OperationType.reset,
            OperationType.cancel,
            OperationType.create,
          ]}
          resetBtnText="Reset to defaults"
          createBtnText="Save changes"
          onBackClick={() => setGetStarted(false)}
          onCreate={() => setGetStarted(false)}
          onCancel={() => setGetStarted(false)}
          enableCreateBtn={true}
          activated={true}
        >
          {children}
        </FullScreenReportModal>
      )}
    </>
  )
}

export default LayoutArea
