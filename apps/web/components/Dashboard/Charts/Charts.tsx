import React, { FC } from 'react'
import { Row, Col, Table } from 'antd'
import * as Highcharts from 'highcharts'
import { CustomHighChart } from '@pabau/ui'
import { ICount } from '../TopBoard/TopBoard'
import styles from './Charts.module.less'
import { columns } from '../../../mocks/Dashboard'

interface ILocation {
  key: string
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
  data: IData[]
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
}) => {
  const List = []
  if (salesData && salesData.length > 0) {
    salesData.map((item) => {
      List.push({
        type: 'line',
        name: item.status,
        allowPointSelect: true,
        data: item.data?.map((item) => item.value),
        marker: {
          lineWidth: 2,
          fillColor: 'white',
          lineColor: '#54B2D3',
          symbol: 'circle',
        },
      })
      return item
    })
  } else {
    const details = ['Services', 'Products', 'Packages', 'Gift Vouchers']
    details.map((item) => {
      List.push({
        name: item,
        allowPointSelect: true,
        data: [0, 0, 0, 0],
        type: 'line',
        marker: {
          lineColor: '#54B2D3',
          color: '#54B2D3',
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
    series: List,
    legend: {
      itemMarginTop: 15,
      itemStyle: {
        color: '#3D3D46',
        fontWeight: 'normal',
        fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
      },
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
          ? [...new Set(salesData[0]?.data?.map((item) => item.label))]
          : [],
    },
  }
  const dataList = []
  if (BookingData && BookingData.length > 0) {
    BookingData.map((item) => {
      dataList.push({
        name: item.status,
        allowPointSelect: true,
        data: item.data?.map((item) => item.value),
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
    const details = ['Completed', 'Waiting', 'Canceled', 'No Show', 'Deposits']
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
          ? [...new Set(BookingData[0]?.data?.map((item) => item.label))]
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
              <div className={styles.chartsHeader}>{totalSalesCount.count}</div>
              <div className={styles.chartsSubHeader}>Recent sales</div>
              <div className={styles.chartsExtraHeader}>
                {location.label}, {location.date}
              </div>
              <CustomHighChart options={optionLine} />
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.charts}>
            <div className={styles.chartsWrap}>
              <div className={styles.chartsHeader}>
                {totalBooking.count + totalOnlineBooking.count} booked
              </div>
              <div className={styles.chartsSubHeader}>Recent Appointments</div>
              <div className={styles.chartsExtraHeader}>
                {location.label}, {location.date}
              </div>
              <CustomHighChart options={option1} />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.chartsTable}>
            <Table
              columns={columns}
              dataSource={productDetails}
              title={() => 'Products'}
              pagination={false}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.chartsTable}>
            <Table
              columns={columns}
              dataSource={serviceDetails}
              title={() => 'Services'}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}
