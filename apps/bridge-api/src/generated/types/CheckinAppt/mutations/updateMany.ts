import { mutationField, nonNull } from 'nexus'

export const CheckinApptUpdateManyMutation = mutationField(
  'updateManyCheckinAppt',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CheckinApptUpdateManyMutationInput'),
      where: 'CheckinApptWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAppt.updateMany(args as any)
    },
  },
)
