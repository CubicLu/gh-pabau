import { extendType, intArg, list } from 'nexus'
import { Context } from '../../../context'

export const reorderCommunicationTemplates = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('reorderCommunicationTemplates', {
      type: list('MessageTemplate'),
      description: 'Reorder templates',
      args: {
        template_ids: list(intArg()),
      },
      resolve: async (_parent, args, ctx: Context) => {
        let i = 0
        for await (const template_id of args.template_ids) {
          i++
          await ctx.prisma.messageTemplate.update({
            where: {
              template_id: template_id,
            },
            data: { order: i },
          })
        }
        return await ctx.prisma.messageTemplate.findMany({
          where: {
            company_id: ctx.authenticated.company,
            template_id: { in: args.template_ids },
          },
        })
      },
    })
  },
})
