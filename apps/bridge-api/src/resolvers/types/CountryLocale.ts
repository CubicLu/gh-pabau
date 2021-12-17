import { extendType, list, nonNull } from 'nexus'
import { Context } from '../../context'

export const CountryExtended = extendType({
  type: 'Country',
  definition(t) {
    t.field('Timezone', {
      type: nonNull(list('Timezone')),
      async resolve(parent: any, args, ctx: Context) {
        return await ctx.prisma.timezone.findMany({
          where: {
            db_format: { contains: parent.Continent },
          },
        })
      },
    })
  },
})
