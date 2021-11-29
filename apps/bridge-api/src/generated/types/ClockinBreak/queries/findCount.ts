import { queryField, nonNull, list } from 'nexus'

export const ClockinBreakFindCountQuery = queryField(
  'findManyClockinBreakCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClockinBreakWhereInput',
      orderBy: list('ClockinBreakOrderByWithRelationInput'),
      cursor: 'ClockinBreakWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinBreakScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinBreak.count(args as any)
    },
  },
)
