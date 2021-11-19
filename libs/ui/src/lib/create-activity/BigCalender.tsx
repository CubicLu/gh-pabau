import React, { FC, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import dayjs, { Dayjs } from 'dayjs'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './BigCalendar.module.less'
import { EventsData } from '@pabau/ui'
import { filterTabsObj } from './CreateActivity'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  SendOutlined,
  PhoneOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localize = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export const navigateConstants = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

interface BigCalendarProps {
  data?: EventsData[]
  defaultDate?: Date
  setDate?: (value: Date) => void
  height?: string
}

export const BigCalender: FC<BigCalendarProps> = ({
  data = [],
  defaultDate,
  setDate,
  height,
}) => {
  const { t } = useTranslation('common')
  const [events, setEvents] = useState([])

  useEffect(() => {
    const tempEvents = data.map((ele) => {
      return {
        ...ele,
        start: dayjs(ele.start).toDate(),
        end: ele.end
          ? dayjs(ele.end).toDate()
          : dayjs(ele.start).add(30, 'minutes').toDate(),
      }
    })
    setEvents(tempEvents as never)
  }, [data])

  const CustomToolbar = (props) => {
    const navigate = (action) => {
      props.onNavigate(action)
    }
    return (
      <div className={styles.customHeader}>
        <h5>{props.label}</h5>
        <span className={styles.customBtnGroup}>
          <div onClick={navigate.bind(null, navigateConstants.PREVIOUS)}>
            <Tooltip title={t('create.activity.big.calendar.previous.title')}>
              <LeftOutlined />
            </Tooltip>
          </div>
          <div onClick={navigate.bind(null, navigateConstants.NEXT)}>
            <Tooltip title={t('create.activity.big.calendar.next.title')}>
              <RightOutlined />
            </Tooltip>
          </div>
        </span>
      </div>
    )
  }

  const renderIcon = (type) => {
    switch (type) {
      case filterTabsObj.call:
        return <PhoneOutlined />
      case filterTabsObj.email:
        return <SendOutlined />
      case filterTabsObj.message:
        return <MessageOutlined />
      case filterTabsObj.meeting:
        return <UsergroupAddOutlined />
    }
  }

  const EventComponent = (data) => {
    return (
      <div className={styles.calTimeEle}>
        {renderIcon(data.event.type)}
        {data.title}
      </div>
    )
  }

  return (
    <div style={{ height: height }}>
      <Calendar
        localizer={localize}
        date={defaultDate}
        events={events}
        step={30}
        views={{
          day: true,
        }}
        onNavigate={(date) => {
          setDate?.(date)
        }}
        defaultView={'day'}
        components={{
          toolbar: CustomToolbar,
          event: EventComponent,
        }}
      />
    </div>
  )
}

export default BigCalender
