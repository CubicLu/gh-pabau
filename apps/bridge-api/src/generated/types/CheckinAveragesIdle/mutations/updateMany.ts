import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleUpdateManyMutation = mutationField(
  'updateManyCheckinAveragesIdle',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CheckinAveragesIdleWhereInput',
      data: nonNull('CheckinAveragesIdleUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAveragesIdle.updateMany(args as any)
    },
  },
)
