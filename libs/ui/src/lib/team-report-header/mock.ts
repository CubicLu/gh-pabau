import userImage from '../../assets/images/user.png'
import {
  TeamReportEmployee,
  TeamReportMeta,
  TeamReportLocation,
} from './TeamReportHeader'

export const dateOptions = [
  { label: 'Sep 2019', endDate: new Date(2019, 8, 1) },
]

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

export const locations: TeamReportLocation[] = [
  { id: 1, name: 'Location 1' },
  { id: 2, name: 'Location 2' },
]

export const meta: TeamReportMeta = {
  rangeType: 'yearly',
  services: [
    { name: 'Team Commision', chart: 'line', prefix: '£' },
    { name: 'Days Worked', chart: 'line' },
    { name: 'LHR - Front', chart: 'line', prefix: '£' },
    { name: 'Rebook', chart: 'line', suffix: '%' },
  ],
  employees: ['Will Lawsons', 'User 2', 'User 3', 'User 4'],
  locations: [],
}
