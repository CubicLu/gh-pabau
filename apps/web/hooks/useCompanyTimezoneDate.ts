import { useUser } from '../context/UserContext'
import dayjs from 'dayjs'

const useCompanyTimezoneDate = () => {
  const user = useUser()
  const timezoneDate = () => {
    const companyTimezone = dayjs().tz(user?.me?.timezone)
    const hour = companyTimezone.hour()
    const minute = companyTimezone.minute()
    const offset = companyTimezone.format('Z').substring(1).split(':')
    return companyTimezone
      .hour(hour + Number(offset[0]))
      .minute(minute + Number(offset[1]))
      .format()
  }
  return { timezoneDate }
}

export default useCompanyTimezoneDate
