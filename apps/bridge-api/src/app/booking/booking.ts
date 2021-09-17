import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/Dashboard'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'

export const retrieveBookingStatuses = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const bookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date },
      status: { not: '' },
      end_date: { lte: data.end_date },
      Online: { not: data.is_active },
    },
    _count: {
      id: true,
    },
  })
  const onlineBookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
      start_date: { gte: data.start_date },
      end_date: { lte: data.end_date },
      Online: { equals: data.is_active },
    },
    _count: {
      id: true,
    },
  })
  const totalBookingStatusCount = await ctx.prisma.booking.aggregate({
    where: {
      Online: { not: data.is_active },
    },
    _count: {
      id: true,
    },
  })
  const totalOnlineBookingStatusCount = await ctx.prisma.booking.aggregate({
    where: {
      Online: { equals: data.is_active },
    },
    _count: {
      id: true,
    },
  })

  const onlineAppointment = []
  const appointment = []

  if (bookingStatusCount) {
    bookingStatusCount?.map((item) => {
      if (item.status !== '') {
        appointment.push({
          label: item.status,
          count: item._count.id,
          per:
            (
              ((item._count.id ?? 0) * 100) /
              (totalBookingStatusCount?._count?.id ?? 0)
            ).toFixed(2) + '%',
        })
      }
      return item
    })
  }
  if (onlineBookingStatusCount) {
    onlineBookingStatusCount?.map((item) => {
      if (item.status !== '') {
        onlineAppointment.push({
          label: item.status,
          count: item._count.id,
          per:
            (
              ((item._count.id ?? 0) * 100) /
              (totalOnlineBookingStatusCount?._count?.id ?? 0)
            ).toFixed(2) + '%',
        })
      }
      return item
    })
  }

  return {
    totalBooking: bookingStatusCount?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0), // total bookings for only required status
    totalBookingPer: `${(
      (bookingStatusCount?.reduce((prev, cur) => {
        return prev + cur._count.id ?? 0
      }, 0) *
        100) /
        totalBookingStatusCount?._count?.id ?? 0
    ).toFixed(2)}%`,
    totalOnlineBooking: onlineBookingStatusCount?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0), // total online bookings for only required status
    totalOnlineBookingPer: `${(
      (onlineBookingStatusCount?.reduce((prev, cur) => {
        return prev + cur._count.id ?? 0
      }, 0) *
        100) /
        totalOnlineBookingStatusCount?._count?.id ?? 0
    ).toFixed(2)}%`,
    totalBookingStatusCounts: totalBookingStatusCount?._count?.id, // total bookings
    totalOnlineBookingStatusCount: totalOnlineBookingStatusCount?._count?.id, // total online bookings
    appointmentList: appointment,
    onlineAppointmentList: onlineAppointment,
  }
}

export const retrieveAllBookingData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const bookingCount = await ctx.prisma.booking.groupBy({
    by: ['start_date'],
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
    },
    _count: {
      id: true,
    },
  })

  const bookingStatusCount = await ctx.prisma.booking.groupBy({
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

  const bookingStatusData = await ctx.prisma.booking.findMany({
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
  const details = []

  if (bookingStatusData) {
    bookingStatusCount.map((status) => {
      const data = bookingStatusData.filter(
        (item) => item.status === status?.status
      )
      details.push({
        key: status?.status,
        values: [...new Set(data.map((item) => item.start_date))].filter(
          (item) => !!item
        ),
      })
      return status
    })
  }
  if (details) {
    const DataSet = []
    details.map((record) => {
      let dataGroupByDateRange
      if (data.date_range === 'custom') {
        const endDate = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
          'YYYY-MM-DD'
        )
        const startDate = dayjs(
          `${data.start_date}` as 'YYYYMMDDHHmmss'
        ).format('YYYY-MM-DD')
        const month = dayjs(endDate).diff(startDate, 'month')
        const year = dayjs(endDate).diff(startDate, 'year')
        const week = dayjs(endDate).diff(startDate, 'week')
        const day = dayjs(endDate).diff(startDate, 'day')

        if (year > 0) {
          dataGroupByDateRange = groupByDateRange(record.values, 'All records')
        } else if (month > 0) {
          dataGroupByDateRange = groupByDateRange(record.values, 'This Year')
        } else if (week > 0) {
          dataGroupByDateRange = groupByDateRange(record.values, 'This Month')
        } else if (day > 0) {
          dataGroupByDateRange = groupByDateRange(record.values, 'This Week')
        }
      } else if (data.date_range === 'All records') {
        dataGroupByDateRange = groupByDateRange(bookingCount, 'All records')
      } else {
        dataGroupByDateRange = groupByDateRange(record.values, data.date_range)
      }

      DataSet.push({
        status: record?.key,
        dateRange: dataGroupByDateRange,
      })
      return record
    })
    console.log('DataSet=------------', DataSet)
  }

  return {
    success: 1,
  }
}

const groupByDateRange = (data, dataRange) => {
  switch (dataRange) {
    case 'All records': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('year').format('YYYY')
      )
      return data1
    }
    case 'This Year': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('month').format('MMM')
      )
      return data1
    }
    case 'Last Year': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('month').format('MMM')
      )
      return data1
    }
    case 'This Month': {
      const data1 = groupBy(data, (item) => dayjs(`${item}`).startOf('week'))
      return data1
    }
    case 'Last Month': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('week').format('DD MMM')
      )
      return data1
    }
    case 'This Week': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd DD')
      )
      return data1
    }
    case 'Last Week': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd DD')
      )
      return data1
    }
    case 'Today': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd DD')
      )
      return data1
    }
    case 'Yesterday': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd DD')
      )
      return data1
    }
  }
}
