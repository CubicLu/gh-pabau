import { extendType, inputObjectType, intArg, nullable } from 'nexus'
import { Context } from '../../../context'
import { PublicBookingResponse } from '../nexus-type'

export const PBInput = inputObjectType({
  name: 'PBInput',
  definition(t) {
    t.nonNull.int('company_id')
    t.nonNull.float('start_date')
    t.nonNull.float('end_date')
    t.int('uid')
  },
})

export const Public_BookedAppointments = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Public_BookedAppointments', {
      type: PublicBookingResponse,
      description: 'Get bookings with public data',
      args: {
        where: nullable(PBInput),
        skip: intArg(),
        take: intArg(),
      },
      resolve(_, input, ctx: Context) {
        return ctx.prisma.booking.findMany({
          where: {
            company_id: input.where.company_id,
            UID: input.where.uid ? input.where.uid : undefined,
            start_date: input.where.start_date
              ? { gte: input.where.start_date }
              : undefined,
            end_date: input.where.end_date
              ? { lte: input.where.end_date }
              : undefined,
            status: { not: 'Cancelled' },
          },
          skip: input.skip,
          take: input.take,
          orderBy: {
            start_date: 'asc',
          },
        })
      },
    })
  },
})
