import React, { useState } from 'react'
import {
  AvatarList,
  Button,
  Notification,
  NotificationType,
  Table,
  TabMenu,
} from '@pabau/ui'
import {
  DatePicker,
  Divider,
  Dropdown,
  Input,
  Menu,
  Modal,
  Select,
  Typography,
} from 'antd'
import {
  CalendarOutlined,
  CheckOutlined,
  ExportOutlined,
  FilterOutlined,
  MailOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import moment, { Moment } from 'moment'
import Layout from '../../components/Layout/Layout'
import Invoice from '../../components/Account/Invoice'
import Payments from '../../components/Account/Payments'
import Debt from '../../components/Account/Debt'
import CreditNote from '../../components/Account/CreditNote'
import styles from './accounts.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CommonHeader from '../../components/CommonHeader'

export function Account() {
  const [showModal, setShowModal] = useState(false)

  const { t } = useTranslationI18()
  const tabMenuItems = [
    t('account.finance.tab.menu.invoices'),
    t('account.finance.tab.menu.payments'),
    t('account.finance.tab.menu.debt'),
    t('account.finance.tab.menu.credit.notes'),
  ]
  const { Title } = Typography
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [activeTab, setActiveTab] = useState('0')
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [selectedRange, setSelectedRange] = useState(
    t('account.finance.date.90days')
  )
  const [selectedDates, setSelectedDates] = useState<[Moment, Moment]>([
    moment(),
    moment().subtract(90, 'days'),
  ])
  const [sendDebtReminder, setDebtReminder] = useState(false)
  const [sendNextDebtReminder, setNextDebtReminder] = useState(false)
  const [sendLastDebtReminder, setLastDebtReminder] = useState(false)

  const onDateFilterApply = () => {
    setShowDateFilter(false)
  }

  const onDataRangeSelect = (value) => {
    setSelectedRange(value)
    switch (value) {
      case '90-days': {
        setSelectedDates([moment().subtract(90, 'days'), moment()])

        break
      }
      case '30-days': {
        setSelectedDates([moment().subtract(30, 'days'), moment()])

        break
      }
      case '6-months': {
        setSelectedDates([moment().subtract(30, 'days'), moment()])

        break
      }
      case '1-year': {
        setSelectedDates([moment().subtract(30, 'days'), moment()])

        break
      }
      // No default
    }
  }

  const manageOptions = (
    <Menu>
      <Menu.Item key="1" icon={<ExportOutlined />}>
        {t('account.finance.export.csv')}
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
        <Option value="30-days">
          {t('account.finance.date.range.option.30days')}
        </Option>
        <Option value="90-days">
          {t('account.finance.date.range.option.90days')}
        </Option>
        <Option value="6-months">
          {t('account.finance.date.range.option.6month')}
        </Option>
        <Option value="1-year">
          {t('account.finance.date.range.option.year')}
        </Option>
        <Option value="custom">
          {t('account.finance.date.range.option.custom')}
        </Option>
      </Select>
      <RangePicker
        className={styles.rangePicker}
        value={selectedDates}
        disabled={selectedRange.toString() !== 'custom'}
        onChange={(val) => setSelectedDates(val)}
      />
      <div className={styles.footer}>
        <Button type="ghost" onClick={() => setShowDateFilter(false)}>
          {t('account.finance.date.range.btn.cancel')}
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 16 }}
          onClick={onDateFilterApply}
        >
          {t('account.finance.date.range.btn.apply')}
        </Button>
      </div>
    </div>
  )
  const avatarList = (
    <AvatarList
      size="default"
      users={[
        {
          avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
          id: 1,
          name: 'Dominic Nguyen',
        },
        {
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
          id: 2,
          name: 'Tom Coleman',
        },
        {
          avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
          id: 3,
          name: 'Zoltan Olah',
        },
        {
          avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
          id: 4,
          name: 'Tim Hingston',
        },
      ]}
    />
  )
  const actionSendBtn = (
    <>
      <CheckOutlined /> {t('account.finance.debt.send.reminder.sended.btn')}
    </>
  )
  const actionSendedBtn = (
    <>
      <MailOutlined /> {t('account.finance.debt.send.reminder.send.btn')}
    </>
  )
  const actionHandler = (actionProps, actionSetProps) => {
    return (
      <Button
        className={styles.reminderBtn}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          actionSetProps(!actionProps)
          !actionProps &&
            Notification(
              NotificationType.success,
              t('account.finance.debt.send.notification')
            )
        }}
        style={
          actionProps && {
            color: '#65cd98',
            border: '1px solid #65cd98',
          }
        }
      >
        {actionProps ? actionSendBtn : actionSendedBtn}
      </Button>
    )
  }
  const columns = [
    {
      title: t('account.finance.debt.send.reminder.title.days'),
      dataIndex: 'Days',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('account.finance.debt.send.reminder.title.clients'),
      dataIndex: 'Clients',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('account.finance.debt.send.reminder.title.actions'),
      dataIndex: 'Actions',
      className: 'drag-visible',
      visible: true,
    },
  ]
  const data = [
    {
      Days: t('account.finance.debt.send.reminder.days.first'),
      Clients: avatarList,
      Actions: actionHandler(sendDebtReminder, setDebtReminder),
    },
    {
      Days: t('account.finance.debt.send.reminder.days.secound'),
      Clients: avatarList,
      Actions: actionHandler(sendNextDebtReminder, setNextDebtReminder),
    },
    {
      Days: t('account.finance.debt.send.reminder.days.last'),
      Clients: avatarList,
      Actions: actionHandler(sendLastDebtReminder, setLastDebtReminder),
    },
  ]

  return (
    <React.Fragment>
      <CommonHeader />
      <Layout active={'account'}>
        <div
          className={classNames(styles.desktopHeader, styles.mobileViewNone)}
        >
          <div style={{ marginTop: '17px' }}>
            <Title>{t('account.finance.title')}</Title>
          </div>
          <div className={styles.searchInputText}>
            <Input
              placeholder={t('account.finance.search.placeholder')}
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
                {selectedRange.toString() === 'custom'
                  ? `${Intl.DateTimeFormat('en').format(
                      new Date(`${selectedDates[0]}`)
                    )} - ${Intl.DateTimeFormat('en').format(
                      new Date(`${selectedDates[1]}`)
                    )}`
                  : `${t(
                      'account.finance.last'
                    )} ${selectedRange.toString().replace('-', ' ')}`}
              </Button>
            </Dropdown>
            <Dropdown overlay={manageOptions} placement="bottomLeft">
              <Button type="ghost">
                {t('account.finance.manage.options')}
              </Button>
            </Dropdown>
            {activeTab === '2' && (
              <Button
                type="primary"
                style={{ color: 'white' }}
                onClick={() => {
                  setShowModal(true)
                }}
              >
                <MailOutlined /> {t('account.finance.send.reminders')}
                <span className={styles.reminderText2}>
                  {t('account.finance.send.reminders.count')}
                </span>
              </Button>
            )}
            <Button type="ghost">
              <FilterOutlined />
              {t('account.finance.filter')}
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
        <Modal
          title={t('account.finance.send.reminder.modal.title')}
          visible={showModal}
          onCancel={() => {
            setShowModal(false)
          }}
          footer={false}
          width={680}
          bodyStyle={{ paddingTop: '0px' }}
          centered={true}
        >
          <Table
            columns={columns}
            dataSource={data as never[]}
            bordered={false}
          />
        </Modal>
      </Layout>
    </React.Fragment>
  )
}

export default Account
