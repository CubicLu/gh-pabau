import React, { FC } from 'react'
import Highcharts from 'highcharts'
import highchartsHeatmap from 'highcharts/modules/heatmap'
import HighchartsReact from 'highcharts-react-official'
import { useTranslation } from 'react-i18next'

const DiscountTimeChart: FC = () => {
  const { t } = useTranslation('common')
  highchartsHeatmap(Highcharts)
  const getPointCategoryName = (point, dimension) => {
    const series = point.series,
      isY = dimension === 'y',
      axis = series[isY ? 'yAxis' : 'xAxis']
    return axis.categories[point[isY ? 'y' : 'x']]
  }
  const options = {
    title: {
      text: t(
        'setup.services.servicestab.createmodal.onlinebooking.promotion.discountcharttitle'
      ),
      align: 'left',
      style: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#3D3D46',
      },
    },
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1,
    },
    xAxis: {
      categories: [
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
      ],
    },
    yAxis: {
      categories: [
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Mon'
        ),
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Tue'
        ),
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Wed'
        ),
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Thu'
        ),
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Fri'
        ),
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Sat'
        ),
        t(
          'setup.services.servicestab.createmodal.onlinebooking.timingrules.Sun'
        ),
      ],
      title: null,
      reversed: true,
    },
    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          const ix = point.index + 1,
            xName = getPointCategoryName(point, 'x'),
            yName = getPointCategoryName(point, 'y'),
            val = point.value
          return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.'
        },
      },
    },
    colorAxis: {
      min: 0,
      max: 2,
      minColor: '#65CD98',
      maxColor: '#CCE8F2',
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280,
    },
    tooltip: {
      formatter: function () {
        return (
          '<b>' +
          getPointCategoryName(this.point, 'x') +
          '%</b> discount, <br><b>' +
          this.point.value +
          '</b> timeslots on <br><b>' +
          getPointCategoryName(this.point, 'y') +
          '</b>'
        )
      },
    },
    series: [
      {
        name: 'discount per day',
        borderWidth: 0.2,
        color: '#FFFFFF',
        data: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 1],
          [0, 4, 0],
          [0, 5, 2],
          [0, 6, 0],
          [1, 0, 4],
          [1, 1, 1],
          [1, 2, 1],
          [1, 3, 1],
          [1, 4, 6],
          [1, 5, 0],
          [1, 6, 2],
          [2, 0, 6],
          [2, 1, 5],
          [2, 2, 7],
          [2, 3, 6],
          [2, 4, 10],
          [2, 5, 0],
          [2, 6, 0],
          [3, 0, 15],
          [3, 1, 13],
          [3, 2, 5],
          [3, 3, 6],
          [3, 4, 5],
          [3, 5, 0],
          [3, 6, 0],
          [4, 0, 10],
          [4, 1, 19],
          [4, 2, 9],
          [4, 3, 7],
          [4, 4, 4],
          [4, 5, 2],
          [4, 6, 2],
          [5, 0, 5],
          [5, 1, 8],
          [5, 2, 5],
          [5, 3, 6],
          [5, 4, 11],
          [5, 5, 4],
          [5, 6, 2],
          [6, 0, 5],
          [6, 1, 6],
          [6, 2, 7],
          [6, 3, 1],
          [6, 4, 3],
          [6, 5, 1],
          [6, 6, 0],
          [7, 0, 4],
          [7, 1, 4],
          [7, 2, 4],
          [7, 3, 15],
          [7, 4, 6],
          [7, 5, 1],
          [7, 6, 1],
          [8, 0, 8],
          [8, 1, 6],
          [8, 2, 7],
          [8, 3, 2],
          [8, 4, 12],
          [8, 5, 1],
          [8, 6, 1],
          [9, 0, 6],
          [9, 1, 3],
          [9, 2, 4],
          [9, 3, 3],
          [9, 4, 9],
          [9, 5, 0],
          [9, 6, 3],
          [10, 0, 0],
          [10, 1, 3],
          [10, 2, 3],
          [10, 3, 2],
          [10, 4, 3],
          [10, 5, 0],
          [10, 6, 0],
          [11, 0, 0],
          [11, 1, 4],
          [11, 2, 1],
          [11, 3, 1],
          [11, 4, 4],
          [11, 5, 0],
          [11, 6, 1],
          [12, 0, 2],
          [12, 1, 1],
          [12, 2, 0],
          [12, 3, 1],
          [12, 4, 1],
          [12, 5, 0],
          [12, 6, 2],
          [13, 0, 0],
          [13, 1, 0],
          [13, 2, 0],
          [13, 3, 0],
          [13, 4, 1],
          [13, 5, 0],
          [13, 6, 0],
          [14, 0, 1],
          [14, 1, 0],
          [14, 2, 0],
          [14, 3, 0],
          [14, 4, 0],
          [14, 5, 0],
          [14, 6, 0],
        ],
        dataLabels: {
          enabled: true,
          color: '#000000',
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            title: {
              style: {
                fontSize: '14px',
                transform: 'translateY(-10px)',
              },
            },
            yAxis: {
              labels: {
                formatter: function () {
                  return this.value.charAt(0)
                },
              },
            },
          },
        },
      ],
    },
  }
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  )
}

export default DiscountTimeChart
