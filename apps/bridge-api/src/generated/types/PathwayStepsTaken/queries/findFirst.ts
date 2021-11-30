import { queryField, list } from 'nexus'

export const PathwayStepsTakenFindFirstQuery = queryField(
  'findFirstPathwayStepsTaken',
  {
    type: 'PathwayStepsTaken',
    args: {
      where: 'PathwayStepsTakenWhereInput',
      orderBy: list('PathwayStepsTakenOrderByWithRelationInput'),
      cursor: 'PathwayStepsTakenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PathwayStepsTakenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
