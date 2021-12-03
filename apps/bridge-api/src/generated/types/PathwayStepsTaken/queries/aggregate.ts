import { queryField, list } from 'nexus'

export const PathwayStepsTakenAggregateQuery = queryField(
  'aggregatePathwayStepsTaken',
  {
    type: 'AggregatePathwayStepsTaken',
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.aggregate({ ...args, ...select }) as any
    },
  },
)
