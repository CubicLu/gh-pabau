import React, { FC, useEffect, useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import confetti from 'canvas-confetti'
import { FilterOutlined } from '@ant-design/icons'
import styles from './Activities.module.less'
import { groupByDay } from './utils'
import dayjs, { Dayjs } from 'dayjs'
import { Pagination } from 'antd'
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
dayjs.extend(calendar)

export interface ActivitiesProps {
  eventsData: ActivitiesDataProps[]
  eventDateFormat: string
  isLoading?: boolean
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
    total: 0,
    offset: 0,
    pageSize: 6,
    currentPage: 1,
  })

  const { days = [], eventsByDay } = groupByDay(
    filteredEvents.slice(
      paginateData.offset,
      paginateData.currentPage * paginateData.pageSize
    ),
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
      currentPage: 1,
      offset: 0,
      total: filteredData?.length,
    }))
  }, [selectedFilterKey, dateRange, events, eventDateFormat])

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
    const standardDateFormat = dayjs(date, eventDateFormat)
    if (
      dayjs(standardDateFormat) < dayjs().subtract(6, 'days') ||
      dayjs(standardDateFormat) > dayjs().add(6, 'days')
    ) {
      return dayjs(date, eventDateFormat).format('DD MMM [at] h:mm a')
    }
    return dayjs(date, eventDateFormat).calendar()
  }

  const onPageChange = (currentPage) => {
    const offset = paginateData.pageSize * (currentPage - 1)
    setPaginateData((d) => ({ ...d, offset, currentPage }))
  }

  const renderEvent = (event) => {
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
        </div>
        <div className={styles.clientTimeWrap}>
          <div
            style={
              event.type === activityTypes.lostEmail
                ? event.taskChecked
                  ? { color: '#9292A3' }
                  : { color: '#FF5B64' }
                : { color: '#65CD98' }
            }
            className={styles.time}
          >
            {timeFormat(event.dateTime)}
          </div>
          <div className={styles.clientNameWrap}>
            <div className={styles.clientNameText}>{event.clientName}</div>
            <div className={styles.clientNameText}>
              <UserIcon /> &nbsp;
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
                            const { icon, color } = renderIcon(event.type)
                            return (
                              <VerticalTimelineElement
                                key={index}
                                className={'vertical-timeline-element--work'}
                                icon={icon}
                                iconStyle={{
                                  background: color,
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
