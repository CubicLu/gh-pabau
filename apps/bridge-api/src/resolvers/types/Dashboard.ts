import { extendType, inputObjectType, arg } from 'nexus'
import { Context } from '../../context'
import {
  retrieveBookingStatuses,
  retrieveAllBookingData,
} from '../../app/booking/booking'
import { retrieveSalesCount } from '../../app/finance/finance'

export interface DateRangeInput {
  start_date: number
  end_date: number
  date_range: string
  is_active: number
}

export const DashboardInputType = inputObjectType({
  name: 'DashboardInputType',
  definition(t) {
    t.nonNull.decimal('start_date')
    t.nonNull.decimal('end_date')
    t.nonNull.string('date_range')
    t.nonNull.int('is_active')
  },
})

export const getDashboardData = extendType({
  type: 'Query',
  definition(t) {
    t.field('getDashboardData', {
      type: 'Json',
      description: 'get booking status count for particular status',
      args: {
        data: arg({ type: DashboardInputType }),
      },
      async resolve(_root, { data }, ctx: Context) {
        const bookingStatus = await retrieveBookingStatuses(ctx, data)
        const salesStatus = await retrieveSalesCount(ctx, data)
        const allbooking = await retrieveAllBookingData(ctx, data)
        return {
          bookingStatus: bookingStatus,
          salesStatus: salesStatus,
          allbooking: allbooking,
        }
      },
    })
  },
})
