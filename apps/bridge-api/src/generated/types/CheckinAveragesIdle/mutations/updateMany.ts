import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleUpdateManyMutation = mutationField(
  'updateManyCheckinAveragesIdle',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CheckinAveragesIdleUpdateManyMutationInput'),
      where: 'CheckinAveragesIdleWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAveragesIdle.updateMany(args as any)
    },
  },
)
