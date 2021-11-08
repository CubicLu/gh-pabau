import {
  extendType,
  list,
  nonNull,
  arg,
  inputObjectType,
  intArg,
  stringArg,
} from 'nexus'
import { Context } from '../../context'
import {
  retrieveAllBookingStatusCount,
  retrieveAllBookingChartData,
} from '../../app/booking/statuses'
import {
  BookingCountResponseType,
  BookingDetailResponseType,
  CancelBookingType,
} from '../../app/booking/nexus-type'
import {
  CreateCompanyBranchInputType,
  CreateCompanyBranchResponse,
  UpdateCompanyBranchInputType,
  UpdateCompanyBranchResponse,
} from '../../app/company-branch/nexus-type'
import {
  CreateBranchInputType,
  UpdateBranchInputType,
} from '../../app/company-branch/dto'
import LocationService from '../../app/company-branch/LocationService'

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

export const CancelAppointment = extendType({
  type: 'Mutation',
  definition: function (t) {
    t.field('CancelAppointment', {
      type: 'cancelAppointment',
      args: {
        booking_id: intArg(),
        type: stringArg(),
        reason: stringArg(),
        reason_id: intArg(),
      },
      resolve: async function (
        parent,
        { booking_id, reason, reason_id, type },
        ctx: Context
      ) {
        const cancalBookingStatus = await ctx.prisma.booking.update({
          where: {
            id: booking_id,
          },
          data: {
            status: 'Cancelled',
          },
        })
        const newChangeLogData = []
        const getChangeLogData = await ctx.prisma.bookingChangeLog.findFirst({
          where: {
            appointment_id: booking_id,
          },
        })
        newChangeLogData.push(JSON.parse(getChangeLogData.changelog)[0])
        const changelogData = {
          mode: 'Update',
          status: 'Cancelled',
        }
        newChangeLogData.push(changelogData)
        const changeStatus = await ctx.prisma.bookingChangeLog.update({
          where: {
            appointment_id: booking_id,
          },
          data: {
            changelog: JSON.stringify(newChangeLogData),
          },
        })

        const cancalBooking = await ctx.prisma.bookingCancel.create({
          data: {
            appointment_id: booking_id,
            type: type,
            reason: reason,
            cancel_by: ctx.authenticated.user,
            cancel_reason_id: reason_id,
          },
        })
        return cancalBookingStatus
      },
    })
  },
})
