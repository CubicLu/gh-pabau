import { queryField, nonNull, list } from 'nexus'

export const PathwayStepsTakenFindManyQuery = queryField(
  'findManyPathwayStepsTaken',
  {
    type: nonNull(list(nonNull('PathwayStepsTaken'))),
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      distinct: 'PathwayStepsTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.findMany({
        ...args,
        ...select,
      })
    },
  },
)
