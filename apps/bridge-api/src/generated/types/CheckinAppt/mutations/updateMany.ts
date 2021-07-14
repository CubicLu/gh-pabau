import { mutationField, nonNull } from 'nexus'

export const CheckinApptUpdateManyMutation = mutationField(
  'updateManyCheckinAppt',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CheckinApptWhereInput',
      data: nonNull('CheckinApptUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAppt.updateMany(args as any)
    },
  },
)
