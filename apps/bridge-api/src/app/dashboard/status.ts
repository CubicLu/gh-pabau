import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/DashboardStatus'
import dayjs from 'dayjs'

export const retrieveBookingStatuses = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const bookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date },
      end_date: { lte: data.end_date },
      Online: { not: 1 },
      status: {
        in: ['complete', 'Waiting', 'Cancelled', 'no-show'],
      },
    },
    _count: {
      id: true,
    },
  })
  const onlineBookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      start_date: { gte: data.start_date },
      end_date: { lte: data.end_date },
      Online: { equals: 1 },
      status: {
        in: ['complete', 'Waiting', 'Cancelled', 'no-show', 'deposit-paid'],
      },
    },
    _count: {
      id: true,
    },
  })

  const totalBookingStatusCount = await ctx.prisma.booking.aggregate({
    where: {
      Online: { not: 1 },
    },
    _count: {
      id: true,
    },
  })

  const totalOnlineBookingStatusCount = await ctx.prisma.booking.aggregate({
    where: {
      Online: { equals: 1 },
    },
    _count: {
      id: true,
    },
  })
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
    bookingStatusCounts: {
      completeCount:
        bookingStatusCount?.find((item) => item.status === 'complete')?._count
          ?.id ?? 0,
      completePer:
        (
          ((bookingStatusCount?.find((item) => item.status === 'complete')
            ?._count?.id ?? 0) *
            100) /
          (totalBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      waitingCount:
        bookingStatusCount?.find((item) => item.status === 'Waiting')?._count
          ?.id ?? 0,
      waitingPer:
        (
          ((bookingStatusCount?.find((item) => item.status === 'Waiting')
            ?._count?.id ?? 0) *
            100) /
          (totalBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      cancelledCount:
        bookingStatusCount?.find((item) => item.status === 'Cancelled')?._count
          ?.id ?? 0,
      cancelledPer:
        (
          ((bookingStatusCount?.find((item) => item.status === 'Cancelled')
            ?._count?.id ?? 0) *
            100) /
          (totalBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      noShowCount:
        bookingStatusCount?.find((item) => item.status === 'no-show')?._count
          ?.id ?? 0,
      noShowPer:
        (
          ((bookingStatusCount?.find((item) => item.status === 'no-show')
            ?._count?.id ?? 0) *
            100) /
          (totalBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
    },
    onlineBookingStatusCounts: {
      completeCount:
        onlineBookingStatusCount?.find((item) => item.status === 'complete')
          ?._count?.id ?? 0,
      completePer:
        (
          ((onlineBookingStatusCount?.find((item) => item.status === 'complete')
            ?._count?.id ?? 0) *
            100) /
          (totalOnlineBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      waitingCount:
        onlineBookingStatusCount?.find((item) => item.status === 'Waiting')
          ?._count?.id ?? 0,
      waitingPer:
        (
          ((onlineBookingStatusCount?.find((item) => item.status === 'Waiting')
            ?._count?.id ?? 0) *
            100) /
          (totalOnlineBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      cancelledCount:
        onlineBookingStatusCount?.find((item) => item.status === 'Cancelled')
          ?._count?.id ?? 0,
      cancelledPer:
        (
          ((onlineBookingStatusCount?.find(
            (item) => item.status === 'Cancelled'
          )?._count?.id ?? 0) *
            100) /
          (totalOnlineBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      noShowCount:
        onlineBookingStatusCount?.find((item) => item.status === 'no-show')
          ?._count?.id ?? 0,
      noShowPer:
        (
          ((onlineBookingStatusCount?.find((item) => item.status === 'no-show')
            ?._count?.id ?? 0) *
            100) /
          (totalOnlineBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      depositPaidCount:
        onlineBookingStatusCount?.find((item) => item.status === 'deposit-paid')
          ?._count?.id ?? 0,
      depositPaidPer:
        (
          ((onlineBookingStatusCount?.find(
            (item) => item.status === 'deposit-paid'
          )?._count?.id ?? 0) *
            100) /
          (totalOnlineBookingStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
    },
  }
}

export const retrieveSalesCount = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const start_date = dayjs(`${data.start_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )
  const end_date = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )

  const salesCount = await ctx.prisma.saleItem.groupBy({
    by: ['product_category_type'],
    where: {
      InvSale: {
        date: {
          gte: start_date,
          lte: end_date,
        },
      },
      product_category_type: {
        in: ['service', 'retail', 'packages', 'vouchers'],
      },
    },
    _count: {
      id: true,
    },
  })

  const totalSalesCount = await ctx.prisma.invSale.aggregate({
    _count: {
      id: true,
    },
  })
  return {
    totalSalesCounts: totalSalesCount?._count?.id ?? 0,
    totalAvailableCategoryTypeCount: salesCount?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0),
    totalAvailableCategoryTypePer: `${(
      (salesCount?.reduce((prev, cur) => {
        return prev + cur._count.id ?? 0
      }, 0) *
        100) /
        totalSalesCount?._count?.id ?? 0
    ).toFixed(2)}%`,
    saleStatusCount: {
      serviceCount:
        salesCount?.find((item) => item.product_category_type === 'service')
          ?._count?.id ?? 0,
      servicePer:
        (
          ((salesCount?.find((item) => item.product_category_type === 'service')
            ?._count?.id ?? 0) *
            100) /
          (totalSalesCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      retailCount:
        salesCount?.find((item) => item.product_category_type === 'retail')
          ?._count?.id ?? 0,
      retailPer:
        (
          ((salesCount?.find((item) => item.product_category_type === 'retail')
            ?._count?.id ?? 0) *
            100) /
          (totalSalesCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      packagesCount:
        salesCount?.find((item) => item.product_category_type === 'packages')
          ?._count?.id ?? 0,
      packagesPer:
        (
          ((salesCount?.find(
            (item) => item.product_category_type === 'packages'
          )?._count?.id ?? 0) *
            100) /
          (totalSalesCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      vouchersCount:
        salesCount?.find((item) => item.product_category_type === 'vouchers')
          ?._count?.id ?? 0,
      vouchersPer:
        (
          ((salesCount?.find(
            (item) => item.product_category_type === 'vouchers'
          )?._count?.id ?? 0) *
            100) /
          (totalSalesCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
    },
  }
}
