import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointUpdateManyMutation = mutationField(
  'updateManyLoyaltyPoint',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LoyaltyPointUpdateManyMutationInput'),
      where: 'LoyaltyPointWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoint.updateMany(args as any)
    },
  },
)
