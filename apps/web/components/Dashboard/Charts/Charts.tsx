import React, { FC } from 'react'
import { Row, Col, Table } from 'antd'
import * as Highcharts from 'highcharts'
import { CustomHighChart } from '@pabau/ui'
import styles from './Charts.module.less'
import { columns, data } from '../../../pages/dashboard/mock'

export const Charts: FC = () => {
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
          fillColor: '#65CD98',
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
