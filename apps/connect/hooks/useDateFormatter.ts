import { dateFromUnixOptions } from './interfaces/common'

const formatDate = (date, to_time = 0) => {
  const formatted_date = new Date(
    date
      .toString()
      .replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1')
  )

  if (to_time) {
    return formatted_date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return formatted_date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatDateFromUnix = (unix_timestamp, options: dateFromUnixOptions) => {
  const from_unix = new Date(unix_timestamp * 1000)

  //11/06/2021, Friday
  if (options.full_date_and_weekday_long) {
    const full_date = from_unix.toLocaleDateString('en-GB')
    const weekday_long = from_unix.toLocaleDateString('en-GB', {
      weekday: 'long',
    })
    return `${full_date}, ${weekday_long}`
  }

  if (options.single_hour_minutes) {
    const single_hour_minutes = from_unix.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return single_hour_minutes
  }

  if (options.regular_display) {
    return from_unix.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return from_unix
}

const formatDateWithTz = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const useDateFormatter = () => {
  return {
    formatDate,
    formatDateFromUnix,
    formatDateWithTz,
  }
}
