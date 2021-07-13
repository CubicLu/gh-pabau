import { queryField, nonNull } from 'nexus'

export const ClockinBreakFindUniqueQuery = queryField(
  'findUniqueClockinBreak',
  {
    type: 'ClockinBreak',
    args: {
      where: nonNull('ClockinBreakWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.clockinBreak.findUnique({
        where,
        ...select,
      })
    },
  },
)
