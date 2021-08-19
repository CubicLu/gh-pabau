import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogUpdateManyMutation = mutationField(
  'updateManyLoyaltyLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LoyaltyLogWhereInput',
      data: nonNull('LoyaltyLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyLog.updateMany(args as any)
    },
  },
)
