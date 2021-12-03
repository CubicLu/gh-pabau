import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollUpdateManyMutation = mutationField(
  'updateManyClockinLongpoll',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClockinLongpollUpdateManyMutationInput'),
      where: 'ClockinLongpollWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinLongpoll.updateMany(args as any)
    },
  },
)
