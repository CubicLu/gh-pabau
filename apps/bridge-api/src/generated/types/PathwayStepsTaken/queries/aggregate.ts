import { queryField, list } from 'nexus'

export const PathwayStepsTakenAggregateQuery = queryField(
  'aggregatePathwayStepsTaken',
  {
    type: 'AggregatePathwayStepsTaken',
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      distinct: 'PathwayStepsTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.aggregate({ ...args, ...select }) as any
    },
  },
)
