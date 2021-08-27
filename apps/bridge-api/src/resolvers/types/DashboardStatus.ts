import { extendType, inputObjectType, arg } from 'nexus'
import { Context } from '../../context'
import { retrieveStatusData } from '../../app/dashboard/status'

export interface DateRangeInput {
  start_date: number
  end_date: number
}

export const BookingStatusInputType = inputObjectType({
  name: 'BookingStatusInputType',
  definition(t) {
    t.nonNull.decimal('start_date')
    t.nonNull.decimal('end_date')
  },
})

export const getBookingStatus = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBookingStatus', {
      type: 'Json',
      description: 'get booking status count for particular status',
      args: {
        data: arg({ type: BookingStatusInputType }),
      },
      async resolve(_root, { data }, ctx: Context) {
        return await retrieveStatusData(ctx, data)
      },
    })
  },
})
