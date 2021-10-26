import { queryField, list } from 'nexus'

export const PathwayAggregateQuery = queryField('aggregatePathway', {
  type: 'AggregatePathway',
  args: {
    where: 'PathwayWhereInput',
    orderBy: list('PathwayOrderByWithRelationInput'),
    cursor: 'PathwayWhereUniqueInput',
    distinct: 'PathwayScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathway.aggregate({ ...args, ...select }) as any
  },
})
