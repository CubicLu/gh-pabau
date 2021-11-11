import dayjs from 'dayjs'
import { EventsProps } from '@pabau/ui'
import { TFunction } from 'i18next'

interface ResultantProps {
  days: string[]
  eventsByDay: EventsByDayProps
}

export interface EventsByDayProps {
  [key: string]: EventsProps[]
}

const sortByDate = (a, b) => new Date(b).valueOf() - new Date(a).valueOf()

const getDayForEvent = (event, eventDateFormat, t) => {
  if (dayjs(event.dateTime, eventDateFormat) > dayjs()) {
    return t('timeline.status.scheduled')
  }
  return t('timeline.status.done')
}

export const groupByDay = (
  events: EventsProps[],
  eventDateFormat: string,
  t: TFunction
): ResultantProps => {
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  const groups = events.reduce((days, event) => {
    const day = getDayForEvent(event, eventDateFormat, t)
    if (!days[day]) {
      days[day] = []
    }
    days[day] = [...days?.[day], event]
    return days
  }, {})

  return {
    days: Object.keys(groups).sort(sortByDate),
    eventsByDay: groups,
  }
}
