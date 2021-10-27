import dayjs from 'dayjs'

export const getCompanyTimezoneDate = (timezone) => {
  const companyTimezone = dayjs().tz(timezone)
  const hour = companyTimezone.hour()
  const minute = companyTimezone.minute()
  const offset = companyTimezone.format('Z').substring(1).split(':')
  return companyTimezone
    .hour(hour + Number(offset[0]))
    .minute(minute + Number(offset[1]))
    .format()
}
