import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollUpdateOneMutation = mutationField(
  'updateOneClockinLongpoll',
  {
    type: nonNull('ClockinLongpoll'),
    args: {
      where: nonNull('ClockinLongpollWhereUniqueInput'),
      data: nonNull('ClockinLongpollUpdateInput'),
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
