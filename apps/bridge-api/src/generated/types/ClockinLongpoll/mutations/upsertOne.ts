import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollUpsertOneMutation = mutationField(
  'upsertOneClockinLongpoll',
  {
    type: nonNull('ClockinLongpoll'),
    args: {
      where: nonNull('ClockinLongpollWhereUniqueInput'),
      create: nonNull('ClockinLongpollCreateInput'),
      update: nonNull('ClockinLongpollUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinLongpoll.upsert({
        ...args,
        ...select,
      })
    },
  },
)
