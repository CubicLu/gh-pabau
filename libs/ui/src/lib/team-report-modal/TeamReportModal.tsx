import React, { FC, useState } from 'react'
import { BasicModal, TeamReportChartSeries } from '@pabau/ui'
import { Row, Col } from 'antd'

import styles from './TeamReportModal.module.less'

import HichartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts'
import HighchartsMap from 'highcharts/modules/map'
import HighchartsStock from 'highcharts/modules/stock'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import { useMedia } from 'react-use'
import Button from '../button/Button'
import { useTranslation } from 'react-i18next'

if (typeof Highcharts === 'object') {
  HighchartsMap(Highcharts)
  HighchartsStock(Highcharts)
}

const LabelValue = ({
  title,
  value,
  trend,
}: {
  title?: string
  value: string
  trend?: 'up' | 'down'
}) => {
  return (
    <div className={styles.labelWrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.value}>
        {trend &&
          (trend === 'up' ? (
            <CaretUpOutlined className={styles.up} />
          ) : (
            <CaretDownOutlined className={styles.down} />
          ))}
        {value}
      </div>
    </div>
  )
}

const formatValue = (value: number, prefix?: string, suffix?: string) =>
  `${value < 0 ? '- ' : ''}${prefix || ''}${Math.abs(value)}${suffix || ''}`

const getChangedValue = (
  curr: number,
  prev: number,
  prefix?: string,
  suffix?: string
) =>
  `${curr > prev ? '+' : ''}${Math.ceil(
    !prev ? 100 : (100 * (curr - prev)) / prev
  )}% (${curr > prev ? '+ ' : ''}${formatValue(curr - prev, prefix, suffix)})`

export interface TeamReportModalProps {
  employee?: string
  service: string
  description?: string
  ticks: string[]
  series: TeamReportChartSeries
  type?: 'line' | 'column' | 'area'
  prefix?: string
  suffix?: string
  visible?: boolean
  onCancel?: VoidFunction
}

