import { queryField, list } from 'nexus'

export const RecallAggregateQuery = queryField('aggregateRecall', {
  type: 'AggregateRecall',
  args: {
    where: 'RecallWhereInput',
    orderBy: list('RecallOrderByWithRelationInput'),
    cursor: 'RecallWhereUniqueInput',
    distinct: 'RecallScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.recall.aggregate({ ...args, ...select }) as any
  },
})
