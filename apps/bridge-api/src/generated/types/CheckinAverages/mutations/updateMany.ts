import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesUpdateManyMutation = mutationField(
  'updateManyCheckinAverages',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CheckinAveragesUpdateManyMutationInput'),
      where: 'CheckinAveragesWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAverages.updateMany(args as any)
    },
  },
)
