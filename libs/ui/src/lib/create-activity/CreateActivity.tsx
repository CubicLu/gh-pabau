import React, { FC, useEffect, useState } from 'react'
import styles from './CreateActivity.module.less'
import { Button, BasicModal, Avatar, DatePicker, TimePicker } from '@pabau/ui'
import { Input, Select, Checkbox, Tooltip, Drawer, Spin } from 'antd'
import classNames from 'classnames'
import {
  FontColorsOutlined,
  ClockCircleOutlined,
  BlockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  DollarCircleFilled,
  LeftOutlined,
  MenuOutlined,
  SendOutlined,
  PhoneOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  FileOutlined,
  LinkOutlined,
  AimOutlined,
} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { ReactComponent as UserFilled } from '../../assets/images/activities/user-filled.svg'
import BigCalender from './BigCalender'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import { debounce } from 'lodash'

export interface CreateActivityProps {
  visible?: boolean
  onCancel?: () => void
  events?: EventsData[]
  handleSave?: (data) => void
  isEdit?: boolean
  editData?: EditedData
  leadOptions: OptionProps[]
  clientOptions: OptionProps[]
  userOptions: OptionProps[]
}

interface OptionProps {
  name: string
  value: string
}

interface EditedData {
  subject: string
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs | undefined
  endTime: Dayjs | undefined
  freeBusy: string
  notes: string
  user: string
  lead: string
  client: string
  isDone: boolean
}

interface DataProps {
  subject: string
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs | undefined
  endTime: Dayjs | undefined
  freeBusy: string
  notes: string
}

export interface EventsData {
  id: number
  title: string
  type: string
  start: string
  end: string
}

export const filterTabsObj = {
  call: 'Call',
  meeting: 'Meeting',
  message: 'Message',
  email: 'Email',
}

const { Option } = Select
const { TextArea } = Input

