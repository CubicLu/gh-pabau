import { queryField, nonNull, list } from 'nexus'

export const SmsPurchaseFindManyQuery = queryField('findManySmsPurchase', {
  type: nonNull(list(nonNull('SmsPurchase'))),
  args: {
    where: 'SmsPurchaseWhereInput',
    orderBy: list('SmsPurchaseOrderByWithRelationInput'),
    cursor: 'SmsPurchaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SmsPurchaseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsPurchase.findMany({
      ...args,
      ...select,
    })
  },
})
