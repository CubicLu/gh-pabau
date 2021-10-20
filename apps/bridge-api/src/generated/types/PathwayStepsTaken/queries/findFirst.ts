import { queryField, list } from 'nexus'

export const PathwayStepsTakenFindFirstQuery = queryField(
  'findFirstPathwayStepsTaken',
  {
    type: 'PathwayStepsTaken',
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      distinct: 'PathwayStepsTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
