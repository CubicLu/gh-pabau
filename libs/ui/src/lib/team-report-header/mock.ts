import { TeamReportEmployee, TeamReportMeta } from './TeamReportHeader'
import userImage from '../../assets/images/user.png'

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
  quater: [
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

export const employees: TeamReportEmployee[] = [
  {
    name: 'Will Lawsons',
    src: userImage,
  },
  {
    name: 'User 2',
    src: userImage,
  },
  {
    name: 'User 3',
    src: userImage,
  },
  {
    name: 'User 4',
    src: userImage,
  },
]

export const locations = ['Location 1', 'Location 2']

export const meta: TeamReportMeta = {
  rangeType: 'yearly',
  services: [
    { name: 'Team Commision', chart: 'line', prefix: '£' },
    { name: 'Days Worked', chart: 'line' },
    { name: 'LHR - Front', chart: 'line', prefix: '£' },
    { name: 'Rebook', chart: 'line', suffix: '%' },
  ],
  employees: ['Will Lawsons', 'User 2', 'User 3', 'User 4'],
  year: '2019/2020',
  location: 'All Locations',
}
