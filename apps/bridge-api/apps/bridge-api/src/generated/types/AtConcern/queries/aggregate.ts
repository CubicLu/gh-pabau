import { queryField, list } from 'nexus'

export const AtConcernAggregateQuery = queryField('aggregateAtConcern', {
  type: 'AggregateAtConcern',
  args: {
    where: 'AtConcernWhereInput',
    orderBy: list('AtConcernOrderByWithRelationInput'),
    cursor: 'AtConcernWhereUniqueInput',
    distinct: 'AtConcernScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atConcern.aggregate({ ...args, ...select }) as any
  },
})
