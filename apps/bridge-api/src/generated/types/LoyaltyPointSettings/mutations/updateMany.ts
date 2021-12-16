import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingsUpdateManyMutation = mutationField(
  'updateManyLoyaltyPointSettings',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LoyaltyPointSettingsUpdateManyMutationInput'),
      where: 'LoyaltyPointSettingsWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPointSettings.updateMany(args as any)
    },
  },
)
