import { queryField, list } from 'nexus'

export const ClockinLongpollFindFirstQuery = queryField(
  'findFirstClockinLongpoll',
  {
    type: 'ClockinLongpoll',
    args: {
      where: 'ClockinLongpollWhereInput',
      orderBy: list('ClockinLongpollOrderByWithRelationInput'),
      cursor: 'ClockinLongpollWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClockinLongpollScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinLongpoll.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
