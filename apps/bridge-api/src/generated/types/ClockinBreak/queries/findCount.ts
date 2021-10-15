import { queryField, nonNull, list } from 'nexus'

export const ClockinBreakFindCountQuery = queryField(
  'findManyClockinBreakCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClockinBreakWhereInput',
      orderBy: list('ClockinBreakOrderByInput'),
      cursor: 'ClockinBreakWhereUniqueInput',
      distinct: 'ClockinBreakScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinBreak.count(args as any)
    },
  },
)
