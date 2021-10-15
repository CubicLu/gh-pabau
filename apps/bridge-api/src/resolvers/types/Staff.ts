import { extendType, nonNull, list } from 'nexus'
import { Context } from '../../context'

export const StaffExtended = extendType({
  type: 'CmStaffGeneral',
  definition(t) {
    t.field('Locations', {
      type: nonNull(list('CompanyBranch')),
      async resolve(parent: any, args, ctx: Context) {
        const locationIds = parent.Location
        if (!locationIds) {
          return []
        }

        const ids = []
        for (const item of locationIds?.split(',')) {
          ids.push(Number.parseInt(item))
        }

        const locations = await ctx.prisma.companyBranch.findMany({
          where: {
            id: { in: ids },
          },
        })

        return locations
      },
    })
  },
})
