import { queryField, list } from 'nexus'

export const PathwaysTakenAggregateQuery = queryField(
  'aggregatePathwaysTaken',
  {
    type: 'AggregatePathwaysTaken',
    args: {
      where: 'PathwaysTakenWhereInput',
      orderBy: list('PathwaysTakenOrderByWithRelationInput'),
      cursor: 'PathwaysTakenWhereUniqueInput',
      distinct: 'PathwaysTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwaysTaken.aggregate({ ...args, ...select }) as any
    },
  },
)
