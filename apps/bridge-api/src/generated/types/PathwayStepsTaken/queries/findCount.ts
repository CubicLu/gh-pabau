import { queryField, nonNull, list } from 'nexus'

export const PathwayStepsTakenFindCountQuery = queryField(
  'findManyPathwayStepsTakenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PathwayStepsTakenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStepsTaken.count(args as any)
    },
  },
)
