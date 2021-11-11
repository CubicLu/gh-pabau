import { extendType, intArg, inputObjectType, nullable } from 'nexus'
import { Context } from '../../../context'
import { Public_LocationsResponse } from '../nexus-type/index'

export const PublicLocationsInput = inputObjectType({
  name: 'PublicLocationsInput',
  definition(t) {
    t.nonNull.int('company_id')
  },
})

export const Public_Locations = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Public_Locations', {
      type: Public_LocationsResponse,
      description: 'Get bookable locations with public data',
      args: {
        where: nullable(PublicLocationsInput),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(root, input, ctx: Context) {
        return ctx.prisma.companyBranch.findMany({
          where: {
            ...input.where,
            is_active: 1,
            bookable_online: 1,
            show_online: 1,
          },
          orderBy: {
            loc_order: 'asc',
          },
          skip: input.skip,
          take: input.take,
        })
      },
    })
  },
})
