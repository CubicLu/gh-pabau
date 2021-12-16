import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingUpsertOneMutation = mutationField(
  'upsertOneLoyaltyPointSetting',
  {
    type: nonNull('LoyaltyPointSetting'),
    args: {
      where: nonNull('LoyaltyPointSettingWhereUniqueInput'),
      create: nonNull('LoyaltyPointSettingCreateInput'),
      update: nonNull('LoyaltyPointSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)
