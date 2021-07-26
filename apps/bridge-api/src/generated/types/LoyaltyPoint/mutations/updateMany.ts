import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointUpdateManyMutation = mutationField(
  'updateManyLoyaltyPoint',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LoyaltyPointWhereInput',
      data: nonNull('LoyaltyPointUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPoint.updateMany(args as any)
    },
  },
)
