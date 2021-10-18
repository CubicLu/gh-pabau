import { extendType, list, nonNull } from 'nexus'
import { Context } from '../../context'

export const PathwayExtend = extendType({
  type: 'Pathways',
  definition(t) {
    t.field('Steps', {
      type: nonNull(list('PathwaySteps')),
      async resolve(parent: any, args, ctx: Context) {
        return await ctx.prisma.pathwaySteps.findMany({
          where: {
            pathway_id: {
              equals: parent.id,
            },
          },
        })
      },
    })
  },
})
