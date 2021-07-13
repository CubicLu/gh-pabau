import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollUpdateManyMutation = mutationField(
  'updateManyClockinLongpoll',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClockinLongpollWhereInput',
      data: nonNull('ClockinLongpollUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinLongpoll.updateMany(args as any)
    },
  },
)
