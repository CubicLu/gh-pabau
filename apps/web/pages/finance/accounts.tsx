import React, { useState } from 'react'
import { Layout, Button, TabMenu, MobileHeader } from '@pabau/ui'
import {
  Dropdown,
  Typography,
  Input,
  Menu,
  Select,
  DatePicker,
  Divider,
} from 'antd'
import {
  CalendarOutlined,
  FilterOutlined,
  LeftOutlined,
  SearchOutlined,
  ExportOutlined,
  MailOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import moment, { Moment } from 'moment'
import Invoice from '../../components/Account/Invoice'
import Payments from '../../components/Account/Payments'
import Debt from '../../components/Account/Debt'
import CreditNote from '../../components/Account/CreditNote'
import styles from './accounts.module.less'
import Link from 'next/link'

const tabMenuItems = ['Invoices', 'Payments', 'Debt', 'Credit Notes']

export function Account() {
  const { Title } = Typography
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [activeTab, setActiveTab] = useState('0')
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [selectedRange, setSelectedRange] = useState('90-days')
  const [selectedDates, setSelectedDates] = useState<[Moment, Moment]>([
    moment(),
    moment().subtract(90, 'days'),
  ])

  const onDateFilterApply = () => {
    setShowDateFilter(false)
  }

  const onDataRangeSelect = (value) => {
    setSelectedRange(value)
    if (value === '90-days') {
      setSelectedDates([moment().subtract(90, 'days'), moment()])
    } else if (value === '30-days') {
      setSelectedDates([moment().subtract(30, 'days'), moment()])
    } else if (value === '6-months') {
      setSelectedDates([moment().subtract(30, 'days'), moment()])
    } else if (value === '1-year') {
      setSelectedDates([moment().subtract(30, 'days'), moment()])
    }
  }

  const manageOptions = (
    <Menu>
      <Menu.Item key="1" icon={<ExportOutlined />}>
        Export to CVS
      </Menu.Item>
    </Menu>
  )

  const dateRange = (
    <div className={styles.dateFilterContainer}>
      <Select
        style={{ width: '100%' }}
        defaultValue={selectedRange}
        onChange={onDataRangeSelect}
      >
        <Option value="30-days">Last 30 days</Option>
        <Option value="90-days">Last 90 days</Option>
        <Option value="6-months">Last 6 months</Option>
        <Option value="1-year">Last 1 year</Option>
        <Option value="custom">Custom</Option>
      </Select>
      <RangePicker
        className={styles.rangePicker}
        value={selectedDates}
        disabled={selectedRange !== 'custom'}
        onChange={(val) => setSelectedDates(val)}
      />
      <div className={styles.footer}>
        <Button type="ghost" onClick={() => setShowDateFilter(false)}>
          Cancel
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 16 }}
          onClick={onDateFilterApply}
        >
          Apply
        </Button>
      </div>
    </div>
  )

  return (
    <React.Fragment>
      <MobileHeader
        className={classNames(
          styles.desktopViewNone,
          styles.mobileHeaderContainer
        )}
      >
        <div className={styles.mobileHeader}>
          <Link href="/">
            <LeftOutlined className={styles.leftOutlined} />
          </Link>
          <Title level={5} className={styles.title}>
            Accounts
          </Title>
        </div>
      </MobileHeader>
      <Layout active={'account'}>
        <div
          className={classNames(styles.desktopHeader, styles.mobileViewNone)}
        >
          <div style={{ marginTop: '17px' }}>
            <Title>Accounts</Title>
          </div>
          <div className={styles.searchInputText}>
            <Input
              placeholder="Search by Invoice or clients"
              prefix={<SearchOutlined />}
              className={styles.searchInput}
            />
            <Dropdown
              overlay={dateRange}
              placement="bottomLeft"
              trigger={['click']}
              visible={showDateFilter}
              onVisibleChange={(val) => setShowDateFilter(val)}
            >
              <Button type="ghost">
                <CalendarOutlined />{' '}
                {selectedRange === 'custom'
                  ? `${Intl.DateTimeFormat('en').format(
                      new Date(`${selectedDates[0]}`)
                    )} - ${Intl.DateTimeFormat('en').format(
                      new Date(`${selectedDates[1]}`)
                    )}`
                  : `Last ${selectedRange.replace('-', ' ')}`}
              </Button>
            </Dropdown>
            <Dropdown overlay={manageOptions} placement="bottomLeft">
              <Button type="ghost">Manage Options</Button>
            </Dropdown>
            {activeTab === '2' && (
              <Button type="primary" style={{ color: 'white' }}>
                <MailOutlined /> Send Reminders
                <span className={styles.reminderText2}>2</span>
              </Button>
            )}
            <Button type="ghost">
              <FilterOutlined />
              Filter
            </Button>
          </div>
        </div>
        <Divider style={{ margin: 0 }} />
        <TabMenu
          tabPosition="top"
          menuItems={tabMenuItems}
          tabBarStyle={{ backgroundColor: '#FFF' }}
          onTabClick={(activeKey) => setActiveTab(activeKey)}
        >
          <Invoice />
          <Payments />
          <Debt />
          <CreditNote />
        </TabMenu>
      </Layout>
    </React.Fragment>
  )
}

export default Account
