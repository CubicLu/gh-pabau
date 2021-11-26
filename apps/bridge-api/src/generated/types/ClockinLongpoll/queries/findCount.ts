import { queryField, nonNull, list } from 'nexus'

export const ClockinLongpollFindCountQuery = queryField(
  'findManyClockinLongpollCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClockinLongpollWhereInput',
      orderBy: list('ClockinLongpollOrderByWithRelationInput'),
      cursor: 'ClockinLongpollWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinLongpollScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinLongpoll.count(args as any)
    },
  },
)