export const TeamReportModal: FC<TeamReportModalProps> = ({
  employee,
  service,
  description,
  ticks,
  series,
  type,
  prefix,
  suffix,
  visible,
  onCancel,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)')
  const [focusedIndex, setFocused] = useState(0)
  const [range, setRange] = useState({ start: 0, end: ticks.length - 1 })

  const count = ticks.length / 2
  const ranges = [0, 1].map((_, i) => ({
    start: Math.ceil(i * count),
    end: Math.ceil((i + 1) * count - 1),
  }))

  const config = {
    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: true,
    },
    navigator: { enabled: false },
    chart: {
      className: styles.teamReportChart,
      style: {
        fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
      },
      height: 200,
    },
    title: { text: undefined },
    legend: { enabled: false },
    xAxis: [
      {
        crosshair: true,
        categories: ticks.slice(range.start, range.end),
        title: { enabled: false },
        gridLineWidth: 1,
        grindLineColor: '#F1F1F1',
        tickPosition: 'inside',
        tickmarkPlacement: 'on',
        labels: {
          style: {
            color: '#9292A3',
            fontSize: '14px',
          },
        },
        events: {
          setExtremes: function (e) {
            const thisChart = this.chart

            for (const chart of Highcharts.charts) {
              if (chart !== thisChart && chart?.xAxis[0].setExtremes) {
                // It is null while updating
                chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                  trigger: 'syncExtremes',
                })
              }
            }
          },
        },
      },
    ],
    yAxis: {
      labels: {
        formatter: function () {
          return formatValue(this.value, prefix, suffix)
        },
        style: {
          color: '#9292A3',
          fontSize: '14px',
        },
      },
      title: { enabled: false },
      gridLineWidth: 1,
      grindLineColor: '#F1F1F1',
      tickPosition: 'inside',
      tickmarkPlacement: 'on',
    },
    series: [
      {
        type: type,
        name: series.title,
        data: series.data.slice(range.start, range.end),
        color: series.color,
      },
      {
        type: 'line',
        name: `Target of ${series.title}`,
        data: series.data
          .slice(range.start, range.end)
          .map(() => series.target),
        color: `${series.color}C0`,
        dashStyle: 'Dash',
        target: series.target,
      },
    ],
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
          radius: 3,
        },
        point: {
          events: {
            mouseOver: function (e: { target: { index: number } }) {
              setFocused(range.start + e.target.index)
            },
          },
        },
      },
    },
    tooltip: {
      formatter: function () {
        return `${this.series.name}: <b>${formatValue(
          this.y,
          prefix,
          suffix
        )}</b>`
      },
    },
  }

  return (
    <BasicModal
      title={
        <Row>
          <Col xs={24} sm={12} md={17}>
            {isMobile ? (
              <div>
                <LeftOutlined
                  onClick={() => onCancel?.()}
                  style={{
                    color: 'var(--light-grey-color)',
                    marginRight: '16px',
                    fontSize: '24px',
                  }}
                />
                {employee}
              </div>
            ) : (
              `${service} (${employee})`
            )}
          </Col>
        </Row>
      }
      visible={visible}
      onCancel={onCancel}
      wrapClassName={styles.modalWrapper}
      width={870}
      footer={false}
      closeIcon={isMobile ? <div /> : undefined}
    >
      <Row gutter={isMobile ? 32 : 40}>
        <Col xs={24} sm={12} md={17} className={styles.leftPane}>
          <div className={styles.service}>{service}</div>
          <div className={styles.description}>{description}</div>
          {isMobile && (
            <div className={styles.ranges}>
              {ranges.map((item) => (
                <Button
                  key={item.start}
                  className={styles.rangeButton}
                  type={item.start === range.start ? 'primary' : undefined}
                  onClick={() => setRange(item)}
                >
                  {ticks[item.start]} - {ticks[item.end]}
                </Button>
              ))}
            </div>
          )}
          <div className={styles.chartWrapper}>
            <HichartsReact options={config} highcharts={Highcharts} />
          </div>
        </Col>
        <Col xs={24} sm={12} md={7} className={styles.rightPane}>
          <div className={styles.rightWrapper}>
            <Row gutter={[20, isMobile ? 20 : 25]}>
              <Col xs={12} sm={24}>
                <LabelValue
                  title={ticks[focusedIndex]}
                  value={formatValue(series.data[focusedIndex], prefix, suffix)}
                />
              </Col>
              {series.target && (
                <Col xs={12} sm={24}>
                  <LabelValue
                    title="Target"
                    value={formatValue(series.target, prefix, suffix)}
                  />
                </Col>
              )}
              {focusedIndex > 1 && (
                <Col xs={12} sm={24}>
                  <LabelValue
                    title={t('team-report-modal-prior-month')}
                    value={getChangedValue(
                      series.data[focusedIndex],
                      series.data[focusedIndex - 1],
                      prefix,
                      suffix
                    )}
                    trend={
                      series.data[focusedIndex] > series.data[focusedIndex - 1]
                        ? 'up'
                        : 'down'
                    }
                  />
                </Col>
              )}
              {focusedIndex > 2 && (
                <Col xs={12} sm={24}>
                  <LabelValue
                    title={`${t('team-report-modal-change-from')} ${ticks[0]}`}
                    value={getChangedValue(
                      series.data[focusedIndex],
                      series.data[0],
                      prefix,
                      suffix
                    )}
                    trend={
                      series.data[focusedIndex] > series.data[0] ? 'up' : 'down'
                    }
                  />
                </Col>
              )}
              <Col xs={12} sm={24}>
                <LabelValue
                  title={t('team-report-modal-rolling-avg')}
                  value={formatValue(
                    Math.ceil(
                      series.data.reduce((prev, cur) => prev + cur, 0) /
                        (series.data.length > 0 ? series.data.length : 1)
                    ),
                    prefix,
                    suffix
                  )}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </BasicModal>
  )
}

export default TeamReportModal
