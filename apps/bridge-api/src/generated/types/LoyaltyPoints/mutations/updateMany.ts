import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsUpdateManyMutation = mutationField(
  'updateManyLoyaltyPoints',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LoyaltyPointsWhereInput',
      data: nonNull('LoyaltyPointsUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoints.updateMany(args as any)
    },
  },
)
