import { queryField, list } from 'nexus'

export const ClockinLongpollAggregateQuery = queryField(
  'aggregateClockinLongpoll',
  {
    type: 'AggregateClockinLongpoll',
    args: {
      where: 'ClockinLongpollWhereInput',
      orderBy: list('ClockinLongpollOrderByWithRelationInput'),
      cursor: 'ClockinLongpollWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinLongpoll.aggregate({ ...args, ...select }) as any
    },
  },
)
