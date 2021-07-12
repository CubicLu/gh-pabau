import { queryField, list } from 'nexus'

export const ClockinBreakFindFirstQuery = queryField('findFirstClockinBreak', {
  type: 'ClockinBreak',
  args: {
    where: 'ClockinBreakWhereInput',
    orderBy: list('ClockinBreakOrderByInput'),
    cursor: 'ClockinBreakWhereUniqueInput',
    distinct: 'ClockinBreakScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.clockinBreak.findFirst({
      ...args,
      ...select,
    })
  },
})
