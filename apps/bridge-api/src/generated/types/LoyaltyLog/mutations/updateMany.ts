import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogUpdateManyMutation = mutationField(
  'updateManyLoyaltyLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LoyaltyLogUpdateManyMutationInput'),
      where: 'LoyaltyLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyLog.updateMany(args as any)
    },
  },
)
