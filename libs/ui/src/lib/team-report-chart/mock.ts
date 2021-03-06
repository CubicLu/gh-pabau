import { TeamReportEmployee, TeamReportMeta } from '@pabau/ui'
import userImage from '../../assets/images/user.png'
import { TeamReportChartSeries } from './TeamReportChart'

export const yearsData = {
  monthly: [
    'Sep 19',
    'Oct 19',
    'Nov 19',
    'Dec 19',
    'Jan 20',
    'Feb 20',
    'Mar 20',
    'Apr 20',
    'May 20',
    'Jun 20',
    'Jul 20',
    'Aug 20',
  ],
  quarter: [
    'Q4 17/18',
    'Q1 18/19',
    'Q2 18/19',
    'Q3 18/19',
    'Q4 18/19',
    'Q1 19/20',
    'Q2 19/20',
    'Q3 19/20',
    'Q4 19/20',
  ],
  yearly: ['2017/2018', '2018/2019', '2019/2020', '2020/2021'],
}

export const ticks = {
  monthly: [
    'Sep 19',
    'Oct 19',
    'Nov 19',
    'Dec 19',
    'Jan 20',
    'Feb 20',
    'Mar 20',
    'Apr 20',
    'May 20',
    'Jun 20',
    'Jul 20',
    'Aug 20',
  ],
  quarter: [
    'Q4 17/18',
    'Q1 18/19',
    'Q2 18/19',
    'Q3 18/19',
    'Q4 18/19',
    'Q1 19/20',
    'Q2 19/20',
    'Q3 19/20',
    'Q4 19/20',
  ],
  yearly: ['2017', '2018', '2019', '2020'],
}

export const employees: TeamReportEmployee[] = [
  {
    id: '1',
    name: 'Will Lawsons',
    src: userImage,
  },
  {
    id: '2',
    name: 'User 2',
    src: userImage,
  },
  {
    id: '3',
    name: 'User 3',
    src: userImage,
  },
  {
    id: '4',
    name: 'User 4',
    src: userImage,
  },
]

export const locations = ['Location 1', 'Location 2']

export const meta: TeamReportMeta = {
  rangeType: 'monthly',
  services: [
    { name: 'Team Commision', chart: 'line', prefix: '£' },
    { name: 'Days Worked', chart: 'line' },
    { name: 'LHR - Front', chart: 'line', prefix: '£' },
    { name: 'Rebook', chart: 'line', suffix: '%' },
  ],
  employees: ['Will Lawsons', 'User 2', 'User 3', 'User 4'],
  locations: [],
}

export const seriesData: TeamReportChartSeries[] = [
  {
    label: 'Team Commision',
    name: 'Team Commision',
    data: [0, 100, 250, 100, 150, 0, 120, 140, 200, 250, 200, 100],
    color: '#54B2D3',
  },
  {
    label: 'Days Worked',
    name: 'Days Worked',
    data: [12, 12, 32, 32, 128, 30.5, 64.5, 34, 0, 92, 92, 128],
    color: '#65CD98',
  },
  {
    label: 'LHR - Front',
    name: 'LHR - Front',
    data: [100, 50, 0, 100, 250, 100, 20, 40, 100, 150, 200, 250],
    color: '#FAAD14',
  },
  {
    label: 'Rebook',
    name: 'Rebook',
    data: [0, 150, 100, 100, 150, 200, 220, 240, 0, -50, 100, 150],
    color: '#7B61E2',
  },
]

export const series: TeamReportChartSeries[] = seriesData.slice(0, 4)
