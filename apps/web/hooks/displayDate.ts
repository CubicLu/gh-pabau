import { useUser } from '../context/UserContext'
import dayjs from 'dayjs'

export const dateFormatMapper = {
  'd/m/Y': 'DD/MM/YYYY',
  'm/d/Y': 'MM/DD/YYYY',
}

export const dateTimeFormatMapper = {
  'd/m/Y': 'DD/MM/YYYY hh:mm',
  'm/d/Y': 'MM/DD/YYYY hh:mm',
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
  return dayjs(date).format(dateTimeFormatMapper[dateFormat])
}
