import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/DashboardStatus'
import dayjs from 'dayjs'

export const retrieveStatusData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const appointmentStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      start_date: { gte: data.start_date },
      end_date: { lte: data.end_date },
      status: {
        in: ['complete', 'Waiting', 'Cancelled', 'no-show', 'deposit-paid'],
      },
    },
    _count: {
      id: true,
    },
  })

  const totalStatusCount = await ctx.prisma.booking.aggregate({
    _count: {
      id: true,
    },
  })

  const start_date = dayjs(new Date(data.start_date)).format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )
  const end_date = dayjs(new Date(data.end_date)).format('YYYY-MM-DDTHH:mm:ssZ')

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
    totalStatusCounts: totalStatusCount?._count?.id,
    totalSalesCounts: totalSalesCount?._count?.id,
    appointmentStatusCounts: {
      completeCount:
        appointmentStatusCount?.find((item) => item.status === 'complete')
          ?._count?.id ?? 0,
      completePer:
        (
          ((appointmentStatusCount?.find((item) => item.status === 'complete')
            ?._count?.id ?? 0) *
            100) /
          (totalStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      waitingCount:
        appointmentStatusCount?.find((item) => item.status === 'Waiting')
          ?._count?.id ?? 0,
      waitingPer:
        (
          ((appointmentStatusCount?.find((item) => item.status === 'Waiting')
            ?._count?.id ?? 0) *
            100) /
          (totalStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      cancelledCount:
        appointmentStatusCount?.find((item) => item.status === 'Cancelled')
          ?._count?.id ?? 0,
      cancelledPer:
        (
          ((appointmentStatusCount?.find((item) => item.status === 'Cancelled')
            ?._count?.id ?? 0) *
            100) /
          (totalStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      noShowCount:
        appointmentStatusCount?.find((item) => item.status === 'no-show')
          ?._count?.id ?? 0,
      noShowPer:
        (
          ((appointmentStatusCount?.find((item) => item.status === 'no-show')
            ?._count?.id ?? 0) *
            100) /
          (totalStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
      depositPaidCount:
        appointmentStatusCount?.find((item) => item.status === 'deposit-paid')
          ?._count?.id ?? 0,
      depositPaidPer:
        (
          ((appointmentStatusCount?.find(
            (item) => item.status === 'deposit-paid'
          )?._count?.id ?? 0) *
            100) /
          (totalStatusCount?._count?.id ?? 0)
        ).toFixed(2) + '%',
    },
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
