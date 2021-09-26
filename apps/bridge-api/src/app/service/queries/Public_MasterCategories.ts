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
import { PublicMasterCategoryResponse } from '../nexus-type/index'

export const PBCInput = inputObjectType({
  name: 'PBCInput',
  definition(t) {
    t.string('type')
    t.nonNull.int('company_id')
  },
})

export const Public_MasterCategories = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Public_MasterCategories', {
      type: PublicMasterCategoryResponse,
      description: 'Get master categories public data',
      args: {
        where: nullable(PBCInput),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_, input, ctx: Context) {
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
