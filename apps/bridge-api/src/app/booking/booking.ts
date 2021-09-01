import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/Dashboard'

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

  let onlineAppointment = []
  let appointment = []

  if (bookingStatusCount) {
    if (bookingStatusCount.length > 0) {
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
    } else {
      appointment = [
        { label: 'Completed', count: 0, per: '0.00%' },
        { label: 'Waiting', count: 0, per: '0.00%' },
        { label: 'Canceled', count: 0, per: '0.00%' },
        { label: 'No show', count: 0, per: '0.00%' },
      ]
    }
  }
  if (onlineBookingStatusCount) {
    if (onlineBookingStatusCount.length > 0) {
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
    } else {
      onlineAppointment = [
        { label: 'Completed', count: 0, per: '0.00%' },
        { label: 'Waiting', count: 0, per: '0.00%' },
        { label: 'Canceled', count: 0, per: '0.00%' },
        { label: 'No show', count: 0, per: '0.00%' },
        { label: 'Deposits', count: 0, per: '0.00%' },
      ]
    }
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
