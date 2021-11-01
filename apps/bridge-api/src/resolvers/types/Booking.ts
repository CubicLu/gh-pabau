import { extendType, list, nonNull, arg, inputObjectType } from 'nexus'
import { Context } from '../../context'
import {
  retrieveAllBookingStatusCount,
  retrieveAllBookingChartData,
} from '../../app/booking/statuses'
import {
  BookingCountResponseType,
  BookingDetailResponseType,
} from '../../app/booking/nexus-type'

const BookingInputTypes = inputObjectType({
  name: 'BookingInputTypes',
  definition(t) {
    t.decimal('start_date')
    t.decimal('end_date')
    t.int('location_id')
    t.int('user_id')
  },
})

export const BookingExtended = extendType({
  type: 'Booking',
  definition(t) {
    t.field('Participants', {
      type: nonNull(list('User')),
      async resolve(parent: any, args, ctx: Context) {
        const usersIds = parent.participant_slave_uids
        if (!usersIds) {
          return []
        }
        const ids = []
        for (const item of usersIds?.split(',')) {
          ids.push(Number.parseInt(item))
        }
        return await ctx.prisma.user.findMany({
          where: {
            id: { in: ids },
          },
        })
      },
    })
    t.field('BookedBy', {
      type: nonNull(list('User')),
      async resolve(parent: any, args, ctx: Context) {
        return await ctx.prisma.user.findMany({
          where: {
            id: {
              equals: parent.created_by_uid,
            },
          },
        })
      },
    })
  },
})

export const BookingStatus = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBookingStatusCount', {
      type: BookingCountResponseType,
      args: {
        data: arg({ type: BookingInputTypes }),
      },
      async resolve(_root, { data }, ctx: Context) {
        const allBookingCounts = await retrieveAllBookingStatusCount(
          ctx,
          data,
          false
        )
        const onlineBookingCounts = await retrieveAllBookingStatusCount(
          ctx,
          data,
          true
        )
        return {
          allBookingCounts: allBookingCounts,
          onlineBookingCounts: onlineBookingCounts,
        }
      },
    })
    t.field('getBookingChartDetail', {
      type: BookingDetailResponseType,
      args: {
        data: arg({ type: BookingInputTypes }),
      },
      async resolve(_root, { data }, ctx: Context) {
        return await retrieveAllBookingChartData(ctx, data)
      },
    })
  },
})
