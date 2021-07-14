import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesUpdateManyMutation = mutationField(
  'updateManyCheckinAverages',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CheckinAveragesWhereInput',
      data: nonNull('CheckinAveragesUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAverages.updateMany(args as any)
    },
  },
)
