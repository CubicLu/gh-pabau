import { queryField, list } from 'nexus'

export const BatchAggregateQuery = queryField('aggregateBatch', {
  type: 'AggregateBatch',
  args: {
    where: 'BatchWhereInput',
    orderBy: list('BatchOrderByWithRelationInput'),
    cursor: 'BatchWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batch.aggregate({ ...args, ...select }) as any
  },
})
