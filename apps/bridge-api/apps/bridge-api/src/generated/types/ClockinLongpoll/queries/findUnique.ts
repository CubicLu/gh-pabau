import { queryField, nonNull } from 'nexus'

export const ClockinLongpollFindUniqueQuery = queryField(
  'findUniqueClockinLongpoll',
  {
    type: 'ClockinLongpoll',
    args: {
      where: nonNull('ClockinLongpollWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.clockinLongpoll.findUnique({
        where,
        ...select,
      })
    },
  },
)
