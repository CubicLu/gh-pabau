import { nonNull, extendType, list } from 'nexus'
import { Context } from '../../../context'

export const limitLocation = extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyLimitContactLocation', {
      type: nonNull(list('CompanyBranch')),
      description: 'Get many limit contact location',
      async resolve(_, input, ctx: Context) {
        const userGroupData = await ctx.prisma.userGroup.findMany({
          where: {
            company_id: ctx.authenticated.company,
            limit_contacts: 1,
            UserGroupMember: {
              some: { user_id: { equals: ctx.authenticated.user } },
            },
          },
        })

        let limitContactLocations = userGroupData.flatMap((data) => {
          return data.restrict_locations
            .split(',')
            .map((location) => Number(location))
        })

        limitContactLocations = [...new Set(limitContactLocations)]

        if (limitContactLocations.length > 0) {
          return await ctx.prisma.companyBranch.findMany({
            where: {
              group_id: { gt: 0 },
              is_active: { equals: 1 },
              company_id: ctx.authenticated.company,
              id: { in: limitContactLocations },
            },
          })
        }
        return []
      },
    })
  },
})
