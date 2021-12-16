import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingUpdateManyMutation = mutationField(
  'updateManyLoyaltyPointSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LoyaltyPointSettingUpdateManyMutationInput'),
      where: 'LoyaltyPointSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPointSetting.updateMany(args as any)
    },
  },
)
