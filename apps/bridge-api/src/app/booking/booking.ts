import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/Dashboard'
import dayjs from 'dayjs'
import { groupByDateRange, statusDataByDayMonth } from './statusByDateRange'

export const retrieveBookingStatuses = async (
  ctx: Context,
  data: DateRangeInput
) => {
  let BookingStatusCountOnline
  let BookingStatusCount
  const onlineAppointment = []
  const appointment = []

  if (data.start_date && data.end_date) {
    BookingStatusCount = await ctx.prisma.booking.groupBy({
      by: ['status'],
      where: {
        NOT: [{ Contact: null }],
        status: { not: '' },
        start_date: { gte: data.start_date },
        end_date: { lte: data.end_date },
      },
      _count: {
        id: true,
      },
    })
    BookingStatusCountOnline = await ctx.prisma.booking.groupBy({
      by: ['status'],
      where: {
        NOT: [{ Contact: null }],
        status: { not: '' },
        start_date: { gte: data.start_date },
        end_date: { lte: data.end_date },
        Online: { equals: 1 },
      },
      _count: {
        id: true,
      },
    })
  }
  if (!data.start_date && !data.end_date) {
    BookingStatusCount = await ctx.prisma.booking.groupBy({
      by: ['status'],
      where: {
        NOT: [{ Contact: null }],
        status: { not: '' },
      },
      _count: {
        id: true,
      },
    })
    BookingStatusCountOnline = await ctx.prisma.booking.groupBy({
      by: ['status'],
      where: {
        NOT: [{ Contact: null }],
        status: { not: '' },
        Online: { equals: 1 },
      },
      _count: {
        id: true,
      },
    })
  }

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
  let bookingCount
  let bookingData
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

  if (data.start_date && data.end_date) {
    bookingCount = await ctx.prisma.booking.groupBy({
      by: ['status'],
      where: {
        NOT: [{ Contact: null }],
        start_date: { gte: data.start_date },
        status: { not: '' },
        end_date: { lte: data.end_date },
      },
      _count: {
        id: true,
        start_date: true,
      },
    })
  } else {
    bookingCount = await ctx.prisma.booking.groupBy({
      by: ['status'],
      where: {
        NOT: [{ Contact: null }],
        status: { not: '' },
      },
      _count: {
        id: true,
        start_date: true,
      },
    })
  }
  if (data.start_date && data.end_date) {
    bookingData = await ctx.prisma.booking.findMany({
      where: {
        NOT: [{ Contact: null }],
        start_date: { gte: data.start_date },
        status: { not: '' },
        end_date: { lte: data.end_date },
      },
      select: {
        id: true,
        start_date: true,
        status: true,
      },
    })
  } else {
    bookingData = await ctx.prisma.booking.findMany({
      where: {
        NOT: [{ Contact: null }],
        status: { not: '' },
      },
      select: {
        id: true,
        start_date: true,
        status: true,
      },
    })
  }
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
      let dataGroupByDateRange

      switch (true) {
        case year > 0:
          dataGroupByDateRange = groupByDateRange(record.values, 'All records')
          break
        case month > 0:
          dataGroupByDateRange = groupByDateRange(record.values, 'This Year')
          break
        case week > 0:
          dataGroupByDateRange = groupByDateRange(record.values, 'This Month')
          break
        case day > 0:
          dataGroupByDateRange = groupByDateRange(record.values, 'This Week')
          break
        default:
          dataGroupByDateRange = groupByDateRange(record.values, 'All records')
      }
      DataSet.push({
        status: record?.key,
        dateRange: dataGroupByDateRange,
      })

      switch (true) {
        case year > 0:
          final = statusDataByDayMonth('All records', DataSet, startDate)
          break
        case month > 0:
          final = statusDataByDayMonth('This Year', DataSet, startDate)
          break
        case week > 0:
          final = statusDataByDayMonth('This Month', DataSet, startDate)
          break
        case day > 0:
          final = statusDataByDayMonth('This Week', DataSet, startDate)
          break
        default:
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
