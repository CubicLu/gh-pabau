import { queryField, nonNull } from 'nexus'

export const AvilableDatesLogFindUniqueQuery = queryField(
  'findUniqueAvilableDatesLog',
  {
    type: 'AvilableDatesLog',
    args: {
      where: nonNull('AvilableDatesLogWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.avilableDatesLog.findUnique({
        where,
        ...select,
      })
    },
  },
)
