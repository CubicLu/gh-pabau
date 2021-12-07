import { extendType, intArg, list } from 'nexus'
import { Context } from '../../../context'
import dayjs from 'dayjs'

export const MarkActivityDone = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('markActivityDone', {
      type: 'AffectRowsResponse',
      description: 'Done activity based on input list of activity id',
      args: {
        ids: list(intArg()),
      },
      async resolve(_, { ids }, ctx: Context) {
        const response = await ctx.prisma.activity.updateMany({
          where: {
            id: { in: ids },
            company_id: ctx.authenticated.company,
          },
          data: {
            status: {
              set: 'done',
            },
            finished_at: {
              set: dayjs().format(),
            },
            completed_by: {
              set: ctx.authenticated.user,
            },
          },
        })
        return {
          affected_rows: response?.count,
        }
      },
    })
  },
})
