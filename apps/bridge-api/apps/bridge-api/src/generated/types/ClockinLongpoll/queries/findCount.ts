import { queryField, nonNull, list } from 'nexus'

export const ClockinLongpollFindCountQuery = queryField(
  'findManyClockinLongpollCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClockinLongpollWhereInput',
      orderBy: list('ClockinLongpollOrderByWithRelationInput'),
      cursor: 'ClockinLongpollWhereUniqueInput',
      distinct: 'ClockinLongpollScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinLongpoll.count(args as any)
    },
  },
)
