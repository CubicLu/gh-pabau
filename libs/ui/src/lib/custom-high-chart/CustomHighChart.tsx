import './CustomHighChart.module.less'
import React, { FC } from 'react'
import HighchartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts'

/* eslint-disable-next-line */
export interface CustomHighChartProps {
  options: Highcharts.Options
}

export const CustomHighChart: FC<CustomHighChartProps> = ({ options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default CustomHighChart
