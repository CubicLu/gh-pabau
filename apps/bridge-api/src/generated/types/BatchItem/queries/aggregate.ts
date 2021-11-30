import { queryField, list } from 'nexus'

export const BatchItemAggregateQuery = queryField('aggregateBatchItem', {
  type: 'AggregateBatchItem',
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByWithRelationInput'),
    cursor: 'BatchItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.aggregate({ ...args, ...select }) as any
  },
})
