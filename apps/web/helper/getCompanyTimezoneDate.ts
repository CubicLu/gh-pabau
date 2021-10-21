import dayjs from 'dayjs'

export const getCompanyTimezoneDate = (timezone) => {
  const companyTimezone = timezone
  const hour = dayjs().tz(companyTimezone).hour()
  const minute = dayjs().tz(companyTimezone).minute()
  const offset = dayjs().tz(companyTimezone).format('Z').substring(1).split(':')
  return dayjs()
    .tz(companyTimezone)
    .hour(hour + Number(offset[0]))
    .minute(minute + Number(offset[1]))
    .format()
}
