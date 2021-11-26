import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollUpdateOneMutation = mutationField(
  'updateOneClockinLongpoll',
  {
    type: nonNull('ClockinLongpoll'),
    args: {
      data: nonNull('ClockinLongpollUpdateInput'),
      where: nonNull('ClockinLongpollWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.clockinLongpoll.update({
        where,
        data,
        ...select,
      })
    },
  },
)
