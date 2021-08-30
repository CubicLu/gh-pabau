import { Table, TeamReportMeta, serviceItemFormatter } from '@pabau/ui'
import { Space, Skeleton, Empty } from 'antd'
import * as Highcharts from 'highcharts'
import HichartsReact from 'highcharts-react-official'
import HighchartsMap from 'highcharts/modules/map'
import HighchartsStock from 'highcharts/modules/stock'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useMedia } from 'react-use'
import styles from './TeamReportChart.module.less'

if (typeof Highcharts === 'object') {
  HighchartsMap(Highcharts)
  HighchartsStock(Highcharts)
}

export interface TeamReportChartSeries {
  name: string
  label: string
  data: number[]
  formatter?: (value: number) => string
  color?: string
  target?: number
}

export type TeamReportChartProps = {
  ticks: string[]
  series: TeamReportChartSeries[]
  loading?: boolean
  meta: TeamReportMeta
  error?: boolean
}

export const TeamReportChart: FC<TeamReportChartProps> = ({
  ticks,
  series,
  meta,
  loading,
  error,
}) => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const { t } = useTranslation('common')

  const yAxis = series
    .map((item) => {
      const service = meta.services.find((meta) => meta.name === item.name)
      return {
        ...service,
        format: `${service?.prefix || ''}:${service?.suffix || ''}`,
      }
    })
    .filter(
      (item, index, arr) =>
        arr.findIndex((service) => service.format === item.format) === index
    )

  const yAxisIndex = [
    ...series.map((item) => {
      const service = meta.services.find((meta) => meta.name === item.name)
      return yAxis.findIndex(
        (axis) =>
          axis.format === `${service?.prefix || ''}:${service?.suffix || ''}`
      )
    }),
    ...series
      .filter((item) => typeof item.target === 'number')
      .map((item) => {
        const service = meta.services.find((meta) => meta.name === item.name)
        return yAxis.findIndex(
          (axis) =>
            axis.format === `${service?.prefix || ''}:${service?.suffix || ''}`
        )
      }),
  ]

  const config = {
    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: true,
    },
    navigator: { enabled: false },
    chart: {
      className: styles.teamReportChart,
      width: isMobile ? 800 : undefined,
      style: {
        fontFamily: 'Circular-Std-Book, -apple-system, sans-serif',
      },
    },
    title: { text: undefined },
    legend: { enabled: false },
    xAxis: [
      {
        crosshair: true,
        categories: ticks,
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
    yAxis: yAxis.map((item, index) => ({
      labels: {
        formatter: function () {
          return serviceItemFormatter(this.value, item?.prefix, item?.suffix)
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
      opposite: index > 0 ? true : undefined,
    })),
    series: [
      ...series.slice(0, 5).map((item, index) => ({
        type:
          meta.services.find((service) => service.name === item.name)?.chart ||
          'line',
        name: item.label ? t(item.label) : item.name,
        data: item.data.slice(0, ticks.length),
        yAxis: yAxisIndex[index],
        color: item.color,
      })),
      ...series
        .map((item, index) => ({
          type: 'line',
          name: `Target of ${item.label ? t(item.label) : item.name}`,
          data: item.data.slice(0, ticks.length).map(() => item.target),
          yAxis: yAxisIndex[index],
          color: `${item.color}C0`,
          dashStyle: 'Dash',
          target: item.target,
        }))
        .filter((item) => typeof item.target === 'number'),
    ],
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
          radius: 3,
        },
      },
    },
    tooltip: {
      formatter: function () {
        const serie = yAxis[yAxisIndex[this.series.index]]
        return `${this.series.name}: <b>${serviceItemFormatter(
          this.y,
          serie?.prefix,
          serie?.suffix
        )}</b>`
      },
    },
  }

  const miniChartConfig = (index) => ({
    ...config,
    chart: {
      className: styles.teamReportMiniChart,
      height: 60,
      // width: 300,
    },
    tooltip: { enabled: false },
    credits: { enabled: false },
    mapNavigation: { enabled: false },
    yAxis: [
      {
        height: 0,
        width: 0,
        gridLineWidth: 0,
        labels: { enabled: false },
        title: { enabled: false },
      },
    ],
    xAxis: [
      {
        lineWidth: 0,
        tickLength: 0,
        labels: {
          enabled: false,
        },
      },
    ],
    series: [
      {
        lineWidth: 0,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
        data: series[index].data.slice(0, ticks.length),
        color: series[index].color,
      },
    ],
    navigator: {
      enabled: true,
      handles: { enabled: false },
      height: 40,
      margin: 0,
      series: {
        type: 'scatter',
      },
      xAxis: {
        crosshair: true,
        lineWidth: 0,
        tickLength: 0,
        labels: {
          enabled: false,
        },
      },
    },
  })

  const tableColumns = [
    {
      dataIndex: 'date',
      title: 'Date',
      visible: true,
      children: isMobile
        ? undefined
        : [
            {
              title: '',
              dataIndex: 'date',
            },
          ],
    },
    ...series.reduce((pre, serie, index) => {
      const showTarget = meta.services.find((item) => item.showTarget)
      const service = meta.services.find((meta) => meta.name === serie.name)

      const result = [
        ...pre,
        {
          dataIndex: serie.name,
          title: serie.label ? t(serie.label) : serie.name,
          visible: true,
          children: isMobile
            ? undefined
            : [
                {
                  dataIndex: serie.name,
                  align: 'right',
                  width: `${100 / (series.length + 1)}%`,
                  title: (
                    <HichartsReact
                      options={miniChartConfig(index)}
                      highcharts={Highcharts}
                    />
                  ),
                  ...(!showTarget
                    ? {
                        render: (value) => {
                          return serviceItemFormatter(
                            value,
                            service?.prefix,
                            service?.suffix
                          )
                        },
                      }
                    : {
                        children: [
                          {
                            dataIndex: serie.name,
                            align: 'right',
                            width: `${50 / (series.length + 1)}%`,
                            title: <div className={styles.actual}>Actual</div>,
                            render: (value) => {
                              return serviceItemFormatter(
                                value,
                                service?.prefix,
                                service?.suffix
                              )
                            },
                          },
                          ...(service?.showTarget
                            ? [
                                {
                                  dataIndex: serie.name,
                                  align: 'right',
                                  width: `${50 / (series.length + 1)}%`,
                                  title: (
                                    <div className={styles.target}>Target</div>
                                  ),
                                  render: (value) => {
                                    return serviceItemFormatter(
                                      value,
                                      service?.prefix,
                                      service?.suffix
                                    )
                                  },
                                },
                              ]
                            : []),
                        ],
                      }),
                },
              ],
        },
      ]
      return result
    }, []),
  ]

  const tableData = ticks.map((tick, index) => {
    const data = { date: tick }
    series.map((serie) => (data[serie.name] = serie.data[index]))
    return data
  })

  return (
    <div className={styles.teamReportChartWrapper}>
      <ScrollContainer horizontal className={styles.chartContainer}>
        {loading ? (
          <Skeleton.Input className={styles.chartLoader} active />
        ) : (
          !error && <HichartsReact options={config} highcharts={Highcharts} />
        )}
      </ScrollContainer>

      {isMobile && (
        <Space size={16} direction="vertical" className={styles.miniChartList}>
          {loading
            ? [0, 1, 2].map((index) => (
                <div className={styles.miniChartItem} key={index}>
                  <Skeleton.Input key={index} active />
                </div>
              ))
            : series.map((serie, index) => (
                <div className={styles.miniChartItem} key={index}>
                  <div className={styles.miniChartTitle}>
                    {serie.label ? t(serie.label) : serie.name}
                  </div>
                  <HichartsReact
                    options={miniChartConfig(index)}
                    highcharts={Highcharts}
                  />
                </div>
              ))}
        </Space>
      )}

      <div className={styles.teamReportTable}>
        {loading ? (
          <Space direction="vertical" className={styles.tableLoader}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <Space
                key={index}
                direction="horizontal"
                style={{ width: '100%' }}
              >
                {[0, 1, 2].map((col) => (
                  <Skeleton.Input key={col} active />
                ))}
              </Space>
            ))}
          </Space>
        ) : (
          <Table
            columns={tableColumns || []}
            dataSource={error ? [] : ((tableData || []) as never[])}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    error
                      ? t('setup.reports.table.error')
                      : t('setup.reports.table.empty')
                  }
                />
              ),
            }}
          />
        )}
      </div>
    </div>
  )
}

export default TeamReportChart
