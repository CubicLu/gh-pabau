import { queryField, nonNull, list } from 'nexus'

export const ClockinLongpollFindManyQuery = queryField(
  'findManyClockinLongpoll',
  {
    type: nonNull(list(nonNull('ClockinLongpoll'))),
    args: {
      where: 'ClockinLongpollWhereInput',
      orderBy: list('ClockinLongpollOrderByWithRelationInput'),
      cursor: 'ClockinLongpollWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinLongpollScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinLongpoll.findMany({
        ...args,
        ...select,
      })
    },
  },
)
