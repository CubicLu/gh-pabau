import React, { useState, useEffect, useRef } from 'react'
import {
  AvatarList,
  Button,
  Notification,
  NotificationType,
  Table,
  TabMenu,
  SetupSearchInput,
  RangePicker,
} from '@pabau/ui'
import {
  Divider,
  Dropdown,
  Menu,
  Modal,
  Select,
  Typography,
  Popover,
} from 'antd'
import {
  CalendarOutlined,
  CheckOutlined,
  ExportOutlined,
  FilterOutlined,
  MailOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import Layout from '../../components/Layout/Layout'
import Invoice from '../../components/Account/Invoice'
import Payments from '../../components/Account/Payments'
import Debt from '../../components/Account/Debt'
import CreditNote from '../../components/Account/CreditNote'
import CommonHeader from '../../components/CommonHeader'
import { FilterValueType } from '../../components/Account/TableLayout'
import styles from './accounts.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import dayjs, { Dayjs } from 'dayjs'
import { Formik } from 'formik'
import { useUser } from '../../context/UserContext'
import {
  useFindAllowedLocationQuery,
  useIssuingCompaniesQuery,
  useCreditNoteTypesLazyQuery,
} from '@pabau/graphql'
import stringToCurrencySignConverter from '../../helper/stringToCurrencySignConverter'

interface FilterList {
  id: number
  name: string
}

const WAIT_INTERVAL = 400

export function Account() {
  const [showModal, setShowModal] = useState(false)
  const user = useUser()
  const accountRef = useRef(null)

  const { t } = useTranslationI18()
  const tabMenuItems = [
    t('account.finance.tab.menu.invoices'),
    t('account.finance.tab.menu.payments'),
    t('account.finance.tab.menu.debt'),
    t('account.finance.tab.menu.credit.notes'),
  ]
  const { Title } = Typography
  const { Option } = Select
  const [activeTab, setActiveTab] = useState('0')
  const [showDateFilter, setShowDateFilter] = useState({
    desktop: false,
    mobile: false,
  })
  const [selectedRange, setSelectedRange] = useState<string>(
    t('account.finance.date.range.option.month')
  )
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])
  const [sendDebtReminder, setDebtReminder] = useState(false)
  const [sendNextDebtReminder, setNextDebtReminder] = useState(false)
  const [sendLastDebtReminder, setLastDebtReminder] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filterDate, setFilterDate] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])
  const [isPopOverVisible, setIsPopOverVisible] = useState({
    desktop: false,
    mobile: false,
  })
  const [locationList, setLocationList] = useState<FilterList[]>([])
  const [issuingCompanyList, setIssuingCompanyList] = useState<FilterList[]>([])
  const [creditNoteTypesList, setCreditNoteTypesList] = useState<FilterList[]>(
    []
  )
  const [filterValues, setFilterValues] = useState<FilterValueType>({
    location: 0,
    issuingCompany: 0,
    creditNoteType: '',
  })
  const [filterRange, setFilterRange] = useState<string>('This Month')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: locations } = useFindAllowedLocationQuery()
  const { data: issuingCompanyData } = useIssuingCompaniesQuery()
  const [
    getCreditNote,
    { data: creditNoteTypeData },
  ] = useCreditNoteTypesLazyQuery()

  useEffect(() => {
    if (activeTab === '3') {
      getCreditNote()
    }
  }, [activeTab, getCreditNote])

  useEffect(() => {
    if (locations?.findAllowedLocation) {
      const data = locations.findAllowedLocation.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      setLocationList(data)
    }
  }, [locations])

  useEffect(() => {
    if (issuingCompanyData?.findManyIssuingCompany) {
      const data = issuingCompanyData?.findManyIssuingCompany.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      setIssuingCompanyList(data)
    }
  }, [issuingCompanyData])

  useEffect(() => {
    if (creditNoteTypeData?.findManyCreditNoteType) {
      setCreditNoteTypesList(creditNoteTypeData?.findManyCreditNoteType)
    }
  }, [creditNoteTypeData])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchValue)
    }, WAIT_INTERVAL)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const onDateFilterApply = () => {
    setFilterDate([...selectedDates])
    setFilterRange(selectedRange)
    setShowDateFilter({ desktop: false, mobile: false })
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
        <Option value="All records">
          {t('account.finance.date.range.option.all')}
        </Option>
        <Option value="Today">
          {t('account.finance.date.range.option.today')}
        </Option>
        <Option value="Yesterday">
          {t('account.finance.date.range.option.yesterday')}
        </Option>
        <Option value="This Week">
          {t('account.finance.date.range.option.week')}
        </Option>
        <Option value="Last Week">
          {t('account.finance.date.range.option.lastWeek')}
        </Option>
        <Option value="This Month">
          {t('account.finance.date.range.option.month')}
        </Option>
        <Option value="Last Month">
          {t('account.finance.date.range.option.lastMonth')}
        </Option>
        <Option value="This Year">
          {t('account.finance.date.range.option.year')}
        </Option>
        <Option value="Last Year">
          {t('account.finance.date.range.option.lastYear')}
        </Option>
        <Option value="custom">
          {t('account.finance.date.range.option.custom')}
        </Option>
      </Select>
      {selectedRange !== 'All records' && (
        <RangePicker
          className={styles.rangePicker}
          value={selectedDates}
          disabledDate={(current) => {
            return current > dayjs().endOf('day')
          }}
          disabled={selectedRange.toString() !== 'custom'}
          onChange={(val, dateStrings) =>
            setSelectedDates([dayjs(dateStrings[0]), dayjs(dateStrings[1])])
          }
        />
      )}
      <div className={styles.footer}>
        <Button
          type="ghost"
          onClick={() => setShowDateFilter({ desktop: false, mobile: false })}
        >
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
  const renderOptions = (
    list,
    defaultValue: string | number = 0,
    key = 'id'
  ) => (
    <>
      <Select.Option key={'all'} value={defaultValue}>
        <span style={{ marginLeft: 8 }}>{'ALL'}</span>
      </Select.Option>
      {list.map((item) => (
        <Select.Option key={item.id} value={item[key]}>
          <span style={{ marginLeft: 8 }}>{item.name}</span>
        </Select.Option>
      ))}
    </>
  )

  const renderFilter = () => (
    <Formik
      enableReinitialize={true}
      initialValues={{
        location: 0,
        issuingCompany: 0,
        creditNoteType: '',
      }}
      onSubmit={(value) => {
        if (activeTab !== '3') {
          value.creditNoteType = ''
        }
        setFilterValues(value)
        setIsPopOverVisible({ desktop: false, mobile: false })
      }}
    >
      {({ setFieldValue, handleReset, values, handleSubmit }) => (
        <div className={styles.filterBox}>
          <p>{t('account.finance.filter.location')}</p>
          <Select
            showArrow
            style={{ width: '100%' }}
            value={values.location}
            onChange={(value) => {
              setFieldValue('location', value)
            }}
          >
            {renderOptions(locationList)}
          </Select>
          <p>{t('account.finance.filter.issuing.company')}</p>
          <Select
            showArrow
            style={{ width: '100%' }}
            value={values.issuingCompany}
            onChange={(value) => {
              setFieldValue('issuingCompany', value)
            }}
          >
            {renderOptions(issuingCompanyList)}
          </Select>
          {activeTab === '3' && (
            <>
              <p>{t('account.finance.filter.credit.note')}</p>
              <Select
                showArrow
                style={{ width: '100%' }}
                value={values.creditNoteType}
                onChange={(value) => {
                  setFieldValue('creditNoteType', value)
                }}
              >
                {renderOptions(creditNoteTypesList, '', 'name')}
              </Select>
            </>
          )}
          <div className={styles.footerWrapper}>
            <Button onClick={handleReset} className={styles.clearBtn}>
              {t('setup.locations.clearall')}
            </Button>
            <Button
              type={'primary'}
              className={styles.btn}
              onClick={() => handleSubmit()}
            >
              {t('setup.locations.applyfilters')}
            </Button>
          </div>
        </div>
      )}
    </Formik>
  )
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
  const searchPlaceHoler = {
    '0': t('account.finance.search.placeholder.invoice'),
    '1': t('account.finance.search.placeholder.payment'),
    '2': t('account.finance.search.placeholder.invoice'),
    '3': t('account.finance.search.placeholder.credit.note'),
  }

  return (
    <div ref={accountRef}>
      <Layout active={'account'} {...user}>
        <CommonHeader
          isShowSearch
          searchInputPlaceHolder={searchPlaceHoler[activeTab]}
          handleSearch={(value) => setSearchValue(value)}
          title={t('account.finance.title')}
          searchValue={searchValue}
        >
          <Dropdown
            overlay={dateRange}
            placement="bottomRight"
            trigger={['click']}
            visible={showDateFilter.mobile}
            onVisibleChange={(val) =>
              setShowDateFilter({ desktop: false, mobile: val })
            }
          >
            <CalendarOutlined className={styles.marketingIconStyle} />
          </Dropdown>

          <Popover
            trigger="click"
            content={renderFilter}
            placement="bottomRight"
            overlayClassName={styles.filterPopOver}
            visible={isPopOverVisible.mobile}
            onVisibleChange={(visible) =>
              setIsPopOverVisible({ desktop: false, mobile: visible })
            }
          >
            <FilterOutlined className={styles.marketingIconStyle} />
          </Popover>
        </CommonHeader>
        <div
          className={classNames(styles.desktopHeader, styles.mobileViewNone)}
        >
          <div style={{ marginTop: '17px' }}>
            <Title>{t('account.finance.title')}</Title>
          </div>
          <div className={styles.searchInputText}>
            <div
              className={classNames(
                styles.searchInput,
                activeTab === '1' && styles.paymentSearch
              )}
            >
              <SetupSearchInput
                placeholder={searchPlaceHoler[activeTab]}
                onChange={(item) => {
                  setSearchValue(item)
                }}
                searchValue={searchValue}
              />
            </div>
            <Dropdown
              key="desktop-dropdown"
              overlay={dateRange}
              placement="bottomRight"
              trigger={['click']}
              visible={showDateFilter.desktop}
              onVisibleChange={(val) =>
                setShowDateFilter({ desktop: val, mobile: false })
              }
            >
              <Button type="ghost">
                <CalendarOutlined />{' '}
                {selectedRange === 'custom'
                  ? `${Intl.DateTimeFormat('en').format(
                      new Date(`${selectedDates[0]}`)
                    )} - ${Intl.DateTimeFormat('en').format(
                      new Date(`${selectedDates[1]}`)
                    )}`
                  : `${selectedRange.replace('-', ' ')}`}
              </Button>
            </Dropdown>
            {false && (
              <Dropdown overlay={manageOptions} placement="bottomLeft">
                <Button type="ghost">
                  {t('account.finance.manage.options')}
                </Button>
              </Dropdown>
            )}
            {false && (
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
            <Popover
              trigger="click"
              content={renderFilter}
              placement="bottomRight"
              overlayClassName={styles.filterPopOver}
              visible={isPopOverVisible.desktop}
              onVisibleChange={(visible) =>
                setIsPopOverVisible({ desktop: visible, mobile: false })
              }
            >
              <Button type="ghost">
                <FilterOutlined />
                {t('account.finance.filter')}
              </Button>
            </Popover>
          </div>
        </div>

        <Divider style={{ margin: 0 }} />
        <div className={styles.tabWrapper}>
          <TabMenu
            tabPosition="top"
            menuItems={tabMenuItems}
            tabBarStyle={{ backgroundColor: '#FFF' }}
            onTabClick={(activeKey) => setActiveTab(activeKey)}
          >
            <Invoice
              searchTerm={searchTerm}
              selectedDates={filterDate}
              filterValue={filterValues}
              selectedRange={filterRange}
              accountRef={accountRef}
              companyCurrency={stringToCurrencySignConverter(user.me?.currency)}
            />
            <Payments
              searchTerm={searchTerm}
              selectedDates={filterDate}
              filterValue={filterValues}
              selectedRange={filterRange}
              accountRef={accountRef}
              companyCurrency={stringToCurrencySignConverter(user.me?.currency)}
            />
            <Debt
              searchTerm={searchTerm}
              selectedDates={filterDate}
              filterValue={filterValues}
              selectedRange={filterRange}
              accountRef={accountRef}
              companyCurrency={stringToCurrencySignConverter(user.me?.currency)}
            />
            <CreditNote
              searchTerm={searchTerm}
              selectedDates={filterDate}
              filterValue={filterValues}
              selectedRange={filterRange}
              accountRef={accountRef}
              companyCurrency={stringToCurrencySignConverter(user.me?.currency)}
            />
          </TabMenu>
        </div>
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
    </div>
  )
}

export default Account
