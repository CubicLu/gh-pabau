import React, { useState, useContext } from 'react'
import { Avatar, Button, MobileHeader, RangePicker } from '@pabau/ui'
import Layout from '../../components/Layout/Layout'
import styles from './dashboard.module.less'
import { UserContext } from '../../context/UserContext'
import { useMedia } from 'react-use'
import {
  DownOutlined,
  UpOutlined,
  CheckOutlined,
  CalendarOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import { Menu, Dropdown, Drawer, Col, Row, Typography, Select } from 'antd'
import { TopBoard } from '../../components/Dashboard/TopBoard/TopBoard'
import { Charts } from '../../components/Dashboard/Charts/Charts'
import { locationList, userList } from '../../mocks/Dashboard'

interface ISetUser {
  key: string
  label: string
  select: boolean
}

const { Title } = Typography
const { Option } = Select

export function Index() {
  const isMobile = useMedia('(max-width: 767px)', false)
  const user = useContext(UserContext)

  const [visible, setVisible] = useState(false)
  const [openUserList, setOpenUserList] = useState(false)
  const [openDateModel, setOpenDateModel] = useState(false)
  const [dashboardMode, setDashboardMode] = useState(0)
  const [userListData, setUserListData] = useState<ISetUser[]>(
    dashboardMode === 0 ? locationList : userList
  )
  const [selectedRange, setSelectedRange] = useState<string>('This month')
  const [filterRange, setFilterRange] = useState<string>('This Month')
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])
  const [filterDate, setFilterDate] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])

  const handleSelectMenu = (selectedUser) => {
    const List = [...userListData]
    List.map((item) => {
      if (item.key === selectedUser) {
        item.select = true
      } else {
        item.select = false
      }
      return item
    })
    setUserListData(List)
    setOpenUserList(false)
  }
  const customMenu = (
    <div className={styles.customMenu}>
      <Menu className={styles.customMenuDropdown}>
        {userListData.map((menu) => {
          return (
            <Menu.Item
              key={menu.key}
              onClick={() => handleSelectMenu(menu.key)}
            >
              <div
                className={menu.select === true ? styles.select : styles.menu}
              >
                <div className={styles.menuIcon}>
                  {menu.select === true && <CheckOutlined />}
                </div>
                {menu.label}
              </div>
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
  const onDateFilterApply = () => {
    setFilterDate([...selectedDates])
    setFilterRange(selectedRange)
    setOpenDateModel(false)
  }
  const onDataRangeSelect = (value) => {
    setSelectedRange(value)
    switch (value) {
      case 'Today': {
        setSelectedDates([dayjs(), dayjs()])
        break
      }
      case 'Yesterday': {
        setSelectedDates([
          dayjs().subtract(1, 'day'),
          dayjs().subtract(1, 'day'),
        ])
        break
      }
      case 'This Week': {
        setSelectedDates([dayjs().day(1), dayjs()])
        break
      }
      case 'Last Week': {
        setSelectedDates([
          dayjs().subtract(1, 'weeks').day(1),
          dayjs().subtract(1, 'weeks').day(6),
        ])
        break
      }
      case 'This Month': {
        setSelectedDates([dayjs().startOf('month'), dayjs()])
        break
      }
      case 'Last Month': {
        setSelectedDates([
          dayjs().subtract(1, 'month').startOf('month'),
          dayjs().subtract(1, 'months').endOf('month'),
        ])
        break
      }
      case 'This Year': {
        setSelectedDates([dayjs().startOf('year'), dayjs()])
        break
      }
      case 'Last Year': {
        setSelectedDates([
          dayjs().subtract(1, 'year').startOf('year'),
          dayjs().subtract(1, 'year').endOf('year'),
        ])
        break
      }
    }
  }
  const handleDateFilter = () => {
    setOpenDateModel((openDateModel) => !openDateModel)
  }
  const showDrawer = () => {
    setVisible(true)
    setOpenUserList(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpenUserList(false)
  }
  const handleDashboardMode = () => {
    setDashboardMode(dashboardMode === 1 ? 0 : 1)
  }
  const dateFilter = (
    <div className={styles.dateFilterContainer}>
      <Select
        style={{ width: '100%' }}
        onChange={onDataRangeSelect}
        value={selectedRange}
      >
        <Option value="All records">All records</Option>
        <Option value="Today">Today</Option>
        <Option value="Yesterday">Yesterday</Option>
        <Option value="This Week">This week</Option>
        <Option value="Last Week">Last week</Option>
        <Option value="This Month">This month</Option>
        <Option value="Last Month">Last month</Option>
        <Option value="This Year">This year</Option>
        <Option value="Last Year">Last year</Option>
        <Option value="custom">Custom</Option>
      </Select>
      {selectedRange !== 'All records' && (
        <RangePicker
          className={styles.rangePicker}
          value={selectedDates}
          disabledDate={(current) => {
            return current > dayjs().endOf('day')
          }}
          disabled={selectedRange.toString() !== 'custom'}
          onChange={(val) => setSelectedDates(val)}
        />
      )}
      <div className={styles.footer}>
        <Button
          type="ghost"
          onClick={() => {
            setSelectedRange(filterRange)
            setSelectedDates(filterDate)
            setOpenDateModel(false)
          }}
        >
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
    <div>
      <Layout active={'dashboard'}>
        <MobileHeader className={styles.businessDetailsHeaderMobile}>
          <div className={styles.allContentAlignMobile}>
            <div className={styles.marketingTextStyle}>
              <LeftOutlined />
              <Title>
                {user?.me?.admin === 1
                  ? dashboardMode === 0
                    ? 'Business Dashboard'
                    : 'Personal Dashboard'
                  : 'Personal Dashboard'}
              </Title>
            </div>
          </div>
        </MobileHeader>
        <div className={styles.dashboardWrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.userBlock}>
              <Avatar name="R M" size="large" />
              <div className={styles.detailBlock}>
                <div className={styles.topTitle}>
                  <div className={styles.title}>Pabaucare - London</div>{' '}
                  {!isMobile ? (
                    <Dropdown
                      overlay={customMenu}
                      placement="bottomCenter"
                      onVisibleChange={(val) => setOpenUserList(val)}
                    >
                      <div
                        className={styles.downIcon}
                        onClick={() => setOpenUserList(!openUserList)}
                      >
                        {!openUserList ? <DownOutlined /> : <UpOutlined />}
                      </div>
                    </Dropdown>
                  ) : (
                    <div className={styles.downIcon} onClick={showDrawer}>
                      {!visible ? <DownOutlined /> : <UpOutlined />}
                    </div>
                  )}
                </div>
                {user?.me?.admin === 1 ? (
                  <div
                    className={styles.topDescription}
                    onClick={handleDashboardMode}
                  >
                    {dashboardMode === 0
                      ? 'Business dashboard'
                      : 'Personal dashboard'}
                  </div>
                ) : (
                  <div className={styles.topDescription}>
                    Personal dashboard
                  </div>
                )}
              </div>
            </div>
            <div className={styles.userRight}>
              <Dropdown
                overlay={dateFilter}
                placement="bottomRight"
                trigger={['click']}
                visible={!isMobile ? openDateModel : false}
              >
                <Button icon={<CalendarOutlined />} onClick={handleDateFilter}>
                  {filterRange === 'custom'
                    ? `${Intl.DateTimeFormat('en').format(
                        new Date(`${filterRange[0]}`)
                      )} - ${Intl.DateTimeFormat('en').format(
                        new Date(`${filterRange[1]}`)
                      )}`
                    : `${filterRange.replace('-', ' ')}`}
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <TopBoard />
            <Charts />
          </div>
        </div>
      </Layout>
      <div>
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onClose}
          visible={isMobile ? visible : false}
          className={styles.mobileDrawer}
          height={350}
        >
          <div className={styles.headerStick} />
          <div className={styles.headerTitle}>Choose Location</div>
          <Menu className={styles.customMenuDropdown}>
            {userListData.map((menu) => {
              return (
                <Menu.Item
                  key={menu.key}
                  onClick={() => handleSelectMenu(menu.key)}
                >
                  <div
                    className={
                      menu.select === true ? styles.select : styles.menu
                    }
                  >
                    <div className={styles.menuIcon}>
                      {menu.select === true && <CheckOutlined />}
                    </div>
                    {menu.label}
                  </div>
                </Menu.Item>
              )
            })}
          </Menu>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col xs={12}>
              <Button
                style={{ width: '100%' }}
                onClick={() => setVisible(false)}
              >
                cancel
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setVisible(false)
                }}
              >
                apply
              </Button>
            </Col>
          </Row>
        </Drawer>
      </div>
    </div>
  )
}

export default Index
