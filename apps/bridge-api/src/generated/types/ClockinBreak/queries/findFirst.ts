import { queryField, list } from 'nexus'

export const ClockinBreakFindFirstQuery = queryField('findFirstClockinBreak', {
  type: 'ClockinBreak',
  args: {
    where: 'ClockinBreakWhereInput',
    orderBy: list('ClockinBreakOrderByWithRelationInput'),
    cursor: 'ClockinBreakWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClockinBreakScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.clockinBreak.findFirst({
      ...args,
      ...select,
    })
  },
})
