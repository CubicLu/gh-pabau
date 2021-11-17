import { queryField, nonNull } from 'nexus'

export const PathwayStepsTakenFindUniqueQuery = queryField(
  'findUniquePathwayStepsTaken',
  {
    type: 'PathwayStepsTaken',
    args: {
      where: nonNull('PathwayStepsTakenWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.pathwayStepsTaken.findUnique({
        where,
        ...select,
      })
    },
  },
)
