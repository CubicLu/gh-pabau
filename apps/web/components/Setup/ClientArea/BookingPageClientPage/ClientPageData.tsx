import {
  CalendarOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

export const trends = [
  {
    id: 1,
    icon: <CalendarOutlined />,
    title: 'Online Bookings',
    total: '1',
    increasing: true,
    percentage: 100,
  },
  {
    id: 2,
    icon: <MedicineBoxOutlined />,
    title: 'Cross Sells (Service)',
    total: '£ 498.00',
    increasing: false,
    percentage: 100,
  },
  {
    id: 3,
    icon: <ShoppingCartOutlined />,
    title: 'Cross Sells (Retail)',
    total: '£ 498.00',
    increasing: true,
    percentage: 100,
  },
  {
    id: 4,
    icon: <ClockCircleOutlined />,
    title: 'Out of hours bookings ',
    total: '1',
    increasing: true,
    percentage: 100,
  },
  {
    id: 5,
    icon: <LineChartOutlined />,
    title: 'Out of hours revenue',
    total: '£ 498.00',
    increasing: true,
    percentage: 100,
  },
]

export const tips = [
  {
    id: 1,
    title: 'Enable services reviews',
    description:
      'On avarage clients that showed a decrease in dropoffs by 8.3%',
  },
  {
    id: 2,
    title: 'Enable avatars',
    description:
      '92% of patients we asked preferred to see a photo of the person they were booking',
  },
  {
    id: 3,
    title: 'Enable deposits',
    description: 'Enabling deposits reduced no shows by 70%',
  },
  {
    id: 4,
    title: 'Enabling upsells',
    description:
      'On average, having upselling enabled increases the avarage spend per online booking by 32%',
  },
  {
    id: 5,
    title: 'Mobile Powered',
    description:
      '49% of your online bookings come via mobile, we are optimized, are you?',
  },
]
