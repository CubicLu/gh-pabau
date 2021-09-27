import { extendType, intArg, inputObjectType, nullable } from 'nexus'
import { Context } from '../../../context'
import { PublicServiceCategoryResponse } from '../nexus-type/index'

export const PSCInput = inputObjectType({
  name: 'PSCInput',
  definition(t) {
    t.nonNull.int('company_id')
    t.int('master_cat_id')
  },
})

export const Public_ServiceCategories = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Public_ServiceCategories', {
      type: PublicServiceCategoryResponse,
      description: 'Get service categories public data',
      args: {
        where: nullable(PSCInput),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(root, input, ctx: Context) {
        return ctx.prisma.serviceCategory.findMany({
          where: input.where,
          orderBy: {
            cat_order: 'asc',
          },
          skip: input.skip,
          take: input.take,
        })
      },
    })
  },
})
