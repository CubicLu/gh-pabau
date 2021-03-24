import React, { FC } from 'react'

import styles from './TeamReportChart.module.less'
import { Table, TeamReportHeader, TeamReportHeaderProps } from '@pabau/ui'

import HichartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts'
import HighchartsMap from 'highcharts/modules/map'
import HighchartsStock from 'highcharts/modules/stock'

if (typeof Highcharts === 'object') {
  HighchartsMap(Highcharts)
  HighchartsStock(Highcharts)
}

export interface TeamReportChartSeries {
  title: string
  serviceName: string
  data: number[]
  formatter?: (value: number) => string
  color?: string
  target?: number
}

export type TeamReportChartProps = TeamReportHeaderProps & {
  ticks: string[]
  series: TeamReportChartSeries[]
}

export const TeamReportChart: FC<TeamReportChartProps> = ({
  ticks,
  series,
  serviceGroups,
  employees,
  years,
  locations,
  meta,
  onChangeMeta,
}) => {
  const yAxis = series
    .map((item) => {
      const service = meta.services.find(
        (meta) => meta.name === item.serviceName
      )
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
      const service = meta.services.find(
        (meta) => meta.name === item.serviceName
      )
      return yAxis.findIndex(
        (axis) =>
          axis.format === `${service?.prefix || ''}:${service?.suffix || ''}`
      )
    }),
    ...series
      .filter((item) => typeof item.target === 'number')
      .map((item) => {
        const service = meta.services.find(
          (meta) => meta.name === item.serviceName
        )
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
          return `${this.value < 0 ? '- ' : ''}${item?.prefix || ''}${Math.abs(
            this.value
          )}${item?.suffix || ''}`
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
          meta.services.find((service) => service.name === item.serviceName)
            ?.chart || 'line',
        name: item.title,
        data: item.data.slice(0, ticks.length),
        yAxis: yAxisIndex[index],
        color: item.color,
      })),
      ...series
        .map((item, index) => ({
          type: 'line',
          name: `Target of ${item.title}`,
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
        return `${this.series.name}: <b>${this.y < 0 ? '- ' : ''}${
          serie?.prefix || ''
        }${Math.abs(this.y)}${serie?.suffix || ''}</b>`
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
      title: 'Date',
      visible: true,
      children: [
        {
          title: '',
          dataIndex: 'date',
        },
      ],
    },
    ...series.reduce((pre, serie, index) => {
      const showTarget = meta.services.find((item) => item.showTarget)
      const service = meta.services.find(
        (meta) => meta.name === serie.serviceName
      )

      const result = [
        ...pre,
        {
          title: serie.title,
          visible: true,
          children: [
            {
              dataIndex: serie.title,
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
                      return `${value < 0 ? '- ' : ''}${
                        service?.prefix || ''
                      }${Math.abs(value)}${service?.suffix || ''}`
                    },
                  }
                : {
                    children: [
                      {
                        dataIndex: serie.title,
                        align: 'right',
                        width: `${50 / (series.length + 1)}%`,
                        title: <div className={styles.actual}>Actual</div>,
                        render: (value) => {
                          return `${value < 0 ? '- ' : ''}${
                            service?.prefix || ''
                          }${Math.abs(value)}${service?.suffix || ''}`
                        },
                      },
                      ...(service?.showTarget
                        ? [
                            {
                              dataIndex: serie.title,
                              align: 'right',
                              width: `${50 / (series.length + 1)}%`,
                              title: (
                                <div className={styles.target}>Target</div>
                              ),
                              render: (value) => {
                                return `${value < 0 ? '- ' : ''}${
                                  service?.prefix || ''
                                }${Math.abs(serie.target ?? 0)}${
                                  service?.suffix || ''
                                }`
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
    series.map((serie) => (data[serie.title] = serie.data[index]))
    return data
  })

  return (
    <div className={styles.teamReportChartWrapper}>
      <div className={styles.teamReportChartHeader}>
        <TeamReportHeader
          serviceGroups={serviceGroups}
          employees={employees}
          years={years}
          locations={locations}
          meta={meta}
          onChangeMeta={onChangeMeta}
        />
      </div>

      <HichartsReact options={config} highcharts={Highcharts} />

      <div className={styles.teamReportTable}>
        <Table columns={tableColumns} dataSource={tableData as never[]} />
      </div>
    </div>
  )
}

export default TeamReportChart
