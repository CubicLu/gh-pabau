import React, { FC, useEffect, useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import confetti from 'canvas-confetti'
import { FilterOutlined } from '@ant-design/icons'
import styles from './Activities.module.less'
import { groupAcitvitiesByDay } from './utils'
import dayjs, { Dayjs } from 'dayjs'
import { Pagination, Button, Popover, Tooltip, Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import { ReactComponent as AppointmentIcon } from '../../assets/images/timeline/appointment.svg'
import { ReactComponent as LetterIcon } from '../../assets/images/timeline/letter-icon.svg'
import { ReactComponent as MailIcon } from '../../assets/images/timeline/mail-icon.svg'
import { ReactComponent as SmsIcon } from '../../assets/images/timeline/sms-icon.svg'
import { ReactComponent as CallIcon } from '../../assets/images/timeline/call-icon.svg'
import { ReactComponent as LostMailIcon } from '../../assets/images/timeline/lost-mail-icon.svg'
import { ReactComponent as RadioUnchecked } from '../../assets/images/timeline/radio-button-unchecked.svg'
import { ReactComponent as RadioChecked } from '../../assets/images/circle-check.svg'
import { ReactComponent as UserIcon } from '../../assets/images/timeline/filled-user.svg'
import TimeLineFilterPopover from './FilterPopover'
import TimelineSkeleton from './ActivitySkeleton'
import calendar from 'dayjs/plugin/calendar'
import isoWeek from 'dayjs/plugin/isoWeek'
import classNames from 'classnames'
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  MoreOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import * as Icon from '@ant-design/icons'

dayjs.extend(calendar)
dayjs.extend(isoWeek)

const calendarFormat = {
  lastDay: `[Yesterday]`,
  sameDay: `[Today]`,
  nextDay: `[Tomorrow]`,
  sameWeek: `dddd`,
  nextWeek: `[Next] dddd`,
}
export interface PaginationType {
  total?: number
  limit?: number
  offSet?: number
  currentPage?: number
}
export interface ActivitiesProps {
  eventsData: ActivitiesDataProps[]
  eventDateFormat: string
  isLoading?: boolean
  setPagination?: (e: PaginationType) => void
  pagination?: PaginationType
  handleMenuClick?: (name: string, id: number) => void
  DisplayDate?: (date: Date) => string
  activityTypeFilterList?: ActivityTypeFilter[]
  activityTypeLoading?: boolean
  onActivityFilterChange?: (id: number, selected: boolean) => void
}

export interface ActivitiesDataProps {
  id: number
  type: string
  eventName?: string
  clientName?: string
  description?: string
  dateTime: string
  taskChecked?: boolean
  taskUserName?: string
  typeIcon?: string
  dateColor?: string
}
export interface ActivityTypeFilter {
  id: number
  name: string
  isSelected: boolean
  hasIcon?: boolean
  icon?: string
}
export const activityTypes = {
  email: 'email',
  sms: 'sms',
  call: 'call',
  letter: 'letter',
  lostEmail: 'lostEmail',
}

export const Activities: FC<ActivitiesProps> = ({
  eventsData = [],
  eventDateFormat,
  isLoading,
  pagination,
  setPagination,
  handleMenuClick,
  DisplayDate,
  activityTypeFilterList,
  activityTypeLoading,
  onActivityFilterChange,
}) => {
  const { t } = useTranslation('common')
  const [events, setEvents] = useState<ActivitiesDataProps[]>([])
  const [filteredEvents, setFilteredEvents] = useState<ActivitiesDataProps[]>(
    []
  )
  const [visibleFilterPopUp, setVisibleFilterPopUp] = useState(false)
  const [selectedFilterKey, setSelectedFilterKey] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<Dayjs[]>([])
  const [paginateData, setPaginateData] = useState({
    total: pagination?.total ?? 0,
    offset: pagination?.offSet ?? 0,
    pageSize: pagination?.limit ?? 50,
    currentPage: pagination?.currentPage ?? 1,
  })
  const menuItems = {
    edit: {
      key: 1,
      icon: <EditOutlined />,
      label: t('timeline.dotMenu.edit'),
    },
    markedAsToDo: {
      key: 2,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.markedAsToDo'),
    },
    markedAsDone: {
      key: 3,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.markedAsDone'),
    },
    delete: {
      key: 4,
      icon: <DeleteOutlined />,
      label: t('timeline.dotMenu.delete'),
    },
  }
  const contentMenuItems = (menus: string[] = []) => {
    const menuList = menus.map((menu) => {
      return menuItems[menu]
    })
    return menuList
  }
  const renderMenu = (event) => {
    return {
      menuList: contentMenuItems([
        'edit',
        event.taskChecked ? 'markedAsToDo' : 'markedAsDone',
        'delete',
      ]),
    }
  }

  const { days = [], eventsByDay } = groupAcitvitiesByDay(
    !pagination
      ? filteredEvents.slice(
          paginateData.offset,
          paginateData.currentPage * paginateData.pageSize
        )
      : filteredEvents,
    eventDateFormat,
    t
  )

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData)
    }
  }, [eventsData])

  useEffect(() => {
    setFilteredEvents(events)
  }, [events])

  useEffect(() => {
    let filteredData = [...events]
    if (selectedFilterKey.length > 0) {
      const filterData: ActivitiesDataProps[] = []
      for (const data of events) {
        if (selectedFilterKey.includes(data.type)) {
          filterData.push(data)
        }
      }
      filteredData = filterData
    }
    if (dateRange.length > 0) {
      const startDate = dayjs(dateRange[0], eventDateFormat)
      const endDate = dayjs(dateRange[1], eventDateFormat)
      filteredData = filteredData.filter((data) => {
        const eventDateTime = dayjs(data.dateTime, eventDateFormat)
        return eventDateTime >= startDate && eventDateTime <= endDate
      })
    }
    setFilteredEvents(filteredData)
    setPaginateData((d) => ({
      ...d,
      currentPage: pagination?.currentPage ?? 1,
      offset: pagination?.offSet ?? 0,
      total: pagination?.total ?? filteredData?.length,
    }))
  }, [selectedFilterKey, dateRange, events, eventDateFormat, pagination])

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const displayConfetti = (day) => {
    if (day === t('timeline.status.done')) {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      })
    }
  }
  const handleActivityChecked = (event) => {
    const newEvents = events?.map((data) => {
      const temp = { ...data }
      if (data.id === event.id) {
        temp.taskChecked = !temp.taskChecked
      }
      return temp
    })
    setEvents(newEvents)
  }

  const timeFormat = (date) => {
    const standardDateFormat = dayjs(date, eventDateFormat).startOf('day')
    const now = dayjs().startOf('day')
    let diff
    const isCurrentYear = standardDateFormat.year() === now.year()
    if (now < date) {
      diff = now.diff(standardDateFormat, 'days')
    } else {
      diff = standardDateFormat.diff(now, 'days')
    }
    let weekDiff = -1
    if (diff <= 14 && diff > 1) {
      if (now < date) {
        weekDiff = now.isoWeek() - standardDateFormat.isoWeek()
      } else {
        weekDiff = standardDateFormat.isoWeek() - now.isoWeek()
      }
    }
    const retVal =
      diff === -1
        ? 'lastDay'
        : diff === 0
        ? 'sameDay'
        : diff === 1
        ? 'nextDay'
        : weekDiff === 0
        ? 'sameWeek'
        : weekDiff === 1
        ? 'nextWeek'
        : ''
    if (retVal) {
      return (
        <Tooltip
          title={
            isCurrentYear
              ? dayjs(date, eventDateFormat).format('MM-DD h:mm')
              : DisplayDate?.(date)
          }
          placement={'topRight'}
        >
          {dayjs(date, eventDateFormat).format(calendarFormat[retVal])}
        </Tooltip>
      )
    } else if (!isCurrentYear) {
      return <div>{DisplayDate?.(date)}</div>
    } else {
      return <div>{dayjs(date, eventDateFormat).format('MM-DD h:mm')}</div>
    }
  }
  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }
  const onPageChange = (currentPage) => {
    const offset = paginateData.pageSize * (currentPage - 1)
    setPagination?.({ ...pagination, offSet: offset, currentPage: currentPage })
    setPaginateData((d) => ({ ...d, offset, currentPage }))
  }
  const renderItem = (key, icon, label, onClick, id) => {
    return (
      <div
        className={styles.dotList}
        key={`three-dot-menu-content-${key}`}
        onClick={(e) => handleMenuClick?.(label, id)}
      >
        {icon}
        <p>{label}</p>
      </div>
    )
  }
  const prepareContent = (menuList, id) => {
    return (
      <div className={classNames(styles.dotWrapper)}>
        {menuList?.map(({ key, icon, label, onClick }) =>
          renderItem(key, icon, label, onClick, id)
        )}
      </div>
    )
  }
  const renderEvent = (event) => {
    const { menuList = [] } = renderMenu(event)
    return (
      <div className={styles.followContent}>
        <div className={styles.boxText}>
          <div className={styles.taskContent}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => handleActivityChecked(event)}
            >
              {event.taskChecked ? <RadioChecked /> : <RadioUnchecked />}
            </span>
            <h4>{event.eventName}</h4>
          </div>
          <div className={styles.timeWrap}>
            <div className={styles.popOverContainer}>
              {menuList.length > 0 && (
                <Popover
                  content={prepareContent(menuList, event.id)}
                  placement="left"
                  trigger="click"
                  overlayClassName={styles.customPopover}
                >
                  <Tooltip
                    title={
                      event.taskChecked
                        ? t('clients.activities.markAsDone')
                        : t('clients.activities.markAsNotDone')
                    }
                    placement={'topRight'}
                  >
                    <Button
                      className={styles.btnCircle}
                      shape="circle"
                      icon={<MoreOutlined />}
                    />
                  </Tooltip>
                </Popover>
              )}
            </div>
          </div>
        </div>
        <div className={styles.clientTimeWrap}>
          <div
            // style={
            //   event.type === activityTypes.lostEmail
            //     ? event.taskChecked
            //       ? { color: '#9292A3' }
            //       : { color: '#FF5B64' }
            //     : { color: '#65CD98' }
            // }
            className={classNames(styles.time, event.dateColor ?? '')}
          >
            {timeFormat(event.dateTime)}
          </div>
          <div className={styles.clientNameWrap}>
            <div className={styles.clientNameText}>{event.clientName}</div>
            <div className={styles.clientNameText}>
              <TeamOutlined /> &nbsp;
              {event.taskUserName}
            </div>
          </div>
        </div>
        {event.description && (
          <span className={styles.bottomText}>
            <h5>{event.description}</h5>
          </span>
        )}
      </div>
    )
  }

  const renderIcon = (type) => {
    switch (type) {
      case activityTypes.email:
        return { icon: <MailIcon />, color: '#40A0C1' }
      case activityTypes.sms:
        return { icon: <SmsIcon />, color: '#40A0C1' }
      case activityTypes.call:
        return { icon: <CallIcon />, color: '#40A0C1' }
      case activityTypes.letter:
        return { icon: <LetterIcon />, color: '#40A0C1' }
      case activityTypes.lostEmail:
        return { icon: <LostMailIcon />, color: '#40A0C1' }
      default:
        return { icon: <AppointmentIcon />, color: '#ED72AA' }
    }
  }

  return (
    <div className={styles.followWrapper}>
      {activityTypeFilterList ? (
        <div className={styles.subHeader}>
          <div className={styles.subHeaderLeft}>
            {activityTypeLoading ? (
              ['1', '2', '3', '4', '5'].map((item, index) => (
                <Skeleton.Input
                  key={index}
                  active={true}
                  size={'small'}
                  //key={index}
                  style={{ width: 25, height: 20 }}
                />
              ))
            ) : (
              <div>
                {activityTypeFilterList?.map((item) => (
                  <div
                    onClick={() =>
                      onActivityFilterChange?.(item.id, item.isSelected)
                    }
                    className={classNames({
                      [styles.active]: item.isSelected,
                    })}
                    key={item.id}
                  >
                    {item.hasIcon
                      ? renderTooltip({
                          title: item.name,
                          icon:
                            item.icon && React.createElement(Icon[item.icon]),
                        })
                      : item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <div className={styles.iconGroup}>
            <div
              className={`${styles.headerIconWrap} ${
                visibleFilterPopUp && styles.active
              }`}
            >
              <TimeLineFilterPopover
                visible={visibleFilterPopUp}
                setVisible={setVisibleFilterPopUp}
                selectedFilterKey={selectedFilterKey}
                setSelectedFilterKey={setSelectedFilterKey}
                dateRange={dateRange}
                setDateRange={setDateRange}
                eventDateFormat={eventDateFormat}
              >
                <FilterOutlined />
              </TimeLineFilterPopover>
            </div>
          </div>
        </div>
      )}
      <div className={styles.timelineWrap}>
        <div className="vertical-timeline-element--work">
          {isLoading ? (
            <TimelineSkeleton />
          ) : (
            <div className={styles.contentWrapper}>
              {filteredEvents.length === 0 ? (
                <div className={styles.emptyEvents}>
                  {t('timeline.filter.noEvent')}
                </div>
              ) : (
                <div>
                  {days.map((day) => (
                    <div className={styles.timeEleWrap} key={day}>
                      <div className={styles.dayName}>
                        <span className={styles.line} />
                        <p
                          style={{
                            cursor:
                              day === t('timeline.status.done')
                                ? 'pointer'
                                : 'default',
                          }}
                          onClick={() => displayConfetti(day)}
                        >
                          {day}
                        </p>
                      </div>
                      <VerticalTimeline layout={'1-column-left'}>
                        {eventsByDay?.[day]
                          .sort((a, b) => {
                            return (
                              dayjs(b.dateTime, eventDateFormat).valueOf() -
                              dayjs(a.dateTime, eventDateFormat).valueOf()
                            )
                          })
                          .map((event, index) => {
                            const { icon, color } = renderIcon(
                              event.type.toLocaleLowerCase()
                            )
                            return (
                              <VerticalTimelineElement
                                key={index}
                                className={'vertical-timeline-element--work'}
                                icon={
                                  event.typeIcon
                                    ? renderTooltip({
                                        title: '',
                                        icon: React.createElement(
                                          Icon[event.typeIcon]
                                        ),
                                      })
                                    : icon
                                }
                                iconStyle={{
                                  background: '#54B2D3',
                                  color: '#fff',
                                }}
                              >
                                {renderEvent(event)}
                              </VerticalTimelineElement>
                            )
                          })}
                      </VerticalTimeline>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.customPage}>
          <Pagination
            defaultCurrent={1}
            current={paginateData.currentPage}
            pageSize={paginateData.pageSize}
            onChange={(page) => onPageChange(page)}
            total={paginateData?.total}
          />
        </div>
      </div>
    </div>
  )
}

export default Activities
