import { queryField, list } from 'nexus'

export const PathwaysAggregateQuery = queryField('aggregatePathways', {
  type: 'AggregatePathways',
  args: {
    where: 'PathwaysWhereInput',
    orderBy: list('PathwaysOrderByWithRelationInput'),
    cursor: 'PathwaysWhereUniqueInput',
    distinct: 'PathwaysScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathways.aggregate({ ...args, ...select }) as any
  },
})
