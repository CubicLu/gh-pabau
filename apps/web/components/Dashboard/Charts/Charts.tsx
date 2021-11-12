import React, { FC } from 'react'
import { Row, Col, Table, Skeleton } from 'antd'
import * as Highcharts from 'highcharts'
import { CustomHighChart } from '@pabau/ui'
import { ICount } from '../TopBoard/TopBoard'
import styles from './Charts.module.less'
import { columns } from '../../../mocks/Dashboard'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { useUser } from '../../../context/UserContext'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

interface ILocation {
  key: number
  label: string
  date?: string
  select: boolean
}

interface IData {
  label: string
  value: 0
}

interface IChartDetails {
  status?: string
  chartDataSet: IData[]
}

interface ITableColumns {
  name: string
  per: string
  units: number
  value: number
}

interface ICharts {
  location: ILocation
  dashboardMode: number
  BookingData: IChartDetails[]
  salesData: IChartDetails[]
  totalBooking: ICount
  totalOnlineBooking: ICount
  totalSalesCount: ICount
  productDetails: ITableColumns[]
  serviceDetails: ITableColumns[]
  loading: boolean
}

export const Charts: FC<ICharts> = ({
  location,
  BookingData,
  salesData,
  totalBooking,
  totalOnlineBooking,
  totalSalesCount,
  productDetails,
  serviceDetails,
  loading,
}) => {
  const { t } = useTranslationI18()
  const user = useUser()
  const List = []
  if (salesData && salesData.length > 0) {
    salesData.map((item) => {
      List.push({
        type: 'line',
        name: item.status,
        allowPointSelect: true,
        data: item.chartDataSet?.map((item) => item.value),
        marker: {
          lineWidth: 2,
          fillColor: 'white',
          lineColor: '',
          symbol: 'circle',
        },
      })
      return item
    })
  } else {
    const details = [
      t('dashboard.chart.service.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.chart.product.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.chart.package.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.chart.gift.label', {
        fallbackLng: 'en',
      }),
    ]
    details.map((item) => {
      List.push({
        name: item,
        allowPointSelect: true,
        data: [(0, 0, 0, 0)],
        type: 'line',
        marker: {
          lineColor: '',
          color: '',
        },
      })
      return item
    })
  }

  const optionLine: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
      align: 'left',
    },
    tooltip: {
      valuePrefix: `${stringToCurrencySignConverter(user.me?.currency)}`,
    },
    series: List,
    legend: {
      itemMarginTop: 15,
      itemStyle: {
        color: '#3D3D46',
        fontWeight: 'normal',
        fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
        textTransform: 'capitalize',
      },
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: '',
        },
        labels: {
          formatter: function (value) {
            return `${
              stringToCurrencySignConverter(user.me?.currency) +
              value.value.toLocaleString()
            }`
          },
          style: {
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: '18px',
            fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
            color: '#9292A3',
          },
        },
      },
    ],
    xAxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 'normal',
          lineHeight: '18px',
          fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
          color: '#9292A3',
        },
      },
      categories:
        salesData && salesData.length > 0
          ? [...new Set(salesData[0]?.chartDataSet?.map((item) => item.label))]
          : [],
    },
  }
  const dataList = []
  if (BookingData && BookingData.length > 0) {
    BookingData.map((item) => {
      dataList.push({
        name: item.status,
        allowPointSelect: true,
        data: item.chartDataSet?.map((item) => item.value),
        type: 'column',
        marker: {
          lineColor: '#54B2D3',
          color: '#54B2D3',
        },
        pointWidth: 15,
      })
      return item
    })
  } else {
    const details = [
      t('dashboard.complete.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.waiting.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.cancel.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.no.show.label', {
        fallbackLng: 'en',
      }),
      t('dashboard.deposits.label', {
        fallbackLng: 'en',
      }),
    ]
    details.map((item) => {
      dataList.push({
        name: item,
        allowPointSelect: true,
        data: [0, 0, 0, 0, 0],
        type: 'column',
        marker: {
          lineColor: '#54B2D3',
          color: '#54B2D3',
        },
        pointWidth: 15,
      })
      return item
    })
  }

  const option1: Highcharts.Options = {
    title: {
      text: '',
    },
    series: dataList,
    legend: {
      symbolHeight: 8,
      symbolWidth: 24,
      symbolRadius: 6,
      squareSymbol: false,
      align: 'center',
      itemMarginTop: 15,
      itemStyle: {
        color: '#3D3D46',
        fontWeight: 'normal',
        fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
        textTransform: 'capitalize',
      },
    },
    xAxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 'normal',
          lineHeight: '18px',
          fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
          color: '#9292A3',
        },
      },
      categories:
        BookingData && BookingData.length > 0
          ? [
              ...new Set(
                BookingData[0]?.chartDataSet?.map((item) => item.label)
              ),
            ]
          : [],
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: '',
        },
        labels: {
          style: {
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: '18px',
            fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
            color: '#9292A3',
          },
        },
      },
    ],
  }
  return (
    <div>
      <Row className={styles.chartsWrap} gutter={16}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.charts}>
            <div className={styles.chartsWrap}>
              <div className={styles.chartsHeader}>
                {!loading ? (
                  stringToCurrencySignConverter(user.me?.currency) +
                  (totalSalesCount.count ?? 0).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                ) : (
                  <Skeleton.Input active className={styles.titleSkeleton} />
                )}
              </div>
              <div className={styles.chartsSubHeader}>
                {!loading ? (
                  t('dashboard.recent.sales', {
                    fallbackLng: 'en',
                  })
                ) : (
                  <Skeleton.Input active className={styles.countSkeleton} />
                )}
              </div>
              <div className={styles.chartsExtraHeader}>
                {!loading ? (
                  location.label +
                  `${location.date ? `${',' + location.date}` : ''}`
                ) : (
                  <Skeleton.Input active className={styles.countSkeleton} />
                )}
              </div>
              {!loading ? (
                <CustomHighChart options={optionLine} />
              ) : (
                <Skeleton.Input active className={styles.chartSkeleton} />
              )}
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.charts}>
            <div className={styles.chartsWrap}>
              <div className={styles.chartsHeader}>
                {!loading ? (
                  `${
                    (totalBooking.count ?? 0) + (totalOnlineBooking.count ?? 0)
                  } ${t('dashboard.booked.label', {
                    fallbackLng: 'en',
                  })}`
                ) : (
                  <Skeleton.Input active className={styles.titleSkeleton} />
                )}
              </div>
              <div className={styles.chartsSubHeader}>
                {!loading ? (
                  t('dashboard.recent.appointments.label', {
                    fallbackLng: 'en',
                  })
                ) : (
                  <Skeleton.Input active className={styles.countSkeleton} />
                )}
              </div>
              <div className={styles.chartsExtraHeader}>
                {!loading ? (
                  location.label +
                  `${location.date ? `${',' + location.date}` : ''}`
                ) : (
                  <Skeleton.Input active className={styles.countSkeleton} />
                )}
              </div>
              {!loading ? (
                <CustomHighChart options={option1} />
              ) : (
                <Skeleton.Input active className={styles.chartSkeleton} />
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.chartsTable}>
            {!loading ? (
              <Table
                columns={columns}
                dataSource={productDetails?.map((d) => {
                  return {
                    ...d,
                    value:
                      stringToCurrencySignConverter(user.me?.currency) +
                      d.value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }),
                  }
                })}
                title={() =>
                  t('dashboard.product.table.label', {
                    fallbackLng: 'en',
                  })
                }
                scroll={{ y: 580 }}
                pagination={false}
              />
            ) : (
              <Table
                rowKey="key"
                pagination={false}
                dataSource={[...Array.from({ length: 8 })].map((_, index) => ({
                  key: `key${index}`,
                }))}
                columns={[...Array.from({ length: 4 })].map((column, index) => {
                  return {
                    render: function renderPlaceholder() {
                      return (
                        <Skeleton
                          key={index}
                          title
                          active={true}
                          paragraph={false}
                          className={styles.tableSkeleton}
                        />
                      )
                    },
                  }
                })}
              />
            )}
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.chartsTable}>
            {!loading ? (
              <Table
                columns={columns}
                dataSource={serviceDetails?.map((d) => {
                  return {
                    ...d,
                    value:
                      stringToCurrencySignConverter(user.me?.currency) +
                      d.value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }),
                  }
                })}
                title={() =>
                  t('dashboard.service.table.label', {
                    fallbackLng: 'en',
                  })
                }
                scroll={{ y: 580 }}
                pagination={false}
              />
            ) : (
              <Table
                rowKey="key"
                pagination={false}
                dataSource={[...Array.from({ length: 8 })].map((_, index) => ({
                  key: `key${index}`,
                }))}
                columns={[...Array.from({ length: 4 })].map((column, index) => {
                  return {
                    render: function renderPlaceholder() {
                      return (
                        <Skeleton
                          key={index}
                          title
                          active={true}
                          paragraph={false}
                          className={styles.tableSkeleton}
                        />
                      )
                    },
                  }
                })}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
