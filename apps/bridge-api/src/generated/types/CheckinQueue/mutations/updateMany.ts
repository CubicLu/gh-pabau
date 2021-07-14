import { mutationField, nonNull } from 'nexus'

export const CheckinQueueUpdateManyMutation = mutationField(
  'updateManyCheckinQueue',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CheckinQueueWhereInput',
      data: nonNull('CheckinQueueUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinQueue.updateMany(args as any)
    },
  },
)
