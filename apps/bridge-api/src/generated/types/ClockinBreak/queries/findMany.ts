import { queryField, nonNull, list } from 'nexus'

export const ClockinBreakFindManyQuery = queryField('findManyClockinBreak', {
  type: nonNull(list(nonNull('ClockinBreak'))),
  args: {
    where: 'ClockinBreakWhereInput',
    orderBy: list('ClockinBreakOrderByInput'),
    cursor: 'ClockinBreakWhereUniqueInput',
    distinct: 'ClockinBreakScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.clockinBreak.findMany({
      ...args,
      ...select,
    })
  },
})
