import { queryField, list } from 'nexus'

export const BatchItemAggregateQuery = queryField('aggregateBatchItem', {
  type: 'AggregateBatchItem',
  args: {
    where: 'BatchItemWhereInput',
    orderBy: list('BatchItemOrderByInput'),
    cursor: 'BatchItemWhereUniqueInput',
    distinct: 'BatchItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.aggregate({ ...args, ...select }) as any
  },
})