export const CreateActivity: FC<CreateActivityProps> = ({
  visible,
  onCancel,
  events,
  handleSave,
  isEdit = false,
  editData,
  leadOptions = [],
  clientOptions = [],
  userOptions = [],
}) => {
  const { t } = useTranslation('common')
  const [filterTabValue, setFilterTabValue] = useState<string>(
    filterTabsObj.email
  )
  const [data, setData] = useState<DataProps>({
    subject: '',
    startDate: dayjs(),
    endDate: dayjs(),
    startTime: dayjs('09:00', 'HH:mm'),
    endTime: dayjs('09:30', 'HH:mm'),
    freeBusy: 'Free',
    notes: '',
  })
  const isMobile = useMedia('(max-width: 768px)', false)
  const [selectedUser, setSelectedUser] = useState('William Brandham (You)')
  const [selectedLead, setSelectedLead] = useState<string>('')
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [isDone, setIsDone] = useState(false)
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [defaultCalenderDate, setDefaultCalenderDate] = useState<Date>(
    new Date()
  )

  useEffect(() => {
    if (isEdit && editData) {
      const {
        subject,
        startDate,
        endDate,
        startTime,
        endTime,
        freeBusy,
        notes,
      } = editData
      setData({
        subject,
        startDate,
        endDate,
        startTime,
        endTime,
        freeBusy,
        notes,
      })
      setDefaultCalenderDate(dayjs(startDate, 'D MMMM YYYY hh:mm').toDate())
      editData.client && setSelectedClient(editData.client as never)
      editData?.user && setSelectedUser(editData.user as never)
      editData?.lead && setSelectedLead(editData.lead as never)
    }
  }, [editData, isEdit])

  const onFilterTabsChange = (selectedTab) => {
    setFilterTabValue(selectedTab)
  }

  const toggleDrawer = () => {
    setVisibleDrawer((e) => !e)
  }

  const handleDataChange = (name, value) => {
    setData((e) => ({
      ...e,
      [name]: value,
    }))
  }

  const onSaveClick = () => {
    handleSave?.({
      ...data,
      subject: data.subject ? data.subject : filterTabValue,
      type: filterTabValue,
      assigned: selectedUser,
      lead: selectedLead,
      client: selectedClient,
      isDone,
    })
  }

  const handleCancel = () => {
    onCancel?.()
    setData({
      subject: '',
      startDate: dayjs(),
      endDate: dayjs(),
      startTime: undefined,
      endTime: undefined,
      freeBusy: 'Free',
      notes: '',
    })
    setSelectedUser('William Brandham (You)')
    setSelectedClient('')
    setSelectedLead('')
  }

  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }

  const DebounceSelect = ({
    fetchOptions,
    debounceTimeout = 400,
    isPrefixIcon = false,
    prefixIcon,
    ...props
  }) => {
    const [fetching, setFetching] = React.useState(false)
    const [options, setOptions] = React.useState(fetchOptions)
    const [search, setSearch] = React.useState('')
    const fetchRef = React.useRef(0)

    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value: string) => {
        setSearch(value)
        fetchRef.current += 1
        const fetchId = fetchRef.current
        setOptions([])
        setFetching(true)

        setTimeout(() => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return
          }
          const newOptions = fetchOptions.filter((option) => {
            return option.value.toLowerCase().indexOf(value.toLowerCase()) >= 0
          })
          setOptions(newOptions)
          setFetching(false)
        }, 500)
      }

      return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (
      <div>
        {isPrefixIcon && prefixIcon}
        <Select
          {...props}
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          onClick={() => setOptions(fetchOptions)}
        >
          {options.map((item, index) => (
            <Option key={index} value={item.value}>
              <Highlighter
                highlightClassName={styles.highlight}
                searchWords={[search]}
                textToHighlight={item.name}
              >
                {item.name}
              </Highlighter>
            </Option>
          ))}
        </Select>
      </div>
    )
  }

  return (
    <div>
      <BasicModal
        modalWidth={926}
        title={!isMobile && t('activityList.createActivity')}
        visible={visible}
        onCancel={handleCancel}
        className={styles.activityModal}
        footer={false}
        closable={isMobile ? false : true}
        modalBodyClass={isMobile ? styles.modalBodyClass : ''}
      >
        <div className={styles.headerWrapper}>
          {isMobile && (
            <div className={styles.mobileMenu}>
              <div>
                <LeftOutlined onClick={onCancel} />
                <span>{t('activityList.createActivity')}</span>
              </div>
              <div>
                <MenuOutlined onClick={toggleDrawer} />
              </div>
            </div>
          )}
          <div className={styles.subHeader}>
            <div className={styles.subHeaderLeft}>
              <div
                onClick={() => onFilterTabsChange(filterTabsObj.email)}
                className={classNames({
                  [styles.active]: filterTabValue === filterTabsObj.email,
                })}
              >
                {renderTooltip({
                  title: t('activityList.subTabs.email'),
                  icon: <SendOutlined />,
                })}
              </div>
              <div
                onClick={() => onFilterTabsChange(filterTabsObj.call)}
                className={classNames({
                  [styles.active]: filterTabValue === filterTabsObj.call,
                })}
              >
                {renderTooltip({
                  title: t('activityList.subTabs.call'),
                  icon: <PhoneOutlined />,
                })}
              </div>
              <div
                onClick={() => onFilterTabsChange(filterTabsObj.message)}
                className={classNames({
                  [styles.active]: filterTabValue === filterTabsObj.message,
                })}
              >
                {renderTooltip({
                  title: t('activityList.subTabs.message'),
                  icon: <MessageOutlined />,
                })}
              </div>
              <div
                onClick={() => onFilterTabsChange(filterTabsObj.meeting)}
                className={classNames({
                  [styles.active]: filterTabValue === filterTabsObj.meeting,
                })}
              >
                {renderTooltip({
                  title: t('activityList.subTabs.meeting'),
                  icon: <UsergroupAddOutlined />,
                })}
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className={styles.userName}>
              <Avatar name={selectedUser} />
              <span className={styles.userText}>{selectedUser}</span>
            </div>
          )}
        </div>
        <div className={styles.mainContentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.inputText}>
              <FontColorsOutlined />
              <Input
                value={data.subject}
                onChange={(e) => handleDataChange('subject', e.target.value)}
                placeholder={filterTabValue}
              />
            </div>
            <div
              className={classNames(styles.widgetTool, styles.mobDeviceWidget)}
            >
              <ClockCircleOutlined />
              <div className={styles.dateGroup}>
                <DatePicker
                  format={'DD-MM-YYYY'}
                  value={data?.startDate || null}
                  onChange={(date) => handleDataChange('startDate', date)}
                  allowClear={false}
                />
                <div className={styles.timeInput}>
                  <TimePicker
                    format={'HH:mm'}
                    placeholder={'HH:mm'}
                    value={data?.startTime}
                    onChange={(value) => handleDataChange('startTime', value)}
                  />
                </div>
                <span className={styles.dashTag}>-</span>
                <div className={classNames(styles.timeInput, styles.mobInput)}>
                  <TimePicker
                    format={'HH:mm'}
                    placeholder={'HH:mm'}
                    value={(data?.endTime || null) as never}
                    onChange={(value) => handleDataChange('endTime', value)}
                  />
                </div>
                <DatePicker
                  format={'DD-MM-YYYY'}
                  value={data?.endDate || null}
                  onChange={(date) => handleDataChange('endDate', date)}
                  allowClear={false}
                />
              </div>
            </div>
            <div className={styles.widgetTool}>
              <BlockOutlined />
              <Select
                style={{ width: 200 }}
                value={data?.freeBusy}
                onChange={(val) => handleDataChange('freeBusy', val)}
              >
                {[
                  { name: t('createActivity.select.free'), value: 'free' },
                  { name: t('createActivity.select.busy'), value: 'busy' },
                ].map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
              <QuestionCircleOutlined />
            </div>
            <div className={styles.textAreaWrapper}>
              <div className={styles.areaInput}>
                <FileOutlined />
                <TextArea
                  rows={2}
                  value={data?.notes}
                  onChange={(e) => handleDataChange('notes', e.target.value)}
                />
              </div>
            </div>
            <div className={styles.userSelect}>
              <UserOutlined />
              <Select
                style={{ width: 200 }}
                value={selectedUser}
                onChange={(val) => setSelectedUser(val)}
              >
                {userOptions.map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </div>
            <div className={styles.beautyData}>
              <span className={styles.link}>
                <LinkOutlined />
              </span>
              <div className={styles.innerContent}>
                <div className={styles.customInputText}>
                  <DebounceSelect
                    allowClear
                    style={{ width: '100%' }}
                    size={'small'}
                    showArrow={false}
                    value={(selectedLead || undefined) as never}
                    placeholder={t('createActivity.select.lead.placeholder')}
                    disabled={!!selectedClient}
                    onChange={(val) => setSelectedLead(val as never)}
                    showSearch
                    fetchOptions={leadOptions}
                    isPrefixIcon={true}
                    prefixIcon={
                      <div className={styles.leadIcon}>
                        <AimOutlined />
                      </div>
                    }
                  />
                </div>
                <div className={styles.orClass}>{t('createActivity.or')}</div>
                <div className={styles.customInputText}>
                  <DebounceSelect
                    showSearch
                    allowClear
                    style={{ width: '100%' }}
                    value={(selectedClient || undefined) as never}
                    size={'small'}
                    placeholder={t('createActivity.select.client.placeholder')}
                    disabled={!!selectedLead}
                    onChange={(val) => setSelectedClient(val as never)}
                    showArrow={false}
                    fetchOptions={clientOptions}
                    isPrefixIcon={true}
                    prefixIcon={
                      <span className={styles.user}>
                        <UserOutlined />
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.footerActions}>
              <div className={styles.checkName}>
                <Checkbox onChange={(e) => setIsDone(e.target.checked)}>
                  {t('createActivity.markAsDone')}
                </Checkbox>
              </div>
              <div className={styles.activityBtnGroup}>
                <Button onClick={handleCancel}>
                  {t('activityList.addColumn.cancel')}
                </Button>
                <Button type={'primary'} onClick={onSaveClick}>
                  {t('activityList.addColumn.save')}
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.calendar}>
            {!isMobile ? (
              <BigCalender data={events} defaultDate={defaultCalenderDate} />
            ) : (
              <Drawer
                title={
                  <div className={styles.userName}>
                    <Avatar name={selectedUser} />
                    <span className={styles.userText}>
                      &nbsp; {selectedUser}
                    </span>
                  </div>
                }
                placement={'right'}
                closable={true}
                onClose={toggleDrawer}
                visible={visibleDrawer}
                key={'right'}
                width={'356'}
                className={styles.calendarDrawer}
              >
                <div className={styles.bigCalEvent}>
                  <BigCalender
                    data={events}
                    defaultDate={defaultCalenderDate}
                  />
                </div>
              </Drawer>
            )}
          </div>
        </div>
      </BasicModal>
    </div>
  )
}

export default CreateActivity
