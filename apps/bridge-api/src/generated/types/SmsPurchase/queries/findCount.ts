import { queryField, nonNull, list } from 'nexus'

export const SmsPurchaseFindCountQuery = queryField(
  'findManySmsPurchaseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SmsPurchaseWhereInput',
      orderBy: list('SmsPurchaseOrderByWithRelationInput'),
      cursor: 'SmsPurchaseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SmsPurchaseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.smsPurchase.count(args as any)
    },
  },
)
