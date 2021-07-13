import { queryField, nonNull, list } from 'nexus'

export const SmsPurchaseFindCountQuery = queryField(
  'findManySmsPurchaseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SmsPurchaseWhereInput',
      orderBy: list('SmsPurchaseOrderByInput'),
      cursor: 'SmsPurchaseWhereUniqueInput',
      distinct: 'SmsPurchaseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.smsPurchase.count(args as any)
    },
  },
)
