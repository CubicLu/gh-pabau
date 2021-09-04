import React from 'react'
import {
  NotificationOutlined,
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  FundOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  ProfileOutlined,
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
  targets: 'sidebar.team.targets',
  schedule: 'sidebar.team.schedule',
  hiring: 'sidebar.team.hiring',
  commissions: 'sidebar.team.commissions',
  leads: 'sidebar.leads',
  reports: 'sidebar.reports',
  stock: 'sidebar.stock',
  products: 'sidebar.stock.products',
  inventorycount: 'sidebar.stock.inventorycount',
  purchaseorder: 'sidebar.stock.purchaseorder',
  suppliers: 'sidebar.stock.suppliers',
  marketing: 'sidebar.marketing',
  campaigns: 'sidebar.marketing.campaigns',
  reviews: 'sidebar.marketing.reivews',
  giftvouchers: 'sidebar.marketing.giftvouchers',
  referraltracker: 'sidebar.marketing.referraltracker',
  loyalty: 'sidebar.marketing.loyalty',
  financials: 'sidebar.marketing.fanancials',
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
        menuName: 'Targets',
        path: '/team/targets',
      },
      {
        menuName: 'Schedule',
        path: '/team/schedule',
      },
      {
        menuName: 'Hiring',
        path: '/team/hiring',
      },
      {
        menuName: 'Commissions',
        path: '/team/commissions',
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
        menuName: 'Campaigns',
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
    menuName: 'Financials',
    icon: <WalletOutlined />,
    children: [
      {
        menuName: 'Accounts',
        path: '/finance/accounts',
      },
      {
        menuName: 'Cashup',
        path: '/finance/cashup',
      },
    ],
  },
  {
    menuName: 'Contacts',
    icon: <ProfileOutlined />,
    children: [
      {
        menuName: 'Clients',
        path: '/clients',
      },
      {
        menuName: 'Case manager',
        path: '/clients/cases',
      },
    ],
  },
  {
    menuName: 'Activities',
    icon: <ActivityIcon className={styles.activityIcon} />,
    path: '/activities',
    displayBadge: true,
  },
]
