import { queryField, nonNull, list } from 'nexus'

export const PathwayStepsTakenFindCountQuery = queryField(
  'findManyPathwayStepsTakenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      distinct: 'PathwayStepsTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStepsTaken.count(args as any)
    },
  },
)
