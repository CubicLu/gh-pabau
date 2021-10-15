import { queryField, nonNull, list } from 'nexus'

export const SmsPurchaseFindManyQuery = queryField('findManySmsPurchase', {
  type: nonNull(list(nonNull('SmsPurchase'))),
  args: {
    where: 'SmsPurchaseWhereInput',
    orderBy: list('SmsPurchaseOrderByInput'),
    cursor: 'SmsPurchaseWhereUniqueInput',
    distinct: 'SmsPurchaseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsPurchase.findMany({
      ...args,
      ...select,
    })
  },
})
