import { extendType, intArg, list } from 'nexus'
import { Context } from '../../../context'

export const roomOrder = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('roomOrder', {
      type: list('CompanyRoom'),
      description: 'Order of rooms',
      args: {
        id: list(intArg()),
      },
      resolve: async (_parent, args, ctx: Context) => {
        let i = 0
        for await (const id of args.id) {
          i++
          await ctx.prisma.companyRoom.update({
            where: {
              id: id,
            },
            data: { field_order: i },
          })
        }
        return await ctx.prisma.companyRoom.findMany({
          where: {
            company_id: ctx.authenticated.company,
            id: { in: args.id },
          },
          orderBy: {
            field_order: 'asc',
          },
        })
      },
    })
  },
})
