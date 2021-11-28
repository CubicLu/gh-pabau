import { extendType } from 'nexus'
import { Context } from '../../../context'
import { ConnectStatsType } from '../nexus-type'
import moment from 'moment'

export const ConnectStats = extendType({
  type: 'Query',
  definition(t) {
    t.field('connectStats', {
      type: ConnectStatsType,
      description: 'Get connect stats',
      async resolve(_, input, ctx: Context) {
        const userTotal = await ctx.prisma.userMaster.count({
          where: {
            company_id: ctx.authenticated.company,
          },
        })

        const activeTotal = await ctx.prisma.userMaster.count({
          where: {
            company_id: ctx.authenticated.company,
            last_login: {
              gte: moment().subtract(6, 'month').toDate(),
            },
          },
        })

        const mStart = moment().subtract(5, 'month').startOf('month')
        const mEnd = moment().endOf('month')
        const registrations = []

        for (
          let date = moment(mStart);
          date.isBefore(mEnd);
          date.add(1, 'month')
        ) {
          const start = moment(date).startOf('month').toDate()
          const end = moment(date).endOf('month').toDate()
          const cnt = await ctx.prisma.userMaster.count({
            where: {
              company_id: ctx.authenticated.company,
              timestamp: {
                gte: start,
                lte: end,
              },
            },
          })

          registrations.push({
            month: date.format('M'),
            count: cnt,
          })
        }

        return {
          downloads: 0,
          total_users: userTotal,
          active_users: activeTotal,
          registrations: registrations,
        }
      },
    })
  },
})
