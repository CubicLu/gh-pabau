import React from 'react'
import {
  NotificationOutlined,
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  FundOutlined,
  AimOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { ReactComponent as ActivityIcon } from '../../assets/images/activity-icon.svg'
import styles from './Menu.module.less'

export interface SidebarMenuItem {
  menuName: string
  icon?: JSX.Element
  path?: string
  children?: SidebarMenuItem[]
  displayBadge?: boolean
}

export const sidebarTranslations = {
  dashboard: 'sidebar.dashboard',
  calendar: 'sidebar.calendar',
  team: 'sidebar.team',
  staffmanager: 'sidebar.team.staffmanager',
  schedule: 'sidebar.team.schedule',
  leads: 'sidebar.leads',
  reports: 'sidebar.reports',
  stock: 'sidebar.stock',
  products: 'sidebar.stock.products',
  inventorycount: 'sidebar.stock.inventorycount',
  purchaseorder: 'sidebar.stock.purchaseorder',
  suppliers: 'sidebar.stock.suppliers',
  marketing: 'sidebar.marketing',
  broadcasts: 'sidebar.marketing.broadcasts',
  reviews: 'sidebar.marketing.reivews',
  giftvouchers: 'sidebar.marketing.giftvouchers',
  referraltracker: 'sidebar.marketing.referraltracker',
  loyalty: 'sidebar.marketing.loyalty',
  money: 'sidebar.marketing.money',
  accounts: 'sidebar.financials.accounts',
  cashup: 'sidebar.financials.cashup',
  contacts: 'sidebar.contacts',
  clients: 'sidebar.contacts.clients',
  casemanager: 'sidebar.contacts.casemanager',
  menu: 'sidebar.mobile.menu',
  profile: 'sidebar.mobile.profile',
  chat: 'sidebar.mobile.chat',
  notifications: 'sidebar.mobile.notifications',
  activities: 'sidebar.activities',
}

export const sidebarMenu: SidebarMenuItem[] = [
  {
    menuName: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
  },
  {
    menuName: 'Calendar',
    icon: <CalendarOutlined />,
    path: '/calendar',
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
    icon: <AimOutlined />,
    path: '/leads',
  },
  {
    menuName: 'Clients',
    icon: <UserOutlined />,
    path: '/clients',
  },
  {
    menuName: 'Reports',
    icon: <FundOutlined />,
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
    icon: <DollarOutlined />,
    path: '/finance/accounts',
  },
  {
    menuName: 'Activities',
    icon: <ActivityIcon className={styles.activityIcon} />,
    path: '/activities',
    displayBadge: true,
  },
]
