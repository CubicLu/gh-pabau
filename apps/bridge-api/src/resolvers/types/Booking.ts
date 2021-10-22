import { extendType, list, nonNull } from 'nexus'
import { Context } from '../../context'

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
