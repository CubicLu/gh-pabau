import { queryField, nonNull, list } from 'nexus'

export const ClockinBreakFindManyQuery = queryField('findManyClockinBreak', {
  type: nonNull(list(nonNull('ClockinBreak'))),
  args: {
    where: 'ClockinBreakWhereInput',
    orderBy: list('ClockinBreakOrderByWithRelationInput'),
    cursor: 'ClockinBreakWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClockinBreakScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.clockinBreak.findMany({
      ...args,
      ...select,
    })
  },
})
