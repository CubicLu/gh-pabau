import { mutationField, nonNull } from 'nexus'

export const CheckinQueueUpdateManyMutation = mutationField(
  'updateManyCheckinQueue',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CheckinQueueUpdateManyMutationInput'),
      where: 'CheckinQueueWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinQueue.updateMany(args as any)
    },
  },
)
