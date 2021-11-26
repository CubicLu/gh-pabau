import { queryField, list } from 'nexus'

export const SmsPurchaseAggregateQuery = queryField('aggregateSmsPurchase', {
  type: 'AggregateSmsPurchase',
  args: {
    where: 'SmsPurchaseWhereInput',
    orderBy: list('SmsPurchaseOrderByWithRelationInput'),
    cursor: 'SmsPurchaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsPurchase.aggregate({ ...args, ...select }) as any
  },
})
