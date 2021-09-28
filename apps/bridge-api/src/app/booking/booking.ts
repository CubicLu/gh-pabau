import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/Dashboard'
import dayjs from 'dayjs'
import { groupByDateRange, statusDataByDayMonth } from './statusByDateRange'

export const retrieveBookingStatuses = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const onlineAppointment = []
  const appointment = []

  const BookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
      start_date: { gte: data.start_date ?? undefined },
      end_date: { lte: data.end_date ?? undefined },
    },
    _count: {
      id: true,
    },
  })
  const BookingStatusCountOnline = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
      start_date: { gte: data.start_date ?? undefined },
      end_date: { lte: data.end_date ?? undefined },
      Online: { equals: 1 },
    },
    _count: {
      id: true,
    },
  })

  BookingStatusCount?.map((item) => {
    appointment.push({
      label: item.status,
      count: item._count.id,
      per:
        (
          ((item._count.id ?? 0) * 100) /
          BookingStatusCount?.reduce((prev, cur) => {
            return prev + cur._count.id ?? 0
          }, 0)
        ).toFixed(2) + '%',
    })
    return item
  })
  BookingStatusCountOnline?.map((item) => {
    onlineAppointment.push({
      label: item.status,
      count: item._count.id,
      per:
        (
          ((item._count.id ?? 0) * 100) /
          BookingStatusCountOnline?.reduce((prev, cur) => {
            return prev + cur._count.id ?? 0
          }, 0)
        ).toFixed(2) + '%',
    })
    return item
  })

  return {
    totalBooking: BookingStatusCount?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0), // total bookings for only required status
    totalBookingPer: `${
      BookingStatusCount?.length > 0
        ? (BookingStatusCount?.reduce((prev, cur) => {
            return prev + cur._count.id ?? 0
          }, 0) *
            100) /
          BookingStatusCount?.reduce((prev, cur) => {
            return prev + cur._count.id ?? 0
          }, 0)
        : 0
    }%`,
    totalOnlineBooking: BookingStatusCountOnline?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0), // total online bookings for only required status
    totalOnlineBookingPer: `${
      BookingStatusCountOnline?.length > 0
        ? (BookingStatusCountOnline?.reduce((prev, cur) => {
            return prev + cur._count.id ?? 0
          }, 0) *
            100) /
          BookingStatusCountOnline?.reduce((prev, cur) => {
            return prev + cur._count.id ?? 0
          }, 0)
        : 0
    }%`,
    appointmentList: appointment,
    onlineAppointmentList: onlineAppointment,
  }
}

export const retrieveAllBookingChartData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  let final = []
  const details = []
  const DataSet = []

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

  const bookingCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date ?? undefined },
      status: { not: '' },
      end_date: { lte: data.end_date ?? undefined },
    },
    _count: {
      id: true,
      start_date: true,
    },
  })
  const bookingData = await ctx.prisma.booking.findMany({
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date ?? undefined },
      status: { not: '' },
      end_date: { lte: data.end_date ?? undefined },
    },
    select: {
      id: true,
      start_date: true,
      status: true,
    },
  })
  bookingCount?.map((status) => {
    const data = bookingData?.filter((item) => item.status === status?.status)
    details.push({
      key: status?.status,
      values: [...new Set(data.map((item) => item.start_date))].filter(
        (item) => !!item
      ),
    })
    return status
  })
  if (details?.length > 0) {
    details.map((record) => {
      switch (true) {
        case year > 0:
          DataSet.push({
            status: record?.key,
            dateRange: groupByDateRange(record.values, 'All records'),
          })
          final = statusDataByDayMonth('All records', DataSet, startDate)
          break
        case month > 0:
          DataSet.push({
            status: record?.key,
            dateRange: groupByDateRange(record.values, 'This Year'),
          })
          final = statusDataByDayMonth('This Year', DataSet, startDate)
          break
        case week > 0:
          DataSet.push({
            status: record?.key,
            dateRange: groupByDateRange(record.values, 'This Month'),
          })
          final = statusDataByDayMonth('This Month', DataSet, startDate)
          break
        case day > 0:
          DataSet.push({
            status: record?.key,
            dateRange: groupByDateRange(record.values, 'This Week'),
          })
          final = statusDataByDayMonth('This Week', DataSet, startDate)
          break
        default:
          DataSet.push({
            status: record?.key,
            dateRange: groupByDateRange(record.values, 'All records'),
          })
          final = statusDataByDayMonth('All records', DataSet, startDate)
      }
      return record
    })
  } else {
    final = null
  }
  return {
    bookingsByStatus: final,
  }
}
