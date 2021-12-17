import { useUser } from '../context/UserContext'
import dayjs from 'dayjs'

export const dateFormatMapper = {
  'd/m/Y': 'DD/MM/YYYY',
  'm/d/Y': 'MM/DD/YYYY',
}

export const calculateTimeFormat = (format: string, timeFormat: string) => {
  const time = timeFormat === '12' ? 'hh:mm a' : 'HH:mm'
  return `${format} ${time}`
}

export const DisplayDate = (date: Date) => {
  const user = useUser()
  const dateFormat = user?.me?.companyDateFormat
  return dayjs(date).format(dateFormatMapper[dateFormat])
}

export const GetFormat = () => {
  const user = useUser()
  const dateFormat = user?.me?.companyDateFormat
  return dateFormatMapper[dateFormat]
}

export const DisplayDateTime = (date: Date) => {
  const user = useUser()
  const dateFormat = user?.me?.companyDateFormat
  const timeFormat = user?.me?.timeFormat
  return dayjs(date).format(
    calculateTimeFormat(dateFormatMapper[dateFormat], timeFormat)
  )
}

export const GetDateFormat = () => {
  const user = useUser()
  const dateFormat = user?.me?.companyDateFormat
  return dateFormatMapper[dateFormat]
}
