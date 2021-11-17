import { queryField, nonNull } from 'nexus'

export const PathwaysTakenFindUniqueQuery = queryField(
  'findUniquePathwaysTaken',
  {
    type: 'PathwaysTaken',
    args: {
      where: nonNull('PathwaysTakenWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.pathwaysTaken.findUnique({
        where,
        ...select,
      })
    },
  },
)
