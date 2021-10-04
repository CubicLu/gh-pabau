import { extendType, arg } from 'nexus'
import { Context } from '../../context'
import {
  retrieveBookingStatuses,
  retrieveAllBookingChartData,
} from '../../app/booking/booking'
import {
  retrieveSalesCount,
  retrieveSalesChartData,
  retrieveRetailSalesData,
  retrieveServiceSalesData,
  retriveOtherDetails,
} from '../../app/finance/finance'
import {
  DashboardInputType,
  DashboardResponseType,
} from '../../app/booking/nexus-type/index'

export interface DateRangeInput {
  start_date?: number
  end_date?: number
}

export const dashboardData = extendType({
  type: 'Query',
  definition(t) {
    t.field('dashboardData', {
      type: DashboardResponseType,
      description: 'get booking status count for particular status',
      args: {
        data: arg({ type: DashboardInputType }),
      },
      async resolve(_root, { data }, ctx: Context) {
        const bookingStatusCount = await retrieveBookingStatuses(ctx, data)
        const salesCount = await retrieveSalesCount(ctx, data)
        const allbooking = await retrieveAllBookingChartData(ctx, data)
        const allSales = await retrieveSalesChartData(ctx, data)
        const retailSales = await retrieveRetailSalesData(ctx, data)
        const serviceSales = await retrieveServiceSalesData(ctx, data)
        const allDetails = await retriveOtherDetails(ctx, data)
        return {
          bookingStatusCount: bookingStatusCount,
          salesCount: salesCount,
          allbooking: allbooking,
          allSales: allSales,
          retailSales: retailSales,
          serviceSales: serviceSales,
          allDetails: allDetails,
        }
      },
    })
  },
})
