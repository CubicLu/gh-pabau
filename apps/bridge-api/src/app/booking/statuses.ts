import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/Dashboard'
import dayjs from 'dayjs'
import { statusDataByDayMonth } from './statuses.service'

export const retrieveBookingStatuses = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const onlineAppointment = []
  const appointment = []
  let BookingStatusCountOnline = []
  let BookingStatusCount = []

  if (data.start_date && data.end_date) {
    BookingStatusCountOnline = await ctx.prisma
      .$queryRaw`SELECT status, count(id)
      FROM salon_bookings a
      where start_date between ${data.start_date} and ${data.end_date} and contact_id>0 and Online=1 and status not in ('')
      group by status`
  } else {
    BookingStatusCountOnline = await ctx.prisma
      .$queryRaw`SELECT status, count(id)
      FROM salon_bookings a
      where contact_id>0 and Online=1 and status not in ('')
      group by status`
  }

  if (data.start_date && data.end_date) {
    BookingStatusCount = await ctx.prisma.$queryRaw`SELECT status, count(id)
      FROM salon_bookings a
      where start_date between ${data.start_date} and ${data.end_date} and contact_id>0 and status not in ('')
      group by status`
  } else {
    BookingStatusCount = await ctx.prisma.$queryRaw`SELECT status, count(id)
      FROM salon_bookings a
      where contact_id>0 and status not in ('')
      group by status`
  }

  BookingStatusCount?.map((item) => {
    appointment.push({
      label: item.status,
      count: item['count(id)'],
      per:
        (
          ((item['count(id)'] ?? 0) * 100) /
          BookingStatusCount?.reduce((prev, cur) => {
            return prev + cur['count(id)'] ?? 0
          }, 0)
        ).toFixed(2) + '%',
    })
    return item
  })
  BookingStatusCountOnline?.map((item) => {
    onlineAppointment.push({
      label: item.status,
      count: item['count(id)'],
      per:
        (
          ((item['count(id)'] ?? 0) * 100) /
          BookingStatusCountOnline?.reduce((prev, cur) => {
            return prev + cur['count(id)'] ?? 0
          }, 0)
        ).toFixed(2) + '%',
    })
    return item
  })

  return {
    totalBooking: BookingStatusCount?.reduce((prev, cur) => {
      return prev + cur['count(id)'] ?? 0
    }, 0), // total bookings for only required status
    totalBookingPer: `${
      BookingStatusCount?.length > 0
        ? (BookingStatusCount?.reduce((prev, cur) => {
            return prev + cur['count(id)'] ?? 0
          }, 0) *
            100) /
          BookingStatusCount?.reduce((prev, cur) => {
            return prev + cur['count(id)'] ?? 0
          }, 0)
        : 0
    }%`,
    totalOnlineBooking: BookingStatusCountOnline?.reduce((prev, cur) => {
      return prev + cur['count(id)'] ?? 0
    }, 0), // total online bookings for only required status
    totalOnlineBookingPer: `${
      BookingStatusCountOnline?.length > 0
        ? (BookingStatusCountOnline?.reduce((prev, cur) => {
            return prev + cur['count(id)'] ?? 0
          }, 0) *
            100) /
          BookingStatusCountOnline?.reduce((prev, cur) => {
            return prev + cur['count(id)'] ?? 0
          }, 0)
        : 0
    }%`,
    appointmentList: appointment.length > 0 ? appointment : null,
    onlineAppointmentList:
      onlineAppointment.length > 0 ? onlineAppointment : null,
  }
}

export const retrieveAllBookingChartData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  let booking
  let bookingDataSet = []
  let final = []
  const endDate = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DD'
  )
  const startDate = dayjs(`${data.start_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DD'
  )
  const month = dayjs(endDate).diff(startDate, 'month')
  const year = dayjs(endDate).diff(startDate, 'year')
  const week = dayjs(endDate).diff(startDate, 'week')
  const day = dayjs(endDate).diff(startDate, 'day')

  const getBookingDataSet = (booking) => {
    const dataset = []
    booking.map((record) => {
      const index = dataset.findIndex((item) => item.status === record.status)
      if (index === -1) {
        const filter = booking.filter((item) => item.status === record.status)
        const result = []
        dataset.push({
          status: record.status,
          dateRange: filter.map((i) => {
            result.push({
              label: i.grouping,
              value: i['count(id)'],
            })
            return result
          }),
        })
      }
      return dataset
    })
    return dataset
  }
  switch (true) {
    case year > 0:
      booking = await ctx.prisma
        .$queryRaw`SELECT status, YEAR(DATE_FORMAT(SUBSTRING(a.start_date,1,8),'%Y-%m-%d')) as grouping, count(id)
      FROM salon_bookings a
      where start_date between ${data.start_date} and ${data.end_date} and contact_id>0 and status not in ('')
      group by status, grouping
      order by status`
      bookingDataSet = await getBookingDataSet(booking)
      final = statusDataByDayMonth('All records', bookingDataSet, startDate)
      break
    case month > 0:
      booking = await ctx.prisma
        .$queryRaw`SELECT status, MONTHNAME(DATE_FORMAT(SUBSTRING(a.start_date,1,8),'%Y-%m-%d')) as grouping, count(id)
      FROM salon_bookings a
      where start_date between ${data.start_date} and ${data.end_date} and contact_id>0 and status not in ('')
      group by status, grouping
      order by status`
      bookingDataSet = await getBookingDataSet(booking)
      final = statusDataByDayMonth('This Year', bookingDataSet, startDate)
      break
    case week > 0:
      booking = await ctx.prisma
        .$queryRaw`SELECT status, DATE(DATE_FORMAT(SUBSTRING(a.start_date,1,8),'%Y-%m-%d')) as grouping, count(id)
      FROM salon_bookings a
      where start_date between ${data.start_date} and ${data.end_date} and contact_id>0 and status not in ('')
      group by status, grouping
      order by status`
      bookingDataSet = await getBookingDataSet(booking)
      final = statusDataByDayMonth('This Month', bookingDataSet, startDate)
      break
    case day >= 0:
      booking = await ctx.prisma
        .$queryRaw`SELECT status, DAYNAME(DATE_FORMAT(SUBSTRING(a.start_date,1,8),'%Y-%m-%d')) as grouping, count(id)
      FROM salon_bookings a
      where start_date between ${data.start_date} and ${data.end_date} and contact_id>0 and status not in ('')
      group by status, grouping
      order by status`
      bookingDataSet = await getBookingDataSet(booking)
      final = statusDataByDayMonth('This Week', bookingDataSet, startDate)
      break
    default:
      booking = await ctx.prisma
        .$queryRaw`SELECT status, YEAR(DATE_FORMAT(SUBSTRING(a.start_date,1,8),'%Y-%m-%d')) as grouping, count(id)
      FROM salon_bookings a
      where contact_id>0 and status not in ('')
      group by status, grouping
      order by status`
      bookingDataSet = await getBookingDataSet(booking)
      final = statusDataByDayMonth('All records', bookingDataSet, startDate)
      break
  }
  return {
    bookingsByStatus: final ?? null,
  }
}
