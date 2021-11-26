import { queryField, list } from 'nexus'

export const RecallAggregateQuery = queryField('aggregateRecall', {
  type: 'AggregateRecall',
  args: {
    where: 'RecallWhereInput',
    orderBy: list('RecallOrderByWithRelationInput'),
    cursor: 'RecallWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.recall.aggregate({ ...args, ...select }) as any
  },
})
