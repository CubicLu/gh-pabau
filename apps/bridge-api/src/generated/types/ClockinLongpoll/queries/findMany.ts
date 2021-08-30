import { queryField, nonNull, list } from 'nexus'

export const ClockinLongpollFindManyQuery = queryField(
  'findManyClockinLongpoll',
  {
    type: nonNull(list(nonNull('ClockinLongpoll'))),
    args: {
      where: 'ClockinLongpollWhereInput',
      orderBy: list('ClockinLongpollOrderByInput'),
      cursor: 'ClockinLongpollWhereUniqueInput',
      distinct: 'ClockinLongpollScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinLongpoll.findMany({
        ...args,
        ...select,
      })
    },
  },
)
