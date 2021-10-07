import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollDeleteOneMutation = mutationField(
  'deleteOneClockinLongpoll',
  {
    type: 'ClockinLongpoll',
    args: {
      where: nonNull('ClockinLongpollWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.clockinLongpoll.delete({
        where,
        ...select,
      })
    },
  },
)
