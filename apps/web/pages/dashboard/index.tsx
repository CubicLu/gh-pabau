import React, { useState, useEffect, useMemo } from 'react'
import { Avatar, Button, RangePicker } from '@pabau/ui'
import Layout from '../../components/Layout/Layout'
import styles from './dashboard.module.less'
import { useUser } from '../../context/UserContext'
import { useQuery } from '@apollo/client'
import { useMedia } from 'react-use'
import {
  GetFinanceDetailsDocument,
  GetBookingStatusCountDocument,
  GetBookingChartDetailDocument,
  GetActiveLocationDocument,
} from '@pabau/graphql'
import {
  DownOutlined,
  UpOutlined,
  CheckOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import CommonHeader from '../../components/CommonHeader'
import dayjs, { Dayjs } from 'dayjs'
import { Menu, Dropdown, Drawer, Col, Row, Select, Skeleton } from 'antd'
import { TopBoard } from '../../components/Dashboard/TopBoard/TopBoard'
import { Charts } from '../../components/Dashboard/Charts/Charts'
import { locationList, dateRangeList } from '../../mocks/Dashboard'
import { ICount } from '../../components/Dashboard/TopBoard/TopBoard'
import {
  defaultAppointmentList,
  defaultOnlineAppointmentList,
  defaultSalesList,
} from '../../mocks/Dashboard'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { cdnURL } from '../../../web/baseUrl'

interface ISetUser {
  key: number
  label: string
  date?: string
  select: boolean
}

const { Option } = Select

export function Index() {
  const isMobile = useMedia('(max-width: 767px)', false)
  const user = useUser()
  const { t } = useTranslationI18()
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [openUserList, setOpenUserList] = useState(false)
  const [openDateModel, setOpenDateModel] = useState(false)
  const [dashboardMode, setDashboardMode] = useState(0)
  const [userListData, setUserListData] = useState<ISetUser[]>(locationList)
  const [location, setLocation] = useState<ISetUser>({
    key: 0,
    label: '',
    date: '',
    select: false,
  })
  const [selectedRange, setSelectedRange] = useState<string>('This month')
  const [filterRange, setFilterRange] = useState<string>('This Month')
  const [previousRange, setPreviousRange] = useState<string>('Previous month')
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])
  const [filterDate, setFilterDate] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])
  const [appointment, setAppointment] = useState<ICount[]>(
    defaultAppointmentList
  )
  const [onlineAppointment, setOnlineAppointment] = useState<ICount[]>(
    defaultOnlineAppointmentList
  )
  const [sales, setSales] = useState<ICount[]>(defaultSalesList)
  const [totalBooking, setTotalBooking] = useState({
    count: 0,
    per: '0%',
  })
  const [totalOnlineBooking, setTotalOnlineBooking] = useState({
    count: 0,
    per: '0%',
  })
  const [totalSalesCount, setTotalSalesCount] = useState({
    count: 0,
    per: '0%',
  })
  const { data: locations } = useQuery(GetActiveLocationDocument)
  const getAppointmentQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        start_date:
          filterRange !== 'All records'
            ? Number.parseFloat(
                dayjs(new Date(`${filterDate[0]}`)).format('YYYYMMDDHHmmss')
              )
            : null,
        end_date:
          filterRange !== 'All records'
            ? Number.parseFloat(
                dayjs(new Date(`${filterDate[1]}`)).format('YYYYMMDDHHmmss')
              )
            : null,
        location_id:
          dashboardMode === 1 || location.key === 0 ? null : location?.key,
        user_id: dashboardMode === 1 ? user?.me?.user : null,
      },
    }
    return queryOptions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardMode, filterDate, location])

  const { data: financeDetails, loading: financeDetailLoading } = useQuery(
    GetFinanceDetailsDocument,
    getAppointmentQueryVariables
  )
  const { data: bookingCounts, loading: bookingCountsLoading } = useQuery(
    GetBookingStatusCountDocument,
    getAppointmentQueryVariables
  )
  const { data: bookingDetails, loading: bookingDetailsLoading } = useQuery(
    GetBookingChartDetailDocument,
    getAppointmentQueryVariables
  )
  useEffect(() => {
    setAppointment(
      bookingCounts?.getBookingStatusCount?.allBookingCounts?.bookingList ??
        defaultAppointmentList
    )
    setOnlineAppointment(
      bookingCounts?.getBookingStatusCount?.onlineBookingCounts?.bookingList ??
        defaultOnlineAppointmentList
    )
    setSales(
      financeDetails?.getFinanceDetails?.salesCount?.salesList ??
        defaultSalesList
    )
    setTotalBooking({
      count:
        bookingCounts?.getBookingStatusCount?.allBookingCounts?.totalBooking,
      per:
        bookingCounts?.getBookingStatusCount?.allBookingCounts?.totalBookingPer,
    })
    setTotalOnlineBooking({
      count:
        bookingCounts?.getBookingStatusCount?.onlineBookingCounts?.totalBooking,
      per:
        bookingCounts?.getBookingStatusCount?.onlineBookingCounts
          ?.totalBookingPer,
    })
    setTotalSalesCount({
      count:
        financeDetails?.getFinanceDetails?.salesCount
          ?.totalAvailableCategoryTypeAmount,
      per:
        financeDetails?.getFinanceDetails?.salesCount
          ?.totalAvailableCategoryTypePer,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeDetails, bookingCounts, bookingDetails])

  useEffect(() => {
    const List = [...userListData]
    if (locations && userListData.length === 1) {
      locations.locations?.map((item) => {
        List.push({
          key: item.id,
          label: item.name,
          select: false,
        })
        return List
      })
    }
    setUserListData(List)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations])

  useEffect(() => {
    const record = userListData.find((item) => item.select === true)
    setLocation(record)
  }, [userListData])

  useEffect(() => {
    if (financeDetailLoading || bookingCountsLoading || bookingDetailsLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [financeDetailLoading, bookingCountsLoading, bookingDetailsLoading])
  const handleSelectMenu = (selectedUser) => {
    const List = [...userListData]
    List.map((item) => {
      if (item.label === selectedUser) {
        item.select = true
      } else {
        item.select = false
      }
      return item
    })
    const record = List.find((item) => item.label === selectedUser)
    setLocation(record)
    setUserListData(List)
    setOpenUserList(false)
  }

  const customMenu = (
    <div className={styles.customMenu}>
      <Menu className={styles.customMenuDropdown}>
        {userListData.map((menu) => {
          return (
            <Menu.Item
              key={menu.key}
              onClick={() => handleSelectMenu(menu.label)}
            >
              <div
                className={menu.select === true ? styles.select : styles.menu}
              >
                <div className={styles.menuIcon}>
                  {menu.select === true && <CheckOutlined />}
                </div>
                {menu.label}
              </div>
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
  const onDateFilterApply = () => {
    setFilterDate([...selectedDates])
    setFilterRange(selectedRange)
    setOpenDateModel(false)
  }
  const onDataRangeSelect = (value) => {
    setSelectedRange(value)
    switch (value) {
      case 'Today': {
        setSelectedDates([dayjs().startOf('day'), dayjs().endOf('day')])
        setPreviousRange('Previous day')
        break
      }
      case 'Yesterday': {
        setSelectedDates([
          dayjs().subtract(1, 'day'),
          dayjs().subtract(1, 'day'),
        ])
        setPreviousRange('Previous day')
        break
      }
      case 'This Week': {
        setSelectedDates([dayjs().day(1), dayjs()])
        setPreviousRange('Previous week')
        break
      }
      case 'Last Week': {
        setSelectedDates([
          dayjs().subtract(1, 'weeks').day(1),
          dayjs().subtract(1, 'weeks').day(6),
        ])
        setPreviousRange('Previous week')
        break
      }
      case 'This Month': {
        setSelectedDates([dayjs().startOf('month'), dayjs()])
        setPreviousRange('Previous month')
        break
      }
      case 'Last Month': {
        setSelectedDates([
          dayjs().subtract(1, 'month').startOf('month'),
          dayjs().subtract(1, 'months').endOf('month'),
        ])
        setPreviousRange('Previous month')
        break
      }
      case 'This Year': {
        setSelectedDates([dayjs().startOf('year'), dayjs()])
        setPreviousRange('Previous year')
        break
      }
      case 'Last Year': {
        setSelectedDates([
          dayjs().subtract(1, 'year').startOf('year'),
          dayjs().subtract(1, 'year').endOf('year'),
        ])
        setPreviousRange('Previous year')
        break
      }
    }
  }
  const handleDateFilter = () => {
    setOpenDateModel((openDateModel) => !openDateModel)
  }
  const showDrawer = () => {
    setVisible(true)
    setOpenUserList(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpenUserList(false)
  }
  const handleDashboardMode = () => {
    setDashboardMode(dashboardMode === 1 ? 0 : 1)
  }
  const dateFilter = (
    <div className={styles.dateFilterContainer}>
      <Select
        style={{ width: '100%' }}
        onChange={onDataRangeSelect}
        value={selectedRange}
      >
        {dateRangeList.map((record) => (
          <Option value={record.value} key={record.value}>
            {record.value}
          </Option>
        ))}
      </Select>
      {selectedRange === 'custom' && (
        <RangePicker
          className={styles.rangePicker}
          value={selectedDates}
          disabledDate={(current) => {
            return current > dayjs().endOf('day')
          }}
          format={
            user?.me?.companyDateFormat === 'd/m/Y'
              ? 'DD/MM/YYYY'
              : 'MM/DD/YYYY'
          }
          disabled={selectedRange.toString() !== 'custom'}
          onChange={(val) => {
            setSelectedDates(val)
          }}
        />
      )}
      <div className={styles.footer}>
        <Button
          type="ghost"
          onClick={() => {
            setSelectedRange(filterRange)
            setSelectedDates(filterDate)
            setOpenDateModel(false)
          }}
        >
          {t('dashboard.filter.cancel.button', {
            fallbackLng: 'en',
          })}
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 16 }}
          onClick={onDateFilterApply}
        >
          {t('dashboard.filter.apply.button', {
            fallbackLng: 'en',
          })}
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <Layout active={'dashboard'}>
        <CommonHeader
          title={
            !loading
              ? user?.me?.admin
                ? dashboardMode === 0
                  ? t('dashboard.business.dashboard', {
                      fallbackLng: 'en',
                    })
                  : t('dashboard.personal.dashboard', {
                      fallbackLng: 'en',
                    })
                : t('dashboard.personal.dashboard', {
                    fallbackLng: 'en',
                  })
              : ''
          }
        ></CommonHeader>
        <div className={styles.dashboardWrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.userBlock}>
              <Avatar
                size="large"
                src={
                  dashboardMode === 0
                    ? user?.me?.companies?.length > 0
                      ? cdnURL + user?.me?.companies[0]?.logo
                      : ''
                    : cdnURL + user?.me?.imageUrl
                }
                isLoading={loading}
              />
              <div className={styles.detailBlock}>
                {!loading ? (
                  <>
                    <div className={styles.topTitle}>
                      <div className={styles.title}>
                        {dashboardMode === 1
                          ? `${user?.me?.fullName}`
                          : location.label}
                      </div>{' '}
                      {dashboardMode === 1 ? null : !isMobile ? (
                        <Dropdown
                          overlay={customMenu}
                          placement="bottomCenter"
                          onVisibleChange={(val) => setOpenUserList(val)}
                        >
                          <div
                            className={styles.downIcon}
                            onClick={() => setOpenUserList(!openUserList)}
                          >
                            {!openUserList ? <DownOutlined /> : <UpOutlined />}
                          </div>
                        </Dropdown>
                      ) : (
                        <div className={styles.downIcon} onClick={showDrawer}>
                          {!visible ? <DownOutlined /> : <UpOutlined />}
                        </div>
                      )}
                    </div>
                    {user?.me?.admin ? (
                      <div
                        className={styles.topDescription}
                        onClick={handleDashboardMode}
                      >
                        {dashboardMode === 0
                          ? t('dashboard.business.dashboard', {
                              fallbackLng: 'en',
                            })
                          : t('dashboard.personal.dashboard', {
                              fallbackLng: 'en',
                            })}
                      </div>
                    ) : (
                      <div className={styles.topDescription}>
                        {t('dashboard.personal.dashboard', {
                          fallbackLng: 'en',
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Skeleton.Input active className={styles.titleSkeleton} />
                )}
              </div>
            </div>
            <div className={styles.userRight}>
              {!loading ? (
                <Dropdown
                  overlay={dateFilter}
                  placement="bottomRight"
                  trigger={['click']}
                  visible={openDateModel}
                >
                  <Button
                    icon={<CalendarOutlined />}
                    onClick={handleDateFilter}
                  >
                    {filterRange === 'custom'
                      ? `${Intl.DateTimeFormat('en').format(
                          new Date(`${filterDate[0]}`)
                        )} - ${Intl.DateTimeFormat('en').format(
                          new Date(`${filterDate[1]}`)
                        )}`
                      : `${filterRange.replace('-', ' ')}`}
                  </Button>
                </Dropdown>
              ) : (
                <Skeleton.Input active className={styles.titleSkeleton} />
              )}
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <TopBoard
              appointment={appointment}
              onlineAppointment={onlineAppointment}
              sales={sales}
              totalBooking={totalBooking}
              totalOnlineBooking={totalOnlineBooking}
              totalSalesCount={totalSalesCount}
              filterRange={
                filterRange === 'custom'
                  ? `${Intl.DateTimeFormat('en').format(
                      new Date(`${filterDate[0]}`)
                    )} - ${Intl.DateTimeFormat('en').format(
                      new Date(`${filterDate[1]}`)
                    )}`
                  : filterRange === 'All records'
                  ? 'All records'
                  : previousRange
              }
              newClientCount={
                financeDetails?.getFinanceDetails?.otherSalesDetails
                  ?.newClientCount
              }
              avgBill={
                financeDetails?.getFinanceDetails?.otherSalesDetails?.avgBiller
              }
              revPerHour={
                financeDetails?.getFinanceDetails?.otherSalesDetails?.RevPerhour
              }
              loading={loading}
            />
            <Charts
              location={location}
              dashboardMode={user?.me?.admin ? dashboardMode : 0}
              BookingData={
                bookingDetails?.getBookingChartDetail?.bookingsByStatus
              }
              salesData={
                financeDetails?.getFinanceDetails?.allSales
                  ?.salesByProductCategoryType
              }
              totalBooking={totalBooking}
              totalOnlineBooking={totalOnlineBooking}
              totalSalesCount={totalSalesCount}
              productDetails={
                financeDetails?.getFinanceDetails?.retailSales
                  ?.retailSalesDetails
              }
              serviceDetails={
                financeDetails?.getFinanceDetails?.serviceSales
                  ?.serviceSalesDetails
              }
              loading={loading}
            />
          </div>
        </div>
      </Layout>
      <div>
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onClose}
          visible={isMobile ? visible : false}
          className={styles.mobileDrawer}
          height={350}
        >
          <div className={styles.headerStick} />
          <div className={styles.headerTitle}>
            {t('dashboard.choose.location', {
              fallbackLng: 'en',
            })}
          </div>
          <Menu className={styles.customMenuDropdown}>
            {userListData?.map((menu) => {
              return (
                <Menu.Item
                  key={menu.key}
                  onClick={() => handleSelectMenu(menu.label)}
                >
                  <div
                    className={
                      menu.select === true ? styles.select : styles.menu
                    }
                  >
                    <div className={styles.menuIcon}>
                      {menu.select === true && <CheckOutlined />}
                    </div>
                    {menu.label}
                  </div>
                </Menu.Item>
              )
            })}
          </Menu>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col xs={12}>
              <Button
                style={{ width: '100%' }}
                onClick={() => setVisible(false)}
              >
                {t('dashboard.filter.cancel.button', {
                  fallbackLng: 'en',
                })}
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setVisible(false)
                }}
              >
                {t('dashboard.filter.apply.button', {
                  fallbackLng: 'en',
                })}
              </Button>
            </Col>
          </Row>
        </Drawer>
      </div>
    </div>
  )
}

export default Index
