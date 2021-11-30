import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsUpdateManyMutation = mutationField(
  'updateManyLoyaltyPoints',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LoyaltyPointsUpdateManyMutationInput'),
      where: 'LoyaltyPointsWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoints.updateMany(args as any)
    },
  },
)
