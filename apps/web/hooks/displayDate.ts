import { useUser } from '../context/UserContext'
import dayjs from 'dayjs'

const dateFormatMapper = {
  'd/m/Y': 'DD/MM/YYYY',
  'm/d/Y': 'MM/DD/YYYY',
}

export const DisplayDate = (date: Date) => {
  const user = useUser()
  const dateFormat = user?.me?.companyDateFormat
  return dayjs(date).format(dateFormatMapper[dateFormat])
}
