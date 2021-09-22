import React, { FC } from 'react'
import { Row, Col, Table } from 'antd'
import * as Highcharts from 'highcharts'
import { CustomHighChart } from '@pabau/ui'
import styles from './Charts.module.less'
import { columns, data } from '../../../mocks/Dashboard'

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

interface IBookingDetails {
  status?: string
  data: IData[]
}

interface ICharts {
  location: ILocation
  dashboardMode: number
  Data: IBookingDetails[]
}

export const Charts: FC<ICharts> = ({ location, dashboardMode, Data }) => {
  const optionLine: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
      align: 'left',
    },
    series: [
      {
        type: 'line',
        name: 'Pencilled-in',
        data: [380, 0, 0, 0, 45, 0, 0, 0],
        marker: {
          lineWidth: 2,
          fillColor: 'white',
          lineColor: '#54B2D3',
          symbol: 'circle',
        },
      },
      {
        type: 'line',
        name: 'Packages',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        marker: {
          lineWidth: 2,
          fillColor: 'white',
          lineColor: 'green',
          symbol: 'circle',
        },
      },
      {
        type: 'line',
        name: 'Services',
        data: [],
        marker: {
          lineWidth: 2,
          fillColor: 'white',
          lineColor: '#FAAD14',
          symbol: 'circle',
        },
      },
      {
        type: 'line',
        name: 'Products',
        data: [],
        marker: {
          lineWidth: 2,
          fillColor: 'white',
          lineColor: '#6383F1',
          symbol: 'circle',
        },
      },
    ],
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
      categories: [
        'Sat 16',
        'Sun 17',
        'Mon 18',
        'Tue 19',
        'Wed 20',
        'Thu 21',
        'Fri 22',
        'Sat 23',
      ],
    },
  }
  const dataList = []
  if (Data) {
    Data.map((item) => {
      dataList.push({
        name: item.status,
        allowPointSelect: true,
        data: [...new Set(item.data?.map((item) => item.value))],
        type: 'column',
        marker: {
          lineColor: '#54B2D3',
          color: '#54B2D3',
        },
        pointWidth: 5,
      })
      return dataList
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
        Data?.length > 0
          ? [...new Set(Data[0].data?.map((item) => item.label))]
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
              <div className={styles.chartsHeader}>£0</div>
              <div className={styles.chartsSubHeader}>Recent sales</div>
              <div className={styles.chartsExtraHeader}>
                {dashboardMode === 1
                  ? `${location.label},` + location.date
                  : 'all locations, last 7 days'}
              </div>
              <CustomHighChart options={optionLine} />
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.charts}>
            <div className={styles.chartsWrap}>
              <div className={styles.chartsHeader}>5 booked</div>
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
              dataSource={data}
              title={() => 'Products'}
              pagination={false}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.chartsTable}>
            <Table
              columns={columns}
              dataSource={data}
              title={() => 'Services'}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}
