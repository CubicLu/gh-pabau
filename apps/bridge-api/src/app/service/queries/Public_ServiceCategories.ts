import {
  objectType,
  extendType,
  list,
  nonNull,
  intArg,
  stringArg,
  inputObjectType,
  nullable,
} from 'nexus'
import { Context } from '../../../context'
import {
  PublicMasterCategoryResponse,
  PublicServiceCategoryResponse,
} from '../nexus-type/index'

export const PSCInput = inputObjectType({
  name: 'PSCInput',
  definition(t) {
    t.nonNull.int('company_id')
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
      async resolve(_, input, ctx: Context) {
        return ctx.prisma.companyService.findMany({
          where: input.where,
          orderBy: {
            service_order: 'asc',
          },
          skip: input.skip,
          take: input.take,
        })
      },
    })
  },
})
