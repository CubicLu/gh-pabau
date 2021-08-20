import React, { FC } from 'react'
import { Row, Col, Table } from 'antd'
import * as Highcharts from 'highcharts'
import { CustomHighChart } from '@pabau/ui'
import styles from './Charts.module.less'

export const Charts: FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Units',
      dataIndex: 'units',
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
    },
  ]

  const data = [
    {
      key: '1',
      name: 'Spray tan',
      units: 2,
      value: '£41.67',
      percentage: '3%',
    },
    {
      key: '2',
      name: 'Nails',
      units: 51,
      value: '£711.67',
      percentage: '76%',
    },
    {
      key: '3',
      name: 'ESPA Facial',
      units: 2,
      value: '£50.00',
      percentage: '3%',
    },
    {
      key: '4',
      name: 'Ear Percing',
      units: 6,
      value: '£150.00',
      percentage: '9%',
    },
    {
      key: '5',
      name: 'ESPA Massage',
      units: 1,
      value: '£50.00',
      percentage: '1%',
    },
    {
      key: '6',
      name: 'Eye treatments',
      units: 19,
      value: '£285.83',
      percentage: '28%',
    },
    {
      key: '7',
      name: 'Waxing',
      units: 26,
      value: '£394.58',
      percentage: '39%',
    },
    {
      key: '8',
      name: 'Consultations',
      units: 1,
      value: '£0.00',
      percentage: '1%',
    },
    {
      key: '9',
      name: 'Total',
      units: 111,
      value: '£1,792.00',
      percentage: '-',
    },
  ]
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
    yAxis: [
      {
        min: 0,
        title: {
          text: '',
        },
      },
    ],
    xAxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Circular Std',
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

  const option1: Highcharts.Options = {
    title: {
      text: '',
    },
    series: [
      {
        name: 'Pencilled-in',
        allowPointSelect: true,
        data: [],
        type: 'column',
        marker: {
          lineColor: '#54B2D3',
          color: '#54B2D3',
        },
        pointWidth: 20,
      },
      {
        name: 'Confirmed',
        allowPointSelect: true,
        data: [0, 1, 4, 3, 2, 1, 2, 3],
        type: 'column',
        marker: {
          lineColor: '#65CD98',
          color: '#65CD98',
        },
        pointWidth: 20,
      },
      {
        name: 'Completed',
        allowPointSelect: true,
        data: [],
        type: 'column',
        marker: {
          lineColor: '#FAAD14',
          color: '#FAAD14',
        },
        pointWidth: 20,
      },
      {
        name: 'Did-not-show',
        allowPointSelect: true,
        data: [],
        type: 'column',
        marker: {
          lineColor: '#6383F1',
          color: '#6383F1',
        },
        pointWidth: 20,
      },
      {
        name: 'Busy',
        allowPointSelect: true,
        data: [],
        type: 'column',
        marker: {
          lineColor: '#ED72AA',
          color: '#ED72AA',
        },
        pointWidth: 20,
      },
    ],
    xAxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 'normal',
          lineHeight: '18px',
          fontFamily: 'Circular Std',
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
    yAxis: [
      {
        min: 0,
        title: {
          text: '',
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
                All locations, last 7 days
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
                All locations, last 7 days
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
