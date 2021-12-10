export const locationList = [
  {
    key: 0,
    label: 'All Locations',
    select: true,
  },
]
export const columns = [
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
    dataIndex: 'per',
  },
]

export const defaultAppointmentList = [
  { label: 'Completed', count: 0, per: '0.00%' },
  { label: 'Waiting', count: 0, per: '0.00%' },
  { label: 'Canceled', count: 0, per: '0.00%' },
  { label: 'No show', count: 0, per: '0.00%' },
]

export const defaultOnlineAppointmentList = [
  { label: 'Completed', count: 0, per: '0.00%' },
  { label: 'Waiting', count: 0, per: '0.00%' },
  { label: 'Canceled', count: 0, per: '0.00%' },
  { label: 'No show', count: 0, per: '0.00%' },
  { label: 'Deposits', count: 0, per: '0.00%' },
]

export const defaultSalesList = [
  { label: 'Services', count: 0, per: '0.00%' },
  { label: 'Products', count: 0, per: '0.00%' },
  { label: 'Packages', count: 0, per: '0.00%' },
  { label: 'Gift Vouchers', count: 0, per: '0.00%' },
]

export const data = [
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

export const dateRangeList = [
  { value: 'All records', label: 'All records' },
  { value: 'Today', label: 'Today' },
  { value: 'Yesterday', label: 'Yesterday' },
  { value: 'This Week', label: 'This week' },
  { value: 'Last Week', label: 'Last week' },
  { value: 'This Month', label: 'This month' },
  { value: 'Last Month', label: 'Last month' },
  { value: 'This Year', label: 'This year' },
  { value: 'Last Year', label: 'Last year' },
  { value: 'Custom', label: 'Custom' },
]
