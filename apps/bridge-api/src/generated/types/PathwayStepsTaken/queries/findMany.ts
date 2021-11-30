import { queryField, nonNull, list } from 'nexus'

export const PathwayStepsTakenFindManyQuery = queryField(
  'findManyPathwayStepsTaken',
  {
    type: nonNull(list(nonNull('PathwayStepsTaken'))),
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PathwayStepsTakenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.findMany({
        ...args,
        ...select,
      })
    },
  },
)
