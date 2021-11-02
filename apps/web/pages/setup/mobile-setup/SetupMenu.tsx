import React from 'react'
import {
  NotificationOutlined,
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  LineChartOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  PayCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

export interface SetupMenuItem {
  menuName: string
  icon?: JSX.Element
  path?: string
  children?: SetupMenuItem[]
  displayBadge?: boolean
}

export const setupMenuTranslation = {
  dashboard: 'setup.menu.dashborad',
  team: 'setup.menu.team',
  staffmanager: 'setup.menu.staffmanager',
  schedule: 'setup.menu.schedule',
  leads: 'setup.menu.leads',
  reports: 'setup.menu.reports',
  stock: 'setup.menu.stock',
  products: 'setup.menu.stock.products',
  inventorycount: 'setup.menu.stock.inventory',
  purchaseorder: 'setup.menu.stock.purchase',
  suppliers: 'setup.menu.stock.suppliers',
  marketing: 'setup.menu.marketing',
  broadcasts: 'setup.menu.marketing.broadcasts',
  reviews: 'setup.menu.marketing.reviews',
  giftvouchers: 'setup.menu.marketing.gift',
  referraltracker: 'setup.menu.marketing.referral',
  loyalty: 'setup.menu.marketing.loyalty',
  money: 'setup.menu.money',
  activities: 'setup.menu.activities',
  services: 'setup.menu.services',
  onlinebooking: 'setup.menu.booking',
  paymentprocessing: 'setup.menu.payment',
  medicalforms: 'setup.menu.medical.forms',
  contactsupport: 'setup.menu.contact',
  helpcenter: 'setup.menu.help',
}

export const setupMenu: SetupMenuItem[] = [
  {
    menuName: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
  },
  {
    menuName: 'Team',
    icon: <TeamOutlined />,
    children: [
      {
        menuName: 'Staff Manager',
        path: '/team/users',
      },
      {
        menuName: 'Schedule',
        path: '/team/schedule',
      },
    ],
  },
  {
    menuName: 'Leads',
    icon: <RiseOutlined />,
    path: '/leads',
  },
  {
    menuName: 'Reports',
    icon: <LineChartOutlined />,
    path: '/reports',
  },
  {
    menuName: 'Stock',
    icon: <ShoppingCartOutlined />,
    children: [
      {
        menuName: 'Products',
        path: '/products/list',
      },
      {
        menuName: 'Inventory count',
        path: '/products/inventory-count',
      },
      {
        menuName: 'Purchase order',
        path: '/products/purchase-order',
      },
      {
        menuName: 'Suppliers',
        path: '/products/suppliers',
      },
    ],
  },
  {
    menuName: 'Marketing',
    icon: <NotificationOutlined />,
    children: [
      {
        menuName: 'Broadcasts',
        path: '/marketing/campaigns',
      },
      {
        menuName: 'Reviews',
        path: '/marketing/reviews',
      },
      {
        menuName: 'Gift Vouchers',
        path: '/marketing/vouchers',
      },
      {
        menuName: 'Referral tracker',
        path: '/marketing/referral',
      },
      {
        menuName: 'Loyalty',
        path: '/marketing/loyalty',
      },
    ],
  },
  {
    menuName: 'Money',
    icon: <WalletOutlined />,
    path: '/finance/accounts',
  },
  {
    menuName: 'Activities',
    icon: <ProjectOutlined />,
    path: '/activities',
    displayBadge: true,
  },
]

export const SetupMiddleMenu: SetupMenuItem[] = [
  {
    menuName: 'Services',
    icon: <ToolOutlined />,
    path: '/setup/services',
  },
  {
    menuName: 'Products',
    icon: <ShoppingOutlined />,
    path: '/products/list',
  },
  {
    menuName: 'Online Booking',
    icon: <CalendarOutlined />,
    path: '/setup/online-booking',
  },
  {
    menuName: 'Payment Processing',
    icon: <PayCircleOutlined />,
    path: '/setup/payment-processing',
  },
  {
    menuName: 'Medical Forms',
    icon: <FileTextOutlined />,
    path: '/setup/medical-forms',
  },
]

export const SetupBottomMenu: SetupMenuItem[] = [
  {
    menuName: 'Contact Support',
    path: '',
  },
  {
    menuName: 'Help Center',
    path: '',
  },
]
